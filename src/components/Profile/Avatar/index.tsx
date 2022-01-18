import { User } from '@prisma/client';
import { VFC } from 'react';
import Image from 'next/image';

type Props = {
  user: User | null;
};

const Avatar: VFC<Props> = ({ user }) => {
  return (
    <Image
      src={user?.avatarUrl ?? '/user.png'}
      alt='userIcon'
      height={140}
      width={140}
      objectFit='cover'
      className='rounded-full bg-center'
    />
  );
};

export default Avatar;
