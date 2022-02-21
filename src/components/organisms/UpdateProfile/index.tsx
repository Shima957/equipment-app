import { XIcon } from '@heroicons/react/outline';
import { VFC } from 'react';
import { Modal } from '../../molecules/Modal/index';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { FileInput } from '@/components/atoms/FileInput';
import { users } from '@prisma/client';
import axios from 'axios';
import type { UpdateProfielFormValue } from '@/types';
import { uploadImg } from '@/util/uploadImg';
import { getPublicUrl } from '@/util/getPublicUrl';
import { updateImg } from '@/util/updateImg';
import { Form } from '@/components/atoms/Form';
import { FormField } from '@/components/atoms/FormField';
import { Input } from '@/components/atoms/Input';

type Props = {
  user: users | null;
  modalState: boolean;
  closeModal: () => void;
};

export const UpdateProfile: VFC<Props> = ({ user, modalState, closeModal }) => {
  const displayName = user?.display_name ? user.display_name : undefined;
  const twitter = user?.twitter_id ? user?.twitter_id : undefined;
  const soundCloud = user?.soundcloud_id ? user.soundcloud_id : undefined;
  const currentImgUrl = user?.avatar_url ? user.avatar_url : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfielFormValue>();

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
      const { fileName } = await uploadImg(data.img[0], 'avatar');
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-6'>
            <FormField label='ユーザーネーム' error={errors.name}>
              <Input
                type='text'
                registeration={register('name', {
                  required: 'ユーザーネームは必須です',
                })}
                defaultValue={displayName}
                error={errors.name}
              />
            </FormField>
            <FormField label='Twitter'>
              <Input
                type='text'
                registeration={register('twitterId')}
                placeholder='@は不要です'
                defaultValue={twitter}
              />
            </FormField>
            <FormField label='Sound Cloud'>
              <Input
                type='text'
                registeration={register('soundCloudId')}
                placeholder='プロフィールUrl'
                defaultValue={soundCloud}
              />
            </FormField>
            <div className='border rounded-md p-2 shadow-sm'>
              <FormField label='アイコン画像'>
                <FileInput registeration={register('img')} />
              </FormField>
            </div>
            <div className='flex justify-end space-x-2'>
              <Button
                type='button'
                size='sm'
                onClick={closeModal}
                variant='secondary'
              >
                閉じる
              </Button>
              <Button type='submit' size='sm' isLoading={isSubmitting}>
                更新
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
