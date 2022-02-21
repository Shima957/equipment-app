import { useForm } from 'react-hook-form';
import { auth } from '@/lib/supabase';
import { SuccessToast } from '@/components/atoms/Toast';
import { useToast } from '@/hooks';
import { Button } from '@/components/atoms/Button';
import { FormField } from '@/components/atoms/FormField';
import { Input } from '@/components/atoms/Input';
import { Form } from '@/components/atoms/Form';

type FormValue = {
  password: string;
  confirm: string;
};

export const ChangePassowrd = () => {
  const { toastState, toggleToast, closeToast } = useToast();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValue>();

  const onSubmit = async (data: FormValue) => {
    await auth.update({ password: data.confirm });
    reset();
    toggleToast();
  };

  return (
    <div className='w-[400px]'>
      <h2 className='font-bold text-lg'>パスワードの変更</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField label='新しいパスワード'>
          <Input
            type='password'
            placeholder='新しいパスワード'
            registeration={register('password', {
              required: '新しいパスワードを入力して下さい',
            })}
            error={errors.password}
          />
        </FormField>
        <FormField label='確認パスワード'>
          <Input
            type='password'
            placeholder='パスワードの確認'
            registeration={register('confirm', {
              required: '確認用パスワードを入力して下さい',
              validate: (value) =>
                value === getValues('password')
                  ? undefined
                  : 'パスワードが一致しません',
            })}
            error={errors.confirm}
          />
        </FormField>
        <Button type='submit' isLoading={isSubmitting}>
          パスワードを変更する
        </Button>
      </Form>
      <SuccessToast toastState={toastState} closeToast={closeToast}>
        パスワードを変更しました
      </SuccessToast>
    </div>
  );
};
