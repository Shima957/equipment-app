import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import LoginUserState from '@/globalState/LoginUser';
import axios from 'axios';
import { auth } from '@/lib/supabase';
import { SuccessToast } from '@/components/atoms/Toast';
import { useToast } from '@/hooks';
import { Form } from '@/components/atoms/Form';
import { FormField } from '@/components/atoms/FormField';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

type FormValue = {
  email: string;
  newEmail: string;
};

export const ChangeEmail = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValue>();
  const loginUser = useRecoilValue(LoginUserState);
  const updateLoginUser = useSetRecoilState(LoginUserState);
  const { toastState, toggleToast, closeToast } = useToast();
  const onSubmit = async (data: FormValue) => {
    if (data.email === loginUser?.email) {
      const { user } = await auth.update({ email: data.newEmail });
      await axios.post('/api/change-email', data);
      const res = await axios.get(`/api/get-login-user/${user?.id}`);
      updateLoginUser(res.data);
      toggleToast();
      reset();
    } else {
      alert('現在のメールアドレスが正しくありません');
    }
  };

  return (
    <div className='w-[400px]'>
      <h2 className='font-bold text-lg'>メールアドレスの変更</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField label='現在のメールアドレス'>
          <Input
            type='email'
            placeholder='現在のメールアドレス'
            registeration={register('email', {
              required: '現在のメールアドレスを入力して下さい',
            })}
            error={errors.email}
          />
        </FormField>
        <FormField label='新しいメールアドレス'>
          <Input
            type='email'
            placeholder='新しいメールアドレス'
            registeration={register('newEmail', {
              required: '新しいメールアドレスを入力して下さい',
            })}
            error={errors.newEmail}
          />
        </FormField>
        <Button type='submit' isLoading={isSubmitting}>
          メールアドレスを変更する
        </Button>
      </Form>
      <SuccessToast toastState={toastState} closeToast={closeToast}>
        メールアドレスを変更しました
      </SuccessToast>
    </div>
  );
};
