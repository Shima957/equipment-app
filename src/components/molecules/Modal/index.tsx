import { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

type Props = {
  modalSate: boolean;
  closeModal: () => void;
};

const Modal: FC<Props> = ({ children, modalSate, closeModal }) => {
  return (
    <Transition appear show={modalSate} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-20 z-10 overflow-y-hidden'
        onClose={closeModal}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-700 transition-opacity bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
