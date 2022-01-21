import ChangePassowrd from '@/components/molecules/ChangePassword';
import Head from 'next/head';

const Recover = () => {
  return (
    <div className='flex flex-col items-center'>
      <Head>
        <title>パスワードを再設定 | My U Gear</title>
      </Head>
      <ChangePassowrd />
    </div>
  );
};

export default Recover;
