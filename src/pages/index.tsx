import PostList from '@/components/PostList';
import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { User } from '@prisma/client';
import { VFC } from 'react';

type Props = {
  users: User[];
};

const Home: VFC<Props> = ({ users }) => {
  return <PostList users={users} />;
};

export default Home;

export const getStaticProps = async () => {
  const res = await prisma.user.findMany();
  const users = res.map((res) => {
    if (res.avatorUrl) {
      return {
        id: res.id,
        userId: res.userId,
        displayName: res.displayName,
        avatorUrl: supabase.storage.from('avator').download(res.avatorUrl),
      };
    } else {
      return {
        id: res.id,
        userId: res.userId,
        displayName: res.displayName,
        avatorUrl: null,
      };
    }
  });

  return {
    props: {
      users: users,
    },
  };
};
