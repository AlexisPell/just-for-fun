import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from './user.document';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[]> {
    const users: User[] = await this.userModel.find().lean();
    return users;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user: User = await this.userModel.findOne({ email }).lean();
    if (!user)
      throw new NotFoundException("User with such email doesn't exist");
    return user;
  }

  async getUserById(id: string): Promise<IUser> {
    let user;
    try {
      // user = await (await this.userModel.findById(id)).toJSON();
      // user = await (await this.userModel.findById(id)).toObject();
      // user = await this.userModel.findById(id).lean().exec();
      user = await this.userModel.findById(id).lean();
    } catch (error) {
      throw new BadRequestException('Invalid mongoose id');
    }
    if (!user) throw new NotFoundException("User with such id doesn't exist");
    return user;
  }

  async createUser(validatedDto: CreateUserDto): Promise<User> {
    const user = (await (
      await this.userModel.create(validatedDto)
    ).toObject()) as User;

    return user;
  }

  async createForGoogleStrategy(googlePayload: GoogleProfile): Promise<User> {
    console.log('createForGoogle / init', googlePayload);

    const userPayload: Partial<User> = {
      email: googlePayload._json.email,
      verified: !!googlePayload._json.email_verified,
      googleId: googlePayload.id,
    };
    const user = await this.userModel.create(userPayload);

    return user;
  }
}
