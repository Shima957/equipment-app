import EmailInput from '@/components/AuthInput/EmailInput';
import PasswordInput from '../AuthInput/PasswordInput';
import Link from 'next/link';
import PrimaryButton from '../Button/PrimaryButton';
import paths from '@/paths';
import { useForm, FormProvider } from 'react-hook-form';
import { auth } from '@/lib/supabase';
import { useRouter } from 'next/router';

export type FormValue = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const route = useRouter();
  const methods = useForm<FormValue>();
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = methods;

  const onSubmit = async (data: FormValue) => {
    try {
      const { error } = await auth.signIn({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      if (isSubmitted) route.replace(paths.home);
    } catch (error) {
      console.error(error);
    }
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
          </label>

          <label className='w-full'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
              パスワード
            </span>
            <PasswordInput />
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
