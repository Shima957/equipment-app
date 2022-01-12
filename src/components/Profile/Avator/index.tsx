import { User } from '@prisma/client';
import { VFC } from 'react';
import Image from 'next/image';

type Props = {
  user: User | null;
};

const Avator: VFC<Props> = ({ user }) => {
  return (
    <Image
      src={user?.avatorUrl ?? '/user.png'}
      alt='userIcon'
      height={140}
      width={140}
      objectFit='cover'
      className='rounded-full bg-center'
    />
  );
};

export default Avator;
