import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.document';
import { UsersModule } from 'src/users/users.module';
import { ChatsGateway } from './chats.gateway';
import { Room, RoomSchema } from './documents/room.document';
import { RoomsService } from './services/rooms.service';

@Module({
  providers: [ChatsGateway, RoomsService],
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UsersModule,
  ],
})
export class ChatsModule {}
