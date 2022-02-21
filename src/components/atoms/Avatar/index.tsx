import { users } from '@prisma/client';
import { VFC } from 'react';
import Image from 'next/image';

type Props = {
  user: users | null;
};

export const Avatar: VFC<Props> = ({ user }) => {
  return (
    <Image
      src={user?.avatar_url ?? '/user.png'}
      alt='userIcon'
      height={140}
      width={140}
      objectFit='cover'
      className='rounded-full bg-center'
    />
  );
};
