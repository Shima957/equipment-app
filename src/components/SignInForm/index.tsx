import Input from '@/components/Input';
import Link from 'next/link';
import PrimaryButton from '../Button/PrimaryButton';
import paths from '@/paths';
import { useForm, FormProvider } from 'react-hook-form';

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

  const onSubmit = (data: FormValue) => {
    console.log(data);
  };

  return (
    <div className='space-y-8 w-full border-2 border-gray-200 rounded-md p-10'>
      <h2 className='text-lg font-bold text-gray-700 text-center'>
        サインイン
      </h2>

      <FormProvider {...methods}>
        <form
          className='flex flex-col items-center space-y-8'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className='w-96'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
              メールアドレス
            </span>
            <Input
              inputType='email'
              placeholder='メールアドレス'
              rhfRegisterName='email'
              rhfRequired={'メールアドレスは必須です'}
              error={errors.email?.type}
            />
            {errors.email?.type === 'required' && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </label>

          <label className='w-96'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
              パスワード
            </span>
            <Input
              inputType='password'
              placeholder='パスワード'
              rhfRegisterName='password'
              rhfRequired={'パスワードは必須です'}
              error={errors.password?.type}
            />
            {errors.password?.type === 'required' && (
              <p className='text-red-500'>{errors.password?.message}</p>
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
