import PostList from '@/components/PostList';
import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { User } from '@prisma/client';
import { useEffect, useState, VFC } from 'react';

type Props = {
  users: User[];
};

const Home: VFC<Props> = ({ users }) => {
  const [userData, setUserData] = useState<(User | null)[]>([]);
  useEffect(() => {
    users.map(async (user) => {
      if (user?.avatorUrl) {
        const { data } = await supabase.storage
          .from('avator')
          .download(user.avatorUrl);
        if (data) {
          const url = window.URL.createObjectURL(data as Blob);
          user.avatorUrl = url;
          setUserData(users);
        }
      }
    });
  }, [users]);

  return <PostList users={userData} />;
};

export default Home;

export const getStaticProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      userId: true,
      displayName: true,
      avatorUrl: true,
    },
  });

  return {
    props: {
      users: users,
    },
    revalidate: 60,
  };
};
