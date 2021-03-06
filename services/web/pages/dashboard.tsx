import { useAtom } from 'jotai';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { roomsAtom } from '../app/atoms/rooms';
import { Navbar } from '../app/components/Navbar';
import { IRoom } from '../app/interfaces/room';
import { SocketClient } from '../app/services/ws';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

let socket: SocketClient;

interface DashboardPageProps {}
const DashboardPage: NextPage<DashboardPageProps> = () => {
  const [rooms, setRooms] = useAtom(roomsAtom);
  console.log('🚀 ~ file: dashboard.tsx ~ line 25 ~ rooms', rooms);

  useEffect(() => {
    socket = new SocketClient();
    socket.getMessage((msg) => console.log(`FRNT. Message received: BCKND. msg: ${msg}`));
    socket.getMyRooms((rooms) => setRooms(rooms));
  }, [setRooms]);

  return (
    <>
      <Head>
        <title>Dashboard | Chat app</title>
      </Head>
      <div className='w-full h-full'>
        <Navbar />
        <button
          className='btn'
          onClick={() => {
            const chatPayload: IRoom = { name: 'Front chat', description: 'hehehe)))' };
            socket.createRoom(chatPayload, (newRoom) => setRooms([newRoom, ...rooms]));
          }}
        >
          Add chat
        </button>
        <div>My chats:</div>
        <div>
          {rooms.map((room) => (
            <div key={room.id} className='border-2 my-2 mx-10 p-3 text-lg'>
              <p>
                <strong>Room name: </strong> {room.name}
              </p>
              <p>
                <strong>Room id: </strong>
                {(room as any).id}
              </p>
              <p>
                <strong>User id</strong>
                {(room.users![0] as any).id}
              </p>
              <p>
                <strong>ROOM:</strong>
                {JSON.stringify({ ...room })}
              </p>
              <p>
                <strong>USER:</strong>
                {JSON.stringify(room.users![0])}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
