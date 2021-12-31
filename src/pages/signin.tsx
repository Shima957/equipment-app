import SignInForm from '@/components/SignInForm';
import GreenButton from '@/components/Button/LinkButton/GreenButton';
import paths from '@/paths';

const SignIn = () => {
  return (
    <div className='w-[500px] mx-auto'>
      <SignInForm />
      <div className='mt-10 w-1/2 mx-auto'>
        <GreenButton href={paths.signUp}>アカウント作成</GreenButton>
      </div>
    </div>
  );
};

export default SignIn;
