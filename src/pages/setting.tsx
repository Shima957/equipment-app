import SettingLyout from '@/components/template/Setting';
import Head from 'next/head';

const Setting = () => {
  return (
    <div className='flex flex-col items-center'>
      <Head>
        <title>アカウント設定 | My U Gear</title>
      </Head>
      <SettingLyout />
    </div>
  );
};

export default Setting;
