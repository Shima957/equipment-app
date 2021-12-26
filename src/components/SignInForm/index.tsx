import Input from '@/components/Input';
import Link from 'next/link';
import PrimaryButton from '../Button/PrimaryButton';
import paths from '@/paths';

const SignInForm = () => {
  return (
    <div className='space-y-8 w-full border-2 border-gray-200 rounded-md p-10'>
      <h2 className='text-lg font-bold text-gray-700 text-center'>
        サインイン
      </h2>
      <form className='flex flex-col items-center space-y-8'>
        <label className='w-96'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
            メールアドレス
          </span>
          <Input inputType='email' placeholder='メールアドレス' />
        </label>
        <label className='w-96'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
            パスワード
          </span>
          <Input inputType='password' placeholder='パスワード' />
        </label>
        <PrimaryButton buttonType='submit'>SignIn</PrimaryButton>
      </form>
      <div className='text-center'>
        <Link href={paths.home}>
          <a className='text-sm text-blue-400 underline hover:text-blue-500'>
            パスワードを忘れた場合
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
