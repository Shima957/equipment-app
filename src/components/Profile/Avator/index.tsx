/* eslint-disable @next/next/no-img-element */
import { User } from '@prisma/client';
import { VFC } from 'react';

type Props = {
  user: User | null;
};

const Avator: VFC<Props> = ({ user }) => {
  return (
    <img
      src={user?.avatorUrl ?? '/user.png'}
      alt='userIcon'
      className='rounded-full h-40 w-40'
    />
  );
};

export default Avator;
