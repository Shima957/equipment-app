import Link from 'next/link';
import paths from '@/paths';
import { useForm } from 'react-hook-form';
import { auth } from '@/lib/supabase';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SignUpFormValue } from '@/types';
import { Form } from '@/components/atoms/Form';
import { FormField } from '@/components/atoms/FormField';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

const SignUpForm = () => {
  const route = useRouter();
  const methods = useForm<SignUpFormValue>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField label='ユーザーネーム' error={errors.displayName} required>
          <Input
            type='text'
            placeholder='ユーザーネーム'
            registeration={register('displayName', {
              required: 'ユーザーネームは必須です',
            })}
            error={errors.displayName}
          />
        </FormField>
        <FormField label='ユーザーID' error={errors.userId} required>
          <Input
            type='text'
            placeholder='ユーザーID'
            registeration={register('userId', {
              required: 'ユーザーIDは必須です',
            })}
            error={errors.userId}
          />
        </FormField>
        <FormField label='メールアドレス' error={errors.email} required>
          <Input
            type='email'
            placeholder='メールアドレス'
            registeration={register('email', {
              required: 'メールアドレスは必須です',
            })}
            error={errors.email}
          />
        </FormField>
        <FormField label='パスワード' error={errors.password} required>
          <Input
            type='password'
            placeholder='パスワード'
            registeration={register('password', {
              required: 'パスワードは必須です',
            })}
            error={errors.password}
          />
        </FormField>
        <Button type='submit' size='full' isLoading={isSubmitting}>
          登録
        </Button>
      </Form>
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
