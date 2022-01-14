import GreenBotton from '@/components/Button/LinkButton/GreenButton';
import Head from 'next/head';

const Custom404 = () => {
  return (
    <div className='w-1/2 mx-auto space-y-6 text-center divide-y-2 divide-gray-500'>
      <Head>
        <title>ページが見つかりません | My U Gear</title>
      </Head>
      <div className='space-y-2'>
        <h1 className='text-4xl font-bold'>404</h1>
        <p>お探しのページは見つかりませんでした</p>
      </div>
      <div className='pt-6 flex justify-center'>
        <GreenBotton href='/' size='md'>
          ホームへ
        </GreenBotton>
      </div>
    </div>
  );
};

export default Custom404;
