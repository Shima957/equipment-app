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

const CreateGear = () => {
  const setModalState = useSetRecoilState(createGearModalState);
  const onClose = () => setModalState(false);
  const methods = useForm<CreateGearValue>();
  const { handleSubmit } = methods;

  const onSubmit = async (data: CreateGearValue) => {
    const fileExt = data.img[0].name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    try {
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
              <TextInput registerName='name' />
            </label>
            <label>
              <span>メーカー</span>
              <TextInput registerName='maker' />
            </label>
            <label>
              <span>製品Url</span>
              <TextInput registerName='url' />
            </label>
            <label className='border border-gray-300 rounded-md p-2 shadow-sm'>
              <span>Gear画像</span>
              <FileInput registerName='img' />
            </label>
            <div className='flex justify-end space-x-2'>
              <SecondaryButton buttonType='button' size='min' onClick={onClose}>
                閉じる
              </SecondaryButton>
              <PrimaryButton buttonType='submit' size='min'>
                確定
              </PrimaryButton>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateGear;
