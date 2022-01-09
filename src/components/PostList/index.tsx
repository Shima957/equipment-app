/* eslint-disable @next/next/no-img-element */
import { User } from '@prisma/client';
import Link from 'next/link';
import { VFC } from 'react';

type Props = {
  users: User[];
};

const PostList: VFC<Props> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <Link href={user.userId} key={user.userId}>
          <a className='w-1/5 flex flex-col items-center space-y-2 border-2 border-gray-300 rounded-xl p-4 shadow-sm transition-colors duration-200 hover:bg-gray-300'>
            <img
              src={user.avatorUrl ?? '/user.png'}
              alt='avator'
              className='w-20 h-20 rounded-full'
            />
            <div>{user.displayName ?? user.userId}</div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
