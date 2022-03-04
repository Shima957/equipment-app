import { Modal } from '@/components/molecules/Modal';
import { Select } from '@/components/atoms/Select';
import { addGearModalState } from '@/globalState/addGearModalState';
import { GearCategory } from '@/util';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from '@/components/atoms/Button';
import { useState, ChangeEvent, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { LoginUserState } from '@/globalState/LoginUser';
import { gears } from '@prisma/client';
import { XIcon } from '@heroicons/react/outline';
import { useSWRConfig } from 'swr';
import { useGear } from '@/hooks';
import { Form } from '@/components/atoms/Form';
import { FormField } from '@/components/atoms/FormField';

type FormValue = { category: string; name: string };

export const AddUsingGear = () => {
  const setModalState = useSetRecoilState(addGearModalState);
  const onClose = () => setModalState(false);
  const modalState = useRecoilValue(addGearModalState);
  const loginUser = useRecoilValue(LoginUserState);

  const { data } = useGear(loginUser?.user_id);
  const { mutate } = useSWRConfig();
  const [gears, setGears] = useState<string[]>();

  const methods = useForm<FormValue>();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const getGear = async (category: string) => {
    const res: AxiosResponse<gears[]> = await axios.get(
      `/api/get-gear/${category}`
    );

    if (res.status === 200) {
      const gear = res.data.map((gear) => gear.name);
      setGears(gear);
    }
  };

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    getGear(e.target.value);
  };

  useEffect(() => {
    getGear('DAW');
  }, []);

  const onSubmit = async (formData: FormValue) => {
    try {
      // 選択されたカテゴリーのGearデータを取得
      const res: AxiosResponse<gears[]> = await axios.get(
        `/api/get-gear/${formData.category}`
      );

      if (res.status === 200) {
        // 取得したデータから選択されたGearに絞り込み
        const gear = res.data.filter((gear) => gear.name === formData.name);
        // データをpostに保存する
        await axios.post('/api/submit-using-gear', {
          gear: gear[0],
          authorId: loginUser?.user_id,
        });
        mutate('/api/get-post-gear', [...(data as gears[]), gear[0]]);
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col space-y-6'>
          <FormField label='Gearカテゴリー' required error={errors.category}>
            <Select
              options={GearCategory}
              onChange={onChange}
              registeration={register('category', {
                required: 'カテゴリーを選択してください',
              })}
            />
          </FormField>
          <FormField label='Gear' required>
            <Select options={gears} registeration={register('name')} />
          </FormField>
          <div className='flex justify-end space-x-2'>
            <Button
              type='button'
              size='sm'
              onClick={onClose}
              variant='secondary'
            >
              閉じる
            </Button>
            <Button type='submit' size='sm' isLoading={isSubmitting}>
              追加
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
