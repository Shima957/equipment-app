import LoginUser from '@/globalState/LoginUser';
import { auth } from '@/lib/supabase';
import { NextPage, NextPageContext } from 'next';
import { useSetRecoilState } from 'recoil';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { useEffect } from 'react';

const Home: NextPage<{ userData: User }> = ({ userData }) => {
  const setUser = useSetRecoilState(LoginUser);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [setUser, userData]);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx: NextPageContext) => {
  const accessToken = ctx.req?.headers.cookie?.split('=')[1];
  if (!accessToken) {
    return { props: {} };
  }
  const { user } = await auth.api.getUser(accessToken as string);
  if (!user) {
    auth.api.signOut(accessToken);

    return { props: {} };
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  return {
    props: { userData },
  };
};
