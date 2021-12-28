import PrimaryLink from '@/components/Button/LinkButton/PrimaryLink';
import paths from '@/paths';

const SendConfirmEmail = () => {
  return (
    <div className='flex flex-col items-center w-60 mx-auto space-y-3'>
      <h2>登録確認のメールを送信しました。</h2>
      <PrimaryLink link={paths.home}>ホームへ</PrimaryLink>
    </div>
  );
};

export default SendConfirmEmail;
