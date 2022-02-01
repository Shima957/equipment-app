import EmailInput from '@/components/atoms/Input/Auth/EmailInput';
import PasswordInput from '../../atoms/Input/Auth/PasswordInput';
import UserIdInput from '../../atoms/Input/Auth/UserIdInput';
import Link from 'next/link';
import PrimaryButton from '../../atoms/Button/PrimaryButton';
import paths from '@/paths';
import { useForm, FormProvider } from 'react-hook-form';
import { auth } from '@/lib/supabase';
import ConfirmPassword from '../../atoms/Input/Auth/ConfirmPassword';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SignUpFormValue } from '@/types';
import UserNameInput from '../../atoms/Input/Auth/UserNameInput';

const SignUpForm = () => {
  const route = useRouter();
  const methods = useForm<SignUpFormValue>();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: SignUpFormValue) => {
    try {
      // ユーザー登録
      const { user, error } = await auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;

      const sendData = {
        id: user?.id as string,
        displayName: data.displayName,
        email: user?.email as string,
        userId: data.userId,
      };

      // dbにユーザー情報を保存
      await axios.post('/api/create-user-db', sendData);
      reset();
      route.replace('/sendconfirmemail');
    } catch (error) {
      if (error instanceof Error) {
        alert('ユーザID、メールアドレスはすでに使われています');
      }
    }
  };

  return (
    <div className='space-y-8 w-full border-2 border-gray-200 rounded-md p-10 bg-white'>
      <h2 className='text-xl font-bold text-gray-700 text-center'>新規登録</h2>

      <FormProvider {...methods}>
        <form
          className='flex flex-col items-center space-y-8 w-full'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
              ユーザネーム
            </span>
            <UserNameInput />
          </label>
          <label>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
              ユーザーID
            </span>
            <UserIdInput />
          </label>
          <label>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
              メールアドレス
            </span>
            <EmailInput />
          </label>

          <label>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
              パスワード
            </span>
            <PasswordInput />
          </label>

          <label>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
              パスワードの確認
            </span>
            <ConfirmPassword />
          </label>

          <PrimaryButton buttonType='submit' isLoading={isSubmitting} size='lg'>
            登録
          </PrimaryButton>
        </form>
      </FormProvider>

      <div className='text-center'>
        <Link href={paths.signIn}>
          <a className='text-sm text-blue-400 underline hover:text-blue-500'>
            アカウントをお持ちの場合
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
