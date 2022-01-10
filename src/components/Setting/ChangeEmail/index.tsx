import { FormProvider, useForm } from 'react-hook-form';
import EmailInput from '@/components/Input/Auth/EmailInput';
import PrimaryButton from '@/components/Button/PrimaryButton';

const ChangeEmail = () => {
  const methods = useForm();

  return (
    <div>
      <h2 className='font-bold text-lg'>メールアドレスの変更</h2>
      <FormProvider {...methods}>
        <form>
          <div className='flex flex-col items-center space-y-3'>
            <label className='flex flex-col'>
              <span ml-1>現在のメールアドレス</span>
              <EmailInput />
            </label>
            <label className='flex flex-col'>
              <span ml-1>新しいメールアドレス</span>
              <EmailInput />
            </label>
            <PrimaryButton buttonType='button' size='min'>
              変更する
            </PrimaryButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChangeEmail;
