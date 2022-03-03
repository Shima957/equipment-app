import { UserSetting } from '@/components/template/UserSetting';
import Head from 'next/head';

const Setting = () => {
  return (
    <div className='flex flex-col items-center'>
      <Head>
        <title>アカウント設定 | My U Gear</title>
      </Head>
      <UserSetting />
    </div>
  );
};

export default Setting;
