import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

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

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.server.emit('message', 'Hello world');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('ON CONNECT');
    this.server.emit('messageeeee', 'Connected successfully');
  }

  handleDisconnect(client: any) {
    console.log('ON DISCONNECT');
  }
}
