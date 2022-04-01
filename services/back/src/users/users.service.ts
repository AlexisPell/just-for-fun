import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from './user.document';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new NotFoundException("User with such email doesn't exist");
    return user;
  }

  async getUserById(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new BadRequestException('Invalid mongoose id');
    }
    if (!user) throw new NotFoundException("User with such id doesn't exist");
    return user;
  }

  async createUser(validatedDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(validatedDto);
    return user;
  }
}
