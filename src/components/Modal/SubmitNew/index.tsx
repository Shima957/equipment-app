import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import FileInput from '@/components/Input/FileInput';
import TextInput from '@/components/Input/TextInput';
import Select from '@/components/Select';
import SubmitNewModalState from '@/globalState/SubmitNewModalState';
import { useSetRecoilState } from 'recoil';
import Modal from '../index';

const SubmitNew = () => {
  const setModalState = useSetRecoilState(SubmitNewModalState);
  const onClose = () => setModalState(false);

  return (
    <Modal>
      <form>
        <div className='flex flex-col space-y-6'>
          <h2 className='text-xl font-bold text-gray-700 text-center'>
            Gearを作成
          </h2>
          <label>
            <span>Gearカテゴリー</span>
            <Select />
          </label>
          <label>
            <span>Gear</span>
            <TextInput />
          </label>
          <label>
            <span>メーカー</span>
            <TextInput />
          </label>
          <label className='border border-gray-300 rounded-md p-2'>
            <span>Gear画像</span>
            <FileInput />
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
    </Modal>
  );
};

export default SubmitNew;
