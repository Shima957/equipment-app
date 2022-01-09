import DengerButton from '@/components/Button/DengerButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { VFC } from 'react';
import Modal from '../index';
import { XIcon } from '@heroicons/react/outline';

type Props = {
  modalState: boolean;
  closeModal: () => void;
  removeGear: (gearId: number | undefined) => void;
  gearId: number | undefined;
};

const RemoveUsingGear: VFC<Props> = ({
  modalState,
  closeModal,
  removeGear,
  gearId,
}) => {
  return (
    <Modal modalSate={modalState} closeModal={closeModal}>
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-bold'>本当に削除しますか？</h2>
          <button
            type='button'
            onClick={closeModal}
            className='p-1 rounded-md text-gray-500 focus:ring-sky-300 focus:outline-none focus:ring'
          >
            <XIcon className='h-6 w-6' />
          </button>
        </div>
        <div className='flex justify-center'>
          <p>
            削除したデータは元に戻すことが出来ません。
            <br /> 本当によろしいですか？
          </p>
        </div>
        <div className='flex justify-end space-x-2'>
          <SecondaryButton buttonType='button' size='min' onClick={closeModal}>
            閉じる
          </SecondaryButton>
          <DengerButton
            buttonType='submit'
            size='min'
            onClick={() => removeGear(gearId)}
          >
            削除
          </DengerButton>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveUsingGear;
