import PrimaryButton from '@/components/atoms/Button/PrimaryButton';
import SecondaryButton from '@/components/atoms/Button/SecondaryButton';
import FileInput from '@/components/atoms/Input/FileInput';
import TextInput from '@/components/atoms/Input/TextInput';
import Select from '@/components/atoms/Select';
import createGearModalState from '@/globalState/createGearModalState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Modal from '../../molecules/Modal/index';
import GearCategory from '@/util/GearCategory';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateGearValue } from '@/types';
import { supabase } from '@/lib/supabase';
import axios from 'axios';
import FormErrorMessage from '@/components/atoms/Text/FormErrorMessage';
import { XIcon } from '@heroicons/react/outline';

const CreateGear = () => {
  const setModalState = useSetRecoilState(createGearModalState);
  const onClose = () => setModalState(false);
  const modalSate = useRecoilValue(createGearModalState);

  const methods = useForm<CreateGearValue>();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const postGear = async (
    data: CreateGearValue,
    fileName: string | undefined
  ) => {
    const sendData = {
      category: data.category,
      name: data.name,
      maker: data.maker,
      webUrl: data.url ? data.url : null,
      imgUrl: fileName,
    };
    await axios.post('/api/create-gear', sendData);
  };

  const getImageUrl = async (fileName: string) => {
    const { data } = await supabase.storage
      .from('gears')
      .getPublicUrl(fileName);

    return { imageUrl: data?.publicURL };
  };

  const uploadImage = async (fromData: CreateGearValue) => {
    if (fromData.img.length === 0) {
      return { fileName: undefined };
    } else {
      const fileExtension = fromData.img[0].name.split('.').pop();
      const fileName = `${Math.random()}.${fileExtension}`;
      await supabase.storage.from('gears').upload(fileName, fromData.img[0]);

      return { fileName: fileName };
    }
  };

  const onSubmit = async (data: CreateGearValue) => {
    const { fileName } = await uploadImage(data);
    if (fileName) {
      const { imageUrl } = await getImageUrl(fileName);
      await postGear(data, imageUrl);
    } else {
      await postGear(data, fileName);
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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-6'>
            <label>
              <span>Gearカテゴリー</span>
              <Select options={GearCategory} registerName='category'></Select>
            </label>
            <label>
              <span>Gear名</span>
              <TextInput
                registerName='name'
                required='Gear名は必須です'
                error={errors.name?.type === 'required'}
              />
              {errors.name?.type === 'required' && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </label>
            <label>
              <span>メーカー</span>
              <TextInput
                registerName='maker'
                required='メーカーは必須です'
                error={errors.maker?.type === 'required'}
              />
              {errors.maker?.type === 'required' && (
                <FormErrorMessage>{errors.maker.message}</FormErrorMessage>
              )}
            </label>
            <label>
              <span>製品Url</span>
              <TextInput
                registerName='url'
                error={errors.url?.type === 'required'}
              />
            </label>
            <label>
              <span>Gear画像</span>
              <div
                className={`border rounded-md p-2 shadow-sm ${
                  errors.img?.[0]?.type === 'required'
                    ? 'border-red-500 '
                    : 'border-gray-300'
                }`}
              >
                <FileInput registerName='img' />
              </div>
            </label>
            <div className='flex justify-end space-x-2'>
              <SecondaryButton buttonType='button' size='min' onClick={onClose}>
                閉じる
              </SecondaryButton>
              <PrimaryButton
                buttonType='submit'
                size='min'
                isLoading={isSubmitting}
              >
                作成
              </PrimaryButton>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateGear;
