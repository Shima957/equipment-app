import EmailInput from '@/components/Input/EmailInput';
import PasswordInput from '../Input/PasswordInput';
import Link from 'next/link';
import PrimaryButton from '../Button/PrimaryButton';
import paths from '@/paths';
import { useForm, FormProvider } from 'react-hook-form';
import FormErrorMessage from '../Text/FormErrorMessage';
import { supabase } from '@/lib/supabase';

export type FormValue = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const methods = useForm<FormValue>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValue) => {
    const { error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    });
    console.error(error);
  };

  return (
    <div className='space-y-8 w-full border-2 border-gray-200 rounded-md p-10 bg-white'>
      <h2 className='text-xl font-bold text-gray-700 text-center'>ログイン</h2>

      <FormProvider {...methods}>
        <form
          className='flex flex-col items-center space-y-8 w-full'
          onSubmit={handleSubmit(onSubmit)}
        >
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

          <PrimaryButton buttonType='submit' isLoading={isSubmitting}>
            ログイン
          </PrimaryButton>
        </form>
      </FormProvider>

      <div className='text-center'>
        {/* リンクのパスは仮です */}
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
