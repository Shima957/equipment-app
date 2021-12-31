import SignInForm from '@/components/SignInForm';
import SecondaryLink from '@/components/Button/LinkButton/SecondaryLink';
import paths from '@/paths';

const SignIn = () => {
  return (
    <div className='w-[500px] mx-auto'>
      <SignInForm />
      <div className='mt-10 w-1/2 mx-auto'>
        <SecondaryLink href={paths.signUp}>アカウント作成</SecondaryLink>
      </div>
    </div>
  );
};

export default SignIn;
