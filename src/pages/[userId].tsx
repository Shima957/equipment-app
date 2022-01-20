import Profile from '@/components/Profile';
import addActionState from '@/globalState/addGearAction';
import LoginUserState from '@/globalState/LoginUser';
import prisma from '@/lib/prisma';
import { Gears, User } from '@prisma/client';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useState, useCallback, VFC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Head from 'next/head';

type Props = {
  user: User | null;
  gearData: (Gears | null)[];
};

interface Params extends ParsedUrlQuery {
  userId: string;
}

// ユーザーページのパスを生成
export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    select: {
      userId: true,
    },
  });
  const paths = users.map((user) => `/${user.userId}`);

  return { paths, fallback: false };
};

// ユーザーデータを取得
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const userId = params?.userId;

  // ユーザーデータ取得;
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    include: {
      post: true,
    },
  });

  // postからgear参照用Idを取得
  const gearsId = await prisma.post.findMany({
    where: {
      authorId: user?.userId,
    },
    select: {
      gearsId: true,
    },
  });

  // gearを取得
  const gears = await Promise.all(
    gearsId.map(async (gear) => {
      const gears = await prisma.gears.findFirst({
        where: {
          id: gear.gearsId as number,
        },
      });

      return gears;
    })
  );

  return {
    props: {
      user: user,
      gearData: gears,
    },
    revalidate: 30,
  };
};

const UserPage: VFC<Props> = ({ user, gearData }) => {
  const addGearAction = useRecoilValue(addActionState);
  const changeAddAction = useSetRecoilState(addActionState);
  const [gears, setGears] = useState<(Gears | null)[]>(gearData);
  const loginUser = useRecoilValue(LoginUserState);

  const getData = useCallback(async () => {
    if (loginUser) {
      // 自分のページのみで再取得を行う
      if (addGearAction && loginUser.userId === user?.userId) {
        const res = await axios.get('/api/get-post-gear', {
          params: { userId: user?.userId },
        });

        setGears(res.data);
        changeAddAction(false);
      }
    }
  }, [addGearAction, changeAddAction, loginUser, user?.userId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <Head>
        <title>{user?.displayName} | My U Gear </title>
      </Head>
      <Profile user={user} gears={gears} />
    </div>
  );
};

export default UserPage;
