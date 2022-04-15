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

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'http://localhost',
      'https://hoppscotch.io',
      'http://localhost:8080',
      'http://localhost:80',
    ],
  },
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;

  constructor(private usersService: UsersService) {}

  msgs: string[];
  connectedUsers: string[] = [];

  async handleConnection(socket: Socket) {
    try {
      console.log('ON CONNECT');
      const { userId } = socket.handshake.auth;
      const user = await this.usersService.getUserById(userId);
      console.log(
        '🚀 ~ file: chats.gateway.ts ~ line 34 ~ ChatsGateway ~ handleConnection ~ User:',
        user,
      );
      this.connectedUsers.push(
        `User ${user.email}: ${Math.random().toString().substring(0, 5)}`,
      );
      this.server.emit('message', 'Connected successfully');
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
}
