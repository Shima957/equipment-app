import { ButtonLink } from '@/components/atoms/ButtonLink';
import { paths } from '@/paths';
import Head from 'next/head';

const SendConfirmEmail = () => {
  return (
    <div className='flex flex-col items-center w-60 mx-auto space-y-3'>
      <Head>
        <title>登録ありがとうございます | My U Gear</title>
      </Head>
      <h1>登録ありがとうございました。</h1>
      <h2>確認メールを送信しました。</h2>
      <ButtonLink
        href={paths.home}
        size='md'
        title='ホームへ'
        variant='primary'
      />
    </div>
  );
};

export default SendConfirmEmail;
