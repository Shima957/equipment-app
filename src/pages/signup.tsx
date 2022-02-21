import { SignUpForm } from '@/components/template/SignUpForm';
import Head from 'next/head';

const SignUp = () => {
  return (
    <div className='w-[500px] mx-auto'>
      <Head>
        <title>会員登録 | My U Gear</title>
      </Head>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
