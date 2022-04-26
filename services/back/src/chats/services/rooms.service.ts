import { Injectable } from '@nestjs/common';
import { Model, LeanDocument } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from '../documents/room.document';
import { IUser } from 'src/users/user.interface';
import { IRoom } from '../interfaces/room';
import { CreateRoomDto } from '../dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async createRoom(roomDto: CreateRoomDto, creatorId: string): Promise<IRoom> {
    const roomPayload: IRoom = { ...roomDto, users: [creatorId as IUser] };
    const room: LeanDocument<IRoom> = (await (
      await this.roomModel.create(roomPayload)
    ).toObject()) as any;

    return room;
  }

  async getRoomsForUser(userId: string): Promise<IRoom[]> {
    const rooms: LeanDocument<IRoom[]> = await this.roomModel
      .find({ users: { $elemMatch: { $eq: userId } } })
      .populate('users')
      .lean();

    return rooms;
  }
}
