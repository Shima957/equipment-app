import userState from '@/atoms/atoms';
import { auth } from '@/lib/supabase';
import { NextPage, NextPageContext } from 'next';
import { useSetRecoilState } from 'recoil';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { useEffect } from 'react';

const Home: NextPage<{ userData: User }> = ({ userData }) => {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [setUser, userData]);

  return <h1>hello</h1>;
};

export default Home;

export const getServerSideProps = async (ctx: NextPageContext) => {
  const accessToken = ctx.req?.headers.cookie?.split('=')[1];
  if (!accessToken) return { props: {} };
  const { user } = await auth.api.getUser(accessToken as string);
  const userData = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  return {
    props: { userData },
  };
};
