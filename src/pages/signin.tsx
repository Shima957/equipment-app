import SignInForm from '@/components/organisms/SignInForm';
import GreenButton from '@/components/atoms/Button/LinkButton/GreenButton';
import paths from '@/paths';
import Head from 'next/head';

const SignIn = () => {
  return (
    <div className='w-[500px] mx-auto'>
      <Head>
        <title>ログイン | My U Gear</title>
      </Head>
      <SignInForm />
      <div className='mt-10 w-1/2 mx-auto'>
        <GreenButton href={paths.signUp}>アカウント作成</GreenButton>
      </div>
    </div>
  );
};

export default SignIn;
