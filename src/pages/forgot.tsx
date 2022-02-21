import { Button } from '@/components/atoms/Button';
import { Form } from '@/components/atoms/Form';
import { Input } from '@/components/atoms/Input';
import { ErrorToast, SuccessToast } from '@/components/atoms/Toast';
import { useToast } from '@/hooks';
import { auth } from '@/lib/supabase';
import { paths } from '@/paths';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Forgot = () => {
  const route = useRouter();
  const { toastState, toggleToast, closeToast } = useToast();
  const [errorToastState, setErrorToastState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    const { error } = await auth.api.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/${paths.recoverPass}`,
    });

    if (!error) {
      toggleToast();
    } else {
      setErrorToastState(true);
      setInterval(() => {
        setErrorToastState(false);
      }, 4000);
    }
  };

  return (
    <div className='items-center w-1/2 mx-auto bg-white py-4 px-12 rounded-md space-y-4'>
      <Head>
        <title>パスワードをリセット | My U Gear</title>
      </Head>
      <h2 className='text-xl font-bold'>パスワードを再設定</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center space-y-4'>
          <Input
            type='email'
            registeration={register('email', {
              required: 'メールアドレスを入力して下さい',
            })}
            error={errors.email}
          />
          <div className='flex justify-end space-x-2 w-full'>
            <Button
              type='button'
              size='sm'
              variant='secondary'
              onClick={() => route.push(paths.signIn)}
            >
              キャンセル
            </Button>
            <Button type='submit' size='sm' isLoading={isSubmitting}>
              送信
            </Button>
          </div>
        </div>
      </Form>
      <SuccessToast toastState={toastState} closeToast={closeToast}>
        送信しました
      </SuccessToast>
      <ErrorToast toastState={errorToastState}>送信に失敗しました</ErrorToast>
    </div>
  );
};

export default Forgot;
