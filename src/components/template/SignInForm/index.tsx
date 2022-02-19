import Link from 'next/link';
import paths from '@/paths';
import { useForm } from 'react-hook-form';
import { auth } from '@/lib/supabase';
import { useRouter } from 'next/router';
import { Form } from '@/components/atoms/Form';
import { FormField } from '@/components/atoms/FormField';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

export type FormValue = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const route = useRouter();
  const methods = useForm<FormValue>();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValue) => {
    const { error } = await auth.signIn({
      email: data.email,
      password: data.password,
    });
    if (error?.message === 'Invalid login credentials') {
      alert('入力された情報を持つアカウントが見つかりませんでした');
    } else {
      route.replace(paths.home);
    }
  };

  return (
    <div className='space-y-8 w-full border-2 border-gray-200 rounded-md p-10 bg-white'>
      <h2 className='text-xl font-bold text-gray-700 text-center'>ログイン</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField label='メールアドレス' error={errors.email} required>
          <Input
            type='email'
            placeholder='メールアドレス'
            registeration={register('email', {
              required: 'メールアドレスを入力して下さい',
            })}
            error={errors.email}
          />
        </FormField>
        <FormField label='パスワード' error={errors.password} required>
          <Input
            type='password'
            placeholder='パスワード'
            registeration={register('password', {
              required: 'パスワードを入力して下さい',
            })}
            error={errors.password}
          />
        </FormField>
        <Button type='submit' size='full' isLoading={isSubmitting}>
          ログイン
        </Button>
      </Form>

      <div className='text-center'>
        <Link href={paths.forgot}>
          <a className='text-sm text-blue-400 underline hover:text-blue-500'>
            パスワードを忘れた場合
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
