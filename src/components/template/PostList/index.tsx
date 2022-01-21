import { User } from '@prisma/client';
import Link from 'next/link';
import { VFC } from 'react';
import Image from 'next/image';

type Props = {
  users: (User | null)[];
};

const PostList: VFC<Props> = ({ users }) => {
  return (
    <div>
      <div className='mb-4'>
        <h2 className='text-3xl font-bold'>Users</h2>
      </div>
      <div className='grid grid-cols-6 gap-4'>
        {users.map((user) => (
          <Link href={user?.userId as string} key={user?.userId}>
            <a className='w-[153px] md:w-full flex flex-col items-center space-y-2 border-2 border-gray-300 rounded-xl p-4 shadow-sm transition-colors duration-200 hover:bg-gray-300'>
              <Image
                src={user?.avatarUrl ?? '/user.png'}
                alt='avatar'
                height={100}
                width={100}
                objectFit='cover'
                className='rounded-full bg-center'
              />
              <div>{user?.displayName ?? user?.userId}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostList;