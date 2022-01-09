import { XIcon } from '@heroicons/react/outline';
import { VFC } from 'react';
import Modal from '../index';
import SecondaryButton from '@/components/Button/SecondaryButton';
import TextInput from '@/components/Input/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import PrimaryButton from '@/components/Button/PrimaryButton';
import FileInput from '@/components/Input/FileInput';
import { User } from '@prisma/client';
import axios from 'axios';
import { supabase } from '@/lib/supabase';

type Props = {
  user: User | null;
  modalState: boolean;
  closeModal: () => void;
};

type FormValue = {
  name: string;
  avator: File[];
};

const UpdateProfile: VFC<Props> = ({ user, modalState, closeModal }) => {
  const displayName = user?.displayName ? user.displayName : undefined;
  const methods = useForm<FormValue>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const post = async (data: FormValue, fileName: string | null) => {
    const sendData = {
      id: user?.id,
      name: data.name,
      imgUrl: fileName,
    };
    await axios.post('/api/update-profile', sendData);
  };

  const setImgFile = async (data: FormValue) => {
    if (data.avator.length === 0) {
      try {
        post(data, null);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const fileExt = data.avator[0].name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error } = await supabase.storage
          .from('avator')
          .upload(fileName, data.avator[0]);
        if (error) throw error;
        post(data, fileName);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onSubmit = async (data: FormValue) => {
    await setImgFile(data);
    closeModal();
  };

  return (
    <Modal modalSate={modalState} closeModal={closeModal}>
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-bold'>プロフィールの更新</h2>
          <button
            type='button'
            onClick={closeModal}
            className='p-1 rounded-md text-gray-500 focus:ring-sky-300 focus:outline-none focus:ring'
          >
            <XIcon className='h-6 w-6' />
          </button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-6'>
              <label>
                <span>ユーザーネーム</span>
                <TextInput registerName='name' defaultValue={displayName} />
              </label>
              <label>
                <span>アイコン画像</span>
                <div
                  className={`border rounded-md p-2 shadow-sm ${
                    errors.avator?.[0]?.type === 'required'
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                >
                  <FileInput registerName='avator' />
                </div>
              </label>
              <div className='flex justify-end space-x-2'>
                <SecondaryButton
                  buttonType='button'
                  size='min'
                  onClick={closeModal}
                >
                  閉じる
                </SecondaryButton>
                <PrimaryButton
                  buttonType='submit'
                  size='min'
                  isLoading={isSubmitting}
                >
                  更新
                </PrimaryButton>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default UpdateProfile;
