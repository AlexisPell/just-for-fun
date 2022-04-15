import io, { Socket } from 'socket.io-client';
import { environment } from '../../constants/env';
import { getLocalStoreUser } from '../../utils/getLocalStoreUser';
import { wsMsgs } from './wsMessages';

export class SocketClient {
  socket: Socket;

  constructor() {
    const user = getLocalStoreUser();
    if (!user) throw new Error('No user defined in local store. Socket.io connection defused');
    this.socket = io(environment.BACKEND_API, { auth: { userId: user.id } });
    console.log('SOCKET CONNECTED: ', this.socket);
  }

  sendMessage() {
    return;
  }

  getMessage() {
    return this.socket.on(wsMsgs.message, (msg: string) => {
      console.log('WS Message event: ' + msg);
    });
  }
}
