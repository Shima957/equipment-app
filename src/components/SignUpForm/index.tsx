import EmailInput from '@/components/Input/EmailInput';
import PasswordInput from '../Input/PasswordInput';
import Link from 'next/link';
import PrimaryButton from '../Button/PrimaryButton';
import paths from '@/paths';
import { useForm, FormProvider } from 'react-hook-form';
import FormErrorMessage from '../Text/FormErrorMessage';
import { supabase } from '@/lib/supabase';
import ConfirmPassword from '../Input/ConfirmPassword';
import UserNameInput from '../Input/UserNameInput';
import axios from 'axios';
import { useRouter } from 'next/router';

export type FormValue = {
  email: string;
  name: string;
  password: string;
  confirm: string;
};

const SignUpForm = () => {
  const route = useRouter();
  const methods = useForm<FormValue>();
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValue) => {
    try {
      // ユーザー登録
      const { user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;

      const sendData = {
        id: user?.id as string,
        email: user?.email as string,
        username: data.name,
      };

      // dbにユーザー情報を保存
      await axios.post('/api/createUserDb', sendData);
      reset();
      route.replace('/sendconfirmemail');
    } catch (error) {
      console.error(error);
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
          <label className='w-full'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
              ユーザーネーム
            </span>
            <UserNameInput />
            {errors.name?.type === 'required' && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </label>
          <label className='w-full'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
              メールアドレス
            </span>
            <EmailInput />
            {errors.email?.type === 'required' && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </label>

          <label className='w-full'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
              パスワード
            </span>
            <PasswordInput />
            {errors.password?.type === 'required' && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
            {errors.password?.type === 'minLength' && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </label>

          <label className='w-full'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
              パスワードの確認
            </span>
            <ConfirmPassword />
            {errors.confirm?.type === 'validate' && (
              <FormErrorMessage>{errors.confirm.message}</FormErrorMessage>
            )}
            {errors.confirm?.type === 'required' && (
              <FormErrorMessage>{errors.confirm.message}</FormErrorMessage>
            )}
          </label>

          <PrimaryButton buttonType='submit' isLoading={isSubmitting}>
            登録
          </PrimaryButton>
        </form>
      </FormProvider>

      <div className='text-center'>
        {/* リンクのパスは仮です */}
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