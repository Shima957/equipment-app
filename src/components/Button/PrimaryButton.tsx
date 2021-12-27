import { FC } from 'react';
import Spiner from '../Loading/Spiner';

type Props = {
  buttonType: 'button' | 'submit';
  isLoading?: boolean;
};

const PrimaryButton: FC<Props> = ({ children, buttonType, isLoading }) => {
  return (
    <button
      type={buttonType}
      className={`w-full flex justify-center py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:ring-sky-300 disabled:opacity-50`}
      disabled={isLoading}
    >
      {isLoading && (
        <div className='mr-2'>
          <Spiner />
        </div>
      )}
      {children}
    </button>
  );
};

export default PrimaryButton;
