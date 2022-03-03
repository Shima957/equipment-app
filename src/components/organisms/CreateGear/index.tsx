import { Button } from '@/components/atoms/Button';
import { FileInput } from '@/components/atoms/FileInput';
import { Select } from '@/components/atoms/Select';
import { createGearModalState } from '@/globalState/createGearModalState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Modal } from '../../molecules/Modal/index';
import { GearCategory } from '@/util';
import { useForm } from 'react-hook-form';
import { GearFormValue } from '@/types';
import axios from 'axios';
import { XIcon } from '@heroicons/react/outline';
import { uploadImg } from '@/util';
import { getPublicUrl } from '@/util';
import { Form } from '@/components/atoms/Form';
import { FormField } from '@/components/atoms/FormField';
import { Input } from '@/components/atoms/Input';
import { compressionImg } from '@/util';

export const CreateGear = () => {
  const setModalState = useSetRecoilState(createGearModalState);
  const onClose = () => setModalState(false);
  const modalSate = useRecoilValue(createGearModalState);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<GearFormValue>();

  const post = async (data: GearFormValue, imageUrl: string | undefined) => {
    const sendData = {
      category: data.category,
      name: data.name,
      maker: data.maker,
      webUrl: data.url ? data.url : null,
      imgUrl: imageUrl ?? null,
    };
    await axios.post('/api/create-gear', sendData);
  };

  const onSubmit = async (data: GearFormValue) => {
    if (data.img.length === 0) {
      post(data, undefined);
    } else {
      const { compressedImg } = await compressionImg(data.img[0]);
      const { fileName } = await uploadImg(compressedImg, 'gears');
      const { publicUrl } = await getPublicUrl(fileName, 'gears');
      post(data, publicUrl);
    }
    onClose();
  };

  return (
    <Modal closeModal={onClose} modalSate={modalSate}>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-700'>Gearを作成</h2>
        <button
          type='button'
          onClick={onClose}
          className='p-1 rounded-md text-gray-500 focus:ring-sky-300 focus:outline-none focus:ring'
        >
          <XIcon className='h-6 w-6' />
        </button>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col space-y-6'>
          <FormField label='Gearカテゴリー' error={errors.category}>
            <Select
              options={GearCategory}
              registeration={register('category', {
                required: 'カテゴリを選択してください',
              })}
            ></Select>
          </FormField>
          <FormField label='Gear名' required error={errors.name}>
            <Input
              type='text'
              registeration={register('name', { required: 'Gear名は必須です' })}
              error={errors.name}
            />
          </FormField>
          <FormField label='メーカー' required error={errors.maker}>
            <Input
              type='text'
              registeration={register('maker', {
                required: 'メーカーは必須です',
              })}
              error={errors.maker}
            />
          </FormField>
          <FormField label='製品Url'>
            <Input type='text' registeration={register('url')} />
          </FormField>
          <label>
            <span>Gear画像</span>
            <div
              className={`border rounded-md p-2 shadow-sm ${
                errors.img?.[0]?.type === 'required'
                  ? 'border-red-500 '
                  : 'border-gray-300'
              }`}
            >
              <FileInput registeration={register('img')} />
            </div>
          </label>
          <div className='flex justify-end space-x-2'>
            <Button
              type='button'
              size='sm'
              onClick={onClose}
              variant='secondary'
            >
              閉じる
            </Button>
            <Button
              type='submit'
              size='sm'
              isLoading={isSubmitting}
              variant='primary'
            >
              作成
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
