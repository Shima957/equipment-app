import { SignInForm } from '@/components/template/SignInForm';
import { paths } from '@/paths';
import Head from 'next/head';
import { ButtonLink } from '@/components/atoms/ButtonLink/ButtonLink';

const SignIn = () => {
  return (
    <div className='w-[500px] mx-auto'>
      <Head>
        <title>ログイン | My U Gear</title>
      </Head>
      <SignInForm />
      <div className='mt-10 w-1/2 mx-auto'>
        <ButtonLink variant='green' href={paths.signUp}>
          アカウント作成
        </ButtonLink>
      </div>
    </div>
  );
};

export default SignIn;
