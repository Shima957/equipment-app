import { FormProvider, useForm } from 'react-hook-form';
import EmailInput from '@/components/Input/Auth/EmailInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import LoginUserState from '@/globalState/LoginUser';
import NewEmailInput from '@/components/Input/Auth/NewEmailInput';
import axios from 'axios';
import { auth } from '@/lib/supabase';
import { useState } from 'react';
import SuccessToast from '@/components/Toast/SuccessToast';

type FormValue = {
  email: string;
  newEmail: string;
};

const ChangeEmail = () => {
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const loginUser = useRecoilValue(LoginUserState);
  const updateLoginUser = useSetRecoilState(LoginUserState);
  const [toastState, setToastState] = useState(false);
  const onSubmit = async (data: FormValue) => {
    if (data.email === loginUser?.email) {
      const { user } = await auth.update({ email: data.newEmail });
      await axios.post('/api/change-email', data);
      const res = await axios.get(`/api/get-login-user/${user?.id}`);
      updateLoginUser(res.data);
      setToastState(true);
      setInterval(() => {
        setToastState(false);
      }, 4000);
      reset();
    } else {
      alert('現在のメールアドレスが正しくありません');
    }
  };

  return (
    <div>
      <h2 className='font-bold text-lg'>メールアドレスの変更</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center space-y-3'>
            <label className='flex flex-col'>
              <span ml-1>現在のメールアドレス</span>
              <EmailInput />
            </label>
            <label className='flex flex-col'>
              <span ml-1>新しいメールアドレス</span>
              <NewEmailInput />
            </label>
            <PrimaryButton
              buttonType='submit'
              size='min'
              isLoading={isSubmitting}
            >
              変更する
            </PrimaryButton>
          </div>
        </form>
      </FormProvider>
      <SuccessToast toastState={toastState}>
        メールアドレスを変更しました
      </SuccessToast>
    </div>
  );
};

export default ChangeEmail;
