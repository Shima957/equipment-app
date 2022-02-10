import { FormProvider, useForm } from 'react-hook-form';
import PrimaryButton from '@/components/atoms/Button/PrimaryButton';
import ConfirmPassword from '@/components/atoms/Input/Auth/ConfirmPassword';
import PasswordInput from '@/components/atoms/Input/Auth/PasswordInput';
import { auth } from '@/lib/supabase';
import SuccessToast from '@/components/atoms/Toast/SuccessToast';
import useToast from '@/hooks/useToast';

type FormValue = {
  password: string;
  confirm: string;
};

const ChangePassowrd = () => {
  const { toastState, toggleToast, closeToast } = useToast();
  const methods = useForm<FormValue>();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValue) => {
    await auth.update({ password: data.confirm });
    reset();
    toggleToast();
  };

  return (
    <div>
      <h2 className='font-bold text-lg'>パスワードの変更</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center space-y-3'>
            <label className='flex flex-col'>
              <span className='ml-1'>新しいパスワード</span>
              <PasswordInput />
            </label>
            <label className='flex flex-col'>
              <span className='ml-1'>確認のためもう一度入力して下さい</span>
              <ConfirmPassword />
            </label>
            <PrimaryButton
              buttonType='submit'
              size='md'
              isLoading={isSubmitting}
            >
              パスワードを変更する
            </PrimaryButton>
          </div>
        </form>
      </FormProvider>
      <SuccessToast toastState={toastState} closeToast={closeToast}>
        パスワードを変更しました
      </SuccessToast>
    </div>
  );
};

export default ChangePassowrd;
