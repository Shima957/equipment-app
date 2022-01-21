import PostList from '@/components/template/PostList';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import Head from 'next/head';
import { VFC } from 'react';

type Props = {
  users: User[];
};

export const getStaticProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      userId: true,
      displayName: true,
      avatarUrl: true,
    },
  });

  return {
    props: {
      users: users,
    },
    revalidate: 60,
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
