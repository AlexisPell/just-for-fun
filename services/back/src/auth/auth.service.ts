import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/users/user.document';
import { UsersService } from 'src/users/users.service';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Profile as GoogleProfile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async registration(userDto: CreateUserDto) {
    console.log('AUTH SERVICE / REGISTRATION');
    const candidate = await this.userModel.findOne({ email: userDto.email });
    if (candidate) throw new BadRequestException('Such user already exists');
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const _user: CreateUserDto = { ...userDto, password: hashPassword };
    const user = await this.userModel.create(_user);

    return user;
  }

  async validateLocalUser(userDto: CreateUserDto): Promise<User | undefined> {
    console.log('AUTH SERVICE / VALIDATE LOCAL / INIT');
    const user = await this.userModel.findOne({ email: userDto.email });
    if (!user) {
      console.log('AUTH SERVICE / VALIDATE LOCAL / USER NOT FOUND');
      throw new BadRequestException('User with such credentials not found');
    }
    console.log('AUTH SERVICE / VALIDATE LOCAL / USER FOUND', user);
    const passwordsEqual = await bcrypt.compare(
      userDto.password,
      user.password || '',
    );
    if (passwordsEqual) {
      console.log('AUTH SERVICE / VALIDATE LOCAL / PASSWORD MATCHED');
      return user;
    }
    if (!passwordsEqual)
      throw new BadRequestException('Wrong password provided');
    return undefined;
  }

  async validateGoogleProfile(userDto: GoogleProfile): Promise<User> {
    console.log(`VALIDATE GOOGLE / INIT ${JSON.stringify(userDto, null, 2)}`);
    const user = await this.userModel.findOne({ googleId: userDto.id });
    if (user) {
      console.log(
        `VALIDATE GOOGLE / USER FOUND ${JSON.stringify(user, null, 2)}`,
      );
      return user;
    }
    const newUser = await this.usersService.createForGoogleStrategy(userDto);
    console.log(`VALIDATE GOOGLE / NEW USER ${JSON.stringify(user, null, 2)}`);
    return newUser;
  }
}
