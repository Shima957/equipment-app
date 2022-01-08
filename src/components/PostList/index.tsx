import { UserIcon } from '@heroicons/react/outline';
import { User } from '@prisma/client';
import Link from 'next/link';
import { VFC } from 'react';
import Image from 'next/image';

type Props = {
  users: User[];
};

const PostList: VFC<Props> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <Link href={user.userId} key={user.id}>
          <a className='w-1/5 flex flex-col items-center space-y-2 border-2 border-gray-300 rounded-xl p-4 shadow-sm transition-colors duration-200 hover:bg-gray-300'>
            {user.avatorUrl ? (
              <Image src={user.avatorUrl} width={80} height={80} alt='avator' />
            ) : (
              <div className='p-2 rounded-full bg-slate-500 h-20 w-20'>
                <UserIcon className='text-white' />
              </div>
            )}
            <div>{user.displayName ?? user.userId}</div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
