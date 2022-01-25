import Profile from '@/components/template/Profile';
import prisma from '@/lib/prisma';
import { gears, users } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import { VFC } from 'react';

type Props = {
  user: users | null;
  gears: (gears | null)[];
};

interface Params extends ParsedUrlQuery {
  userId: string;
}

// ユーザーページのパスを生成
export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.users.findMany({
    select: {
      user_id: true,
    },
  });
  const paths = users.map((user) => `/${user.user_id}`);

  return { paths, fallback: false };
};

// ユーザーデータを取得
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const userId = params?.userId;

  // ユーザーデータ取得;
  const user = await prisma.users.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      post: true,
    },
  });

  // postからgear参照用Idを取得
  const gearsId = await prisma.post.findMany({
    where: {
      author_id: user?.user_id,
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
        <title>{user?.display_name} | My U Gear </title>
      </Head>
      <Profile user={user} gears={gears} />
    </div>
  );
};

export default UserPage;
