import { XIcon } from '@heroicons/react/outline';
import { VFC } from 'react';
import Modal from '../../molecules/Modal/index';
import SecondaryButton from '@/components/atoms/Button/SecondaryButton';
import TextInput from '@/components/atoms/Input/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import PrimaryButton from '@/components/atoms/Button/PrimaryButton';
import FileInput from '@/components/atoms/Input/FileInput';
import { users } from '@prisma/client';
import axios from 'axios';
import FormErrorMessage from '@/components/atoms/Text/FormErrorMessage';
import type { UpdateProfielFormValue } from '@/types';
import { uploadImg } from '@/util/uploadImg';
import { getPublicUrl } from '@/util/getPublicUrl';
import { updateImg } from '@/util/updateImg';

type Props = {
  user: users | null;
  modalState: boolean;
  closeModal: () => void;
};

const UpdateProfile: VFC<Props> = ({ user, modalState, closeModal }) => {
  const displayName = user?.display_name ? user.display_name : undefined;
  const twitter = user?.twitter_id ? user?.twitter_id : undefined;
  const soundCloud = user?.soundcloud_id ? user.soundcloud_id : undefined;
  const currentImgUrl = user?.avatar_url ? user.avatar_url : undefined;

  const methods = useForm<UpdateProfielFormValue>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const updateProfile = async (
    data: UpdateProfielFormValue,
    fileName: string | undefined
  ) => {
    const sendData = {
      id: user?.id,
      name: data.name,
      imgUrl: fileName,
      twitterId: data.twitterId,
      soundCloudId: data.soundCloudId,
    };

    await axios.post('/api/update-profile', sendData);
  };

  const onSubmit = async (data: UpdateProfielFormValue) => {
    if (data.img.length === 0) {
      // 画像は更新しない場合
      updateProfile(data, currentImgUrl);
    }
    if (!currentImgUrl && data.img.length === 1) {
      // 新しく画像をアップロードする場合
      const { fileName } = await uploadImg(data, 'avatar');
      const { publicUrl } = await getPublicUrl(fileName, 'avatar');
      await updateProfile(data, publicUrl);
    }
    if (currentImgUrl && data.img.length === 1) {
      // すでに存在する画像を更新する
      await updateImg('avatar', currentImgUrl, data.img[0]);
      await updateProfile(data, currentImgUrl);
    }
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
                    errors.img?.[0]?.type === 'required'
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                >
                  <FileInput registerName='img' />
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
