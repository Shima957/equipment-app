import Modal from '@/components/Modal';
import Select from '@/components/Select';
import addGearModalState from '@/globalState/addGearModalState';
import GearCategory from '@/util/GearCategory';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import SecondaryButton from '@/components/Button/SecondaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';

const AddUsingGear = () => {
  const setModalState = useSetRecoilState(addGearModalState);
  const onClose = () => setModalState(false);
  const modalState = useRecoilValue(addGearModalState);

  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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
              <Select options={GearCategory} registerName='category'></Select>
            </label>
            <label>
              <span>Gear</span>
              <Select options={GearCategory} registerName='category'></Select>
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
