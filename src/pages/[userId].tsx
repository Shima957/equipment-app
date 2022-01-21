import Profile from '@/components/template/Profile';
import prisma from '@/lib/prisma';
import { Gears, User } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import { VFC } from 'react';

type Props = {
  user: User | null;
  gears: (Gears | null)[];
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
    props: { user, gears },
    revalidate: 30,
  };
};

const UserPage: VFC<Props> = ({ user, gears }) => {
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
