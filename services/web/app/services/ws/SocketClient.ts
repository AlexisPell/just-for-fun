import io, { Socket } from 'socket.io-client';
import { wsMsgs } from './wsMessages';

export class SocketClient {
  socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
    console.log('SOCKET CONNECTED: ', this.socket);
  }

  sendMessage() {
    return;
  }

  getMessage() {
    return this.socket.on(wsMsgs.message, () => {
      console.log('WS Message event');
    });
  }
}
