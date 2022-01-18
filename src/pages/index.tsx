import PostList from '@/components/PostList';
import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { User } from '@prisma/client';
import Head from 'next/head';
import { useEffect, useState, VFC } from 'react';

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
  const [userData, setUserData] = useState<(User | null)[]>([]);
  useEffect(() => {
    users.map(async (user) => {
      if (user?.avatarUrl) {
        const { data } = await supabase.storage
          .from('avatar')
          .download(user.avatarUrl);
        if (data) {
          const url = window.URL.createObjectURL(data as Blob);
          user.avatarUrl = url;
          setUserData(users);
        }
      } else {
        setUserData(users);
      }
    });
  }, [users]);

  return (
    <div>
      <Head>
        <title>My U Gear</title>
      </Head>
      <PostList users={userData} />
    </div>
  );
};

export default Home;
