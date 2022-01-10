import { FormProvider, useForm } from 'react-hook-form';
import PrimaryButton from '@/components/Button/PrimaryButton';
import ConfirmPassword from '@/components/Input/Auth/ConfirmPassword';
import PasswordInput from '@/components/Input/Auth/PasswordInput';
const ChangePassowrd = () => {
  const methods = useForm();

  return (
    <div>
      <h2 className='font-bold text-lg'>パスワードの変更</h2>
      <FormProvider {...methods}>
        <form>
          <div className='flex flex-col items-center space-y-3'>
            <label className='flex flex-col'>
              <span className='ml-1'>現在のパスワード</span>
              <PasswordInput />
            </label>
            <label className='flex flex-col'>
              <span className='ml-1'>新しいパスワード</span>
              <PasswordInput />
            </label>
            <label className='flex flex-col'>
              <span className='ml-1'>確認のためもう一度入力して下さい</span>
              <ConfirmPassword />
            </label>
            <PrimaryButton buttonType='button' size='md'>
              パスワードを変更する
            </PrimaryButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChangePassowrd;
