import io, { Socket } from 'socket.io-client';
import { environment } from '../../constants/env';
import { IRoom } from '../../interfaces/room';
import { getLocalStoreUser } from '../../utils/getLocalStoreUser';
import { wsMsgs } from './wsMessages';

export class SocketClient {
  socket: Socket;

  constructor() {
    const user = getLocalStoreUser();
    if (!user) throw new Error('No user defined in local store. Socket.io connection defused');
    this.socket = io(environment.BACKEND_API, { auth: { userId: user.id }, extraHeaders: {} });
    console.log('SOCKET CONNECTED: ', this.socket);
  }

  sendMessage() {
    return;
  }

  getMessage(callback: (msg: string) => any) {
    return this.socket.on(wsMsgs.message, callback);
  }

  getMyRooms(callback: (rooms: IRoom[]) => any) {
    return this.socket.on(wsMsgs.rooms, callback);
  }

  createRoom(room: IRoom, callback?: (newRoom: IRoom) => any) {
    return this.socket.emit(wsMsgs.createRoom, room, callback);
  }
}
