import { Gears, User } from '@prisma/client';
import { VFC } from 'react';
import Avator from './Avator';
import Gear from './Gear';

type Props = {
  user: User | null;
  gears: (Gears | null)[];
};

const Profile: VFC<Props> = ({ user, gears }) => {
  return (
    <div className='space-y-4'>
      <div className='border border-gray-300 rounded-md p-4 w-1/2 mx-auto bg-white shadow-sm'>
        <div className='flex flex-col items-center space-y-4'>
          <Avator user={user} />
          <span className='font-bold text-xl'>
            {user?.displayName ?? user?.userId}
          </span>
        </div>
      </div>
      <Gear gears={gears} />
    </div>
  );
};

export default Profile;
