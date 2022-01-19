import PrimaryButton from '@/components/atoms/Button/PrimaryButton';
import SecondaryButton from '@/components/atoms/Button/SecondaryButton';
import EmailInput from '@/components/atoms/Input/Auth/EmailInput';
import ErrorToast from '@/components/atoms/Toast/ErrorToast';
import SuccessToast from '@/components/atoms/Toast/SuccessToast';
import { auth } from '@/lib/supabase';
import paths from '@/paths';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const Forgot = () => {
  const route = useRouter();
  const [toastState, setToastState] = useState(false);
  const [errorToastState, setErrorToastState] = useState(false);
  const methods = useForm<{ email: string }>();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: { email: string }) => {
    const { error } = await auth.api.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/${paths.recoverPass}`,
    });

    if (!error) {
      setToastState(true);
      setInterval(() => {
        setToastState(false);
      }, 4000);
    } else {
      setErrorToastState(true);
      setInterval(() => {
        setErrorToastState(false);
      }, 4000);
    }
  };

  return (
    <div className='flex flex-col items-center w-1/2 mx-auto bg-white p-4 space-y-4'>
      <Head>
        <title>パスワードをリセット | My U Gear</title>
      </Head>
      <h2 className='text-xl font-bold'>パスワードを再設定</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center space-y-4'>
            <EmailInput />
            <div className='flex justify-end space-x-2 w-full'>
              <SecondaryButton
                buttonType='button'
                size='min'
                onClick={() => route.push(paths.signIn)}
              >
                キャンセル
              </SecondaryButton>
              <PrimaryButton
                buttonType='submit'
                size='min'
                isLoading={isSubmitting}
              >
                送信
              </PrimaryButton>
            </div>
          </div>
        </form>
      </FormProvider>
      <SuccessToast toastState={toastState}>送信しました</SuccessToast>
      <ErrorToast toastState={errorToastState}>送信に失敗しました</ErrorToast>
    </div>
  );
};

export default Forgot;
