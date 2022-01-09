/* eslint-disable @next/next/no-img-element */
import { User } from '@prisma/client';
import { useEffect, VFC } from 'react';

type Props = {
  user: User | null;
};

const Avator: VFC<Props> = ({ user }) => {
  useEffect(() => {}, []);

  return (
    <div className=''>
      <img
        src={user?.avatorUrl ?? '/user.png'}
        alt='userIcon'
        className='rounded-full h-40 w-40'
      />
    </div>
  );
};

export default Avator;
