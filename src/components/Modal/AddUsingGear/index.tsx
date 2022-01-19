import Modal from '@/components/Modal';
import Select from '@/components/atoms/Select';
import addGearModalState from '@/globalState/addGearModalState';
import GearCategory from '@/util/GearCategory';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import SecondaryButton from '@/components/atoms/Button/SecondaryButton';
import PrimaryButton from '@/components/atoms/Button/PrimaryButton';
import { useState, ChangeEvent, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import FormErrorMessage from '@/components/atoms/Text/FormErrorMessage';
import LoginUserState from '@/globalState/LoginUser';
import { Gears } from '@prisma/client';
import { XIcon } from '@heroicons/react/outline';
import addActionState from '@/globalState/addGearAction';

type FormValue = { category: string; name: string };

const AddUsingGear = () => {
  const setModalState = useSetRecoilState(addGearModalState);
  const onClose = () => setModalState(false);
  const modalState = useRecoilValue(addGearModalState);
  const loginUser = useRecoilValue(LoginUserState);
  const changeAddAction = useSetRecoilState(addActionState);

  const [gears, setGears] = useState<Gears[]>();

  const methods = useForm<FormValue>();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const getGear = async (category: string) => {
    const res: AxiosResponse<Gears[]> = await axios.get(
      `/api/get-gear/${category}`
    );

    if (res.status === 200) {
      setGears(res.data);
    }
  };

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    getGear(e.target.value);
  };

  useEffect(() => {
    getGear('DAW');
  }, []);

  const onSubmit = async (data: FormValue) => {
    try {
      // 選択されたカテゴリーのGearデータを取得
      const res: AxiosResponse<Gears[]> = await axios.get(
        `/api/get-gear/${data.category}`
      );

      if (res.status === 200) {
        // 取得したデータから選択されたGearに絞り込み
        const gear = res.data.filter((gear) => gear.name === data.name);
        // データをpostに保存する
        const result = await axios.post('/api/submit-using-gear', {
          gear: gear[0],
          authorId: loginUser?.userId,
        });
        // Gearの追加が行われたことを通知
        if (result.status === 200) {
          changeAddAction(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <Modal closeModal={onClose} modalSate={modalState}>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-700'>Gearを追加</h2>
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
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
                Gearカテゴリー
              </span>
              <Select
                options={GearCategory}
                registerName='category'
                required='Gearのカテゴリーを選んでください'
                onChange={onChange}
              ></Select>
            </label>
            <label>
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
                Gear
              </span>
              <div className='relative inline-block w-full text-gray-700'>
                {/* Selectコンポーネント使うと挙動がおかしくなる。今後修正 */}
                <select
                  className='w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-md appearance-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 focus:outline-none'
                  {...register('name', {
                    required: '追加するGearを選んでください',
                  })}
                >
                  {gears?.map((gear, index) => (
                    <option key={index} value={gear.name}>
                      {gear.name}
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
              {errors.name?.type === 'required' && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
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
