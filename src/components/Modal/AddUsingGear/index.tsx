import Modal from '@/components/Modal';
import Select from '@/components/Select';
import addGearModalState from '@/globalState/addGearModalState';
import GearCategory from '@/util/GearCategory';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import SecondaryButton from '@/components/Button/SecondaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useState, ChangeEvent, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const AddUsingGear = () => {
  const setModalState = useSetRecoilState(addGearModalState);
  const onClose = () => setModalState(false);
  const modalState = useRecoilValue(addGearModalState);

  const [gears, setGears] = useState<string[]>([]);

  const methods = useForm<{ category: string; gear: string }>();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const getGear = async (value: string) => {
    const res: AxiosResponse<{ name: string }[]> = await axios.get(
      `/api/get-gear/${value}`
    );

    if (res.status === 200) {
      const gear = res.data.map((data) => {
        return data.name;
      });

      setGears(gear);
    }
  };

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    getGear(e.target.value);
  };

  useEffect(() => {
    getGear('DAW');
  }, []);

  const onSubmit = () => {
    onClose();
  };

  return (
    <Modal closeModal={onClose} modalSate={modalState}>
      <h2 className='text-xl font-bold text-gray-700 text-center'>
        Gearを追加
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-6'>
            <label>
              <span>Gearカテゴリー</span>
              <Select
                options={GearCategory}
                registerName='category'
                onChange={onChange}
              ></Select>
            </label>
            <label>
              <span>Gear</span>
              <div className='relative inline-block w-full text-gray-700'>
                <select
                  className='w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-md appearance-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 focus:outline-none'
                  {...register('gear')}
                  onChange={onChange}
                >
                  {gears.map((gear, index) => (
                    <option key={index} value={gear}>
                      {gear}
                    </option>
                  ))}
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                  <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                    <path
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                      fillRule='evenodd'
                    ></path>
                  </svg>
                </div>
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

export default AddUsingGear;
