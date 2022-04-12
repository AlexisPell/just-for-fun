import { atom } from 'jotai';
import { IUser } from '../interfaces/user';

export const userAtom = atom<IUser | null>(null);

// USESTATE ANALOG
// const _registerErrorAtom = atom('');
// const registerErrorAtom = atom(
//   (get) => get(_registerErrorAtom),
//   (_, set, text: string) => {
//     set(_registerErrorAtom, text);
//   }
// );
