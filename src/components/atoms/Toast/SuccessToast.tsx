import { FC, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

type Props = {
  toastState: boolean;
  closeToast: () => void;
};

const SuccessToast: FC<Props> = ({ toastState, children, closeToast }) => {
  return (
    <Transition appear show={toastState} as={Fragment}>
      <div className='fixed inset-y-24 left-2 z-10'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='flex items-center justify-between bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2 w-64 sm:w-96'>
            <div className='flex items-center'>
              <div className='text-green-500 rounded-full bg-white mr-3'>
                <svg
                  width='1.8em'
                  height='1.8em'
                  viewBox='0 0 16 16'
                  className='bi bi-check'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z'
                  />
                </svg>
              </div>
              <div className='text-white max-w-xs '>{children}</div>
            </div>
            <button
              onClick={closeToast}
              className='rounded-lg p-1 focus:ring focus:ring-sky-300 focus:outline-none   active:ring active:ring-sky-300'
            >
              <XIcon className='text-white h-4 w-4' />
            </button>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default SuccessToast;
