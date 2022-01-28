import { users } from '@prisma/client';
import Link from 'next/link';
import { VFC } from 'react';
import Image from 'next/image';

type Props = {
  users: (users | null)[];
};

const PostList: VFC<Props> = ({ users }) => {
  return (
    <div>
      <div className='mb-4'>
        <h2 className='text-3xl font-bold'>Users</h2>
      </div>
      <div className='grid grid-cols-6 gap-4'>
        {users.map((user) => (
          <Link href={user?.user_id as string} key={user?.user_id}>
            <a className='w-[153px] md:w-full flex flex-col items-center space-y-2 bg-white border-2 border-gray-300 rounded-xl p-4 shadow-sm transition-colors duration-200 hover:bg-gray-100'>
              <Image
                src={user?.avatar_url ?? '/user.png'}
                alt='avatar'
                height={100}
                width={100}
                objectFit='cover'
                className='rounded-full bg-center'
              />
              <div>{user?.display_name ?? user?.user_id}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostList;
