import React, { useEffect, useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useUser } from '../../hooks/useLocalStoreUser';
import { IUser } from '../../interfaces/user';
import { getLocalStoreUser } from '../../utils/getLocalStoreUser';

interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = ({}) => {
  useAuthentication();
  const [user, setUser] = useUser();
  console.log('🚀 ~ file: Navbar.tsx ~ line 16 ~ user', user);

  return (
    <div className='w-full bg-cyan-500'>
      <div className='text-xl text-black'>This is my navbar</div>
      <div className='text-xl text-black'>User: {user && user?.email}</div>
      <input
        type='checkbox'
        checked={user?.verified}
        onChange={(e) => {
          // console.log('🚀 ~ file: Navbar.tsx ~ line 25 ~ e', e.target.checked);
          setUser({ ...user, verified: e.target.checked });
        }}
      />
    </div>
  );
};
