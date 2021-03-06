import { Button } from '@/components/atoms/Button';
import { auth } from '@/lib/supabase';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';

export const DeleteAccount = () => {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async () => {
    const res = await axios.get('/api/delete-account');
    if (res.status === 200) {
      auth.signOut();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center space-y-6'>
          <div className='flex flex-col items-center space-y-2'>
            <h2 className='font-bold text-lg'>アカウントの削除</h2>
            <p>データの復元は出来ません。</p>

            <Button type='submit' variant='danger' isLoading={isSubmitting}>
              アカウントを削除
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
