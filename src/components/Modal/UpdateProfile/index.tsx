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
import FormErrorMessage from '@/components/Text/FormErrorMessage';

type Props = {
  user: User | null;
  modalState: boolean;
  closeModal: () => void;
};

type FormValue = {
  name: string;
  twitterId: string;
  soundCloudId: string;
  avatar: File[];
};

const UpdateProfile: VFC<Props> = ({ user, modalState, closeModal }) => {
  const displayName = user?.displayName ? user.displayName : undefined;
  const twitter = user?.twitterId ? user.twitterId : undefined;
  const soundCloud = user?.soundCloudId ? user.soundCloudId : undefined;

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
      twitterId: data.twitterId,
      soundCloudId: data.soundCloudId,
    };

    await axios.post('/api/update-profile', sendData);
  };

  const setImgFile = async (data: FormValue) => {
    if (data.avatar.length === 0) {
      try {
        post(data, null);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const fileExt = data.avatar[0].name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error } = await supabase.storage
          .from('avatar')
          .upload(fileName, data.avatar[0]);
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
                <TextInput
                  registerName='name'
                  defaultValue={displayName}
                  error={errors.name?.type === 'required'}
                  required='ユーザーネームは必須です'
                />
                {errors.name?.type === 'required' && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </label>
              <label>
                <span>Twitter</span>
                <TextInput
                  registerName='twitterId'
                  placeholder='@は不要です'
                  defaultValue={twitter}
                />
              </label>
              <label>
                <span>Sound Cloud</span>
                <TextInput
                  registerName='soundCloudId'
                  placeholder='プロフィールUrl'
                  defaultValue={soundCloud}
                />
              </label>
              <label>
                <span>アイコン画像</span>
                <div
                  className={`border rounded-md p-2 shadow-sm ${
                    errors.avatar?.[0]?.type === 'required'
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                >
                  <FileInput registerName='avatar' />
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
