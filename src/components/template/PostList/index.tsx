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
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4'>
        {users.map((user) => (
          <Link href={user?.user_id as string} key={user?.user_id}>
            <a className='w-[153px] md:w-full flex flex-col items-center space-y-2 bg-white rounded-xl p-4 drop-shadow-lg transition-colors duration-200 hover:bg-slate-100'>
              <Image
                src={user?.avatar_url ?? '/user.png'}
                alt='avatar'
                height={100}
                width={100}
                objectFit='cover'
                className='rounded-full bg-center'
              />
              <p className='text-lg font-bold'>
                {user?.display_name ?? user?.user_id}
              </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostList;
