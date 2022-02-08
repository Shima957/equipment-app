import PostList from '@/components/template/PostList';
import prisma from '@/lib/prisma';
import { users } from '@prisma/client';
import Head from 'next/head';
import { VFC } from 'react';

type Props = {
  users: users[];
};

export const getStaticProps = async () => {
  const users = await prisma.users.findMany({
    select: {
      user_id: true,
      display_name: true,
      avatar_url: true,
    },
  });

  return {
    props: {
      users: users,
    },
    revalidate: 10,
  };
};

const Home: VFC<Props> = ({ users }) => {
  return (
    <div>
      <Head>
        <title>My U Gear</title>
      </Head>
      <PostList users={users} />
    </div>
  );
};

export default Home;
