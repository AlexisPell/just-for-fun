import { RoomsService } from './services/rooms.service';
import { UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { wsMsgs } from './chats.constants';
import { CreateRoomDto } from './dto/create-room.dto';
import { IRoom } from './interfaces/room';

@WebSocketGateway({
  cors: {
    origin: [
      'https://hoppscotch.io',
      'http://localhost:3000',
      'http://localhost:5000',
      'http://localhost',
      'http://localhost:80',
    ],
  },
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;

  constructor(
    private usersService: UsersService,
    private roomsService: RoomsService,
  ) {}

  async handleConnection(socket: Socket) {
    try {
      console.log('ON CONNECT');
      const { userId } = socket.handshake.auth;
      const user = await this.usersService.getUserById(userId);
      console.log(
        '🚀 ~ file: chats.gateway.ts ~ handleConnection ~ User: ',
        user,
      );

      socket.data.user = user;

      // // CREATE ROOM DUMB
      // const room = await this.roomsService.createRoom(
      //   { name: '2nd room', description: 'my 2nd room' },
      //   user._id,
      // );
      // console.log(
      //   '🚀 ~ file: chats.gateway.ts ~ line 47 ~ ChatsGateway ~ handleConnection ~ room',
      //   room,
      // );

      const rooms = await this.roomsService.getRoomsForUser(user._id);
      console.log(
        '🚀 ~ file: chats.gateway.ts ~ handleConnection ~ rooms: ',
        rooms,
      );

      this.server.emit(wsMsgs.message, 'Connected successfully');

      // Only emit rooms to the specific connected client
      this.server.to(socket.id).emit(wsMsgs.rooms, rooms);
    } catch (error) {
      console.log('ERROR', error);
      this.handleDisconnect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    console.log('ON DISCONNECT');
    socket.emit(
      'Error',
      new UnauthorizedException('Socket connection has been closed ...'),
    );
    this.server.emit('message', 'Connection closed');
    socket.disconnect();
  }

  @SubscribeMessage(wsMsgs.message)
  handleMessage(socket: Socket, payload: any) {
    this.server.emit('message', 'Hello world');
  }

  @SubscribeMessage(wsMsgs.createRoom)
  async onCreateRoom(socket: Socket, room: CreateRoomDto): Promise<IRoom> {
    return this.roomsService.createRoom(room, socket.data.user._id);
  }
}
