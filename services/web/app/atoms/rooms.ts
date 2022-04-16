import { atom } from 'jotai';
import { IRoom } from '../interfaces/room';

export const roomsAtom = atom<IRoom[]>([]);

// USESTATE ANALOG
// const _registerErrorAtom = atom('');
// const registerErrorAtom = atom(
//   (get) => get(_registerErrorAtom),
//   (_, set, text: string) => {
//     set(_registerErrorAtom, text);
//   }
// );
