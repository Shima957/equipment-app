import { UpdateGear } from '@/components/organisms/UpdateGear';
import prisma from '@/lib/prisma';
import { gears } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { VFC } from 'react';

type Props = {
  gearData: gears | null;
};

interface Params extends ParsedUrlQuery {
  gearId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const gears = await prisma.gears.findMany({
    select: {
      id: true,
    },
  });
  const paths = gears.map((gear) => `/gear/${gear.id}`);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const gearId = params?.gearId;

  const gearData = await prisma.gears.findUnique({
    where: {
      id: Number(gearId),
    },
  });

  return {
    props: { gearData },
  };
};

const GearUpdatePage: VFC<Props> = ({ gearData }) => {
  return <UpdateGear gearData={gearData} />;
};

export default GearUpdatePage;
