import PrimaryLink from '@/components/Button/LinkButton/PrimaryLink';
import paths from '@/paths';

const SendConfirmEmail = () => {
  return (
    <div className='flex flex-col items-center w-60 mx-auto space-y-3'>
      <h1>登録ありがとうございました。</h1>
      <h2>確認メールを送信しました。</h2>
      <PrimaryLink href={paths.home}>ホームへ</PrimaryLink>
    </div>
  );
};

export default SendConfirmEmail;
