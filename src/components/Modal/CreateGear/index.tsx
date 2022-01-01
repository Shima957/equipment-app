import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import FileInput from '@/components/Input/FileInput';
import TextInput from '@/components/Input/TextInput';
import Select from '@/components/Select';
import createGearModalState from '@/globalState/createGearModalState';
import { useSetRecoilState } from 'recoil';
import Modal from '../index';
import GearCategory from '@/util/GearCategory';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateGearValue } from '@/types';
import { supabase } from '@/lib/supabase';
import axios from 'axios';
import FormErrorMessage from '@/components/Text/FormErrorMessage';

const CreateGear = () => {
  const setModalState = useSetRecoilState(createGearModalState);
  const onClose = () => setModalState(false);
  const methods = useForm<CreateGearValue>();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const psotGearData = async (data: CreateGearValue) => {
    if (data.img.length === 0) {
      try {
        const sendData = {
          category: data.category,
          name: data.name,
          maker: data.maker,
          webUrl: data.url,
          imgUrl: null,
        };
        await axios.post('/api/createGear', sendData);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const fileExt = data.img[0].name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error } = await supabase.storage
          .from('gears')
          .upload(fileName, data.img[0]);
        if (error) throw error;

        const sendData = {
          category: data.category,
          name: data.name,
          maker: data.maker,
          webUrl: data.url,
          imgUrl: fileName,
        };
        await axios.post('/api/createGear', sendData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onSubmit = async (data: CreateGearValue) => {
    psotGearData(data);
  };

  return (
    <Modal>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-6'>
            <h2 className='text-xl font-bold text-gray-700 text-center'>
              Gearを作成
            </h2>
            <label>
              <span>Gearカテゴリー</span>
              <Select options={GearCategory} registerName='category'></Select>
            </label>
            <label>
              <span>Gear</span>
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
                required='製品Urlは必須です'
                error={errors.url?.type === 'required'}
              />
              {errors.url?.type === 'required' && (
                <FormErrorMessage>{errors.url.message}</FormErrorMessage>
              )}
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
