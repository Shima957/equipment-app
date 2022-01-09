import { UserIcon } from '@heroicons/react/outline';
import { User } from '@prisma/client';
import { useEffect, VFC } from 'react';

type Props = {
  user: User | null;
};

const Avator: VFC<Props> = ({ user }) => {
  useEffect(() => {}, []);

  return (
    <div className=''>
      {user?.avatorUrl ? (
        <img
          src={user.avatorUrl}
          alt='アイコン'
          className='w-40 h-40 rounded-full'
        />
      ) : (
        <div className='bg-slate-400 rounded-full p-4 w-40 h-40'>
          <UserIcon className='h-32 w-32 text-white' />
        </div>
      )}
    </div>
  );
};

export default Avator;
