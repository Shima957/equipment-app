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
      className={`flex justify-center items-center w-full border-2 border-sky-500 bg-sky-500 text-white py-1 rounded-md transition-colors duration-100 text-lg font-bold hover:bg-sky-600 focus:ring focus:ring-offset-2 focus:ring-sky-600 focus:outline-none ${
        isLoading && 'disabled:cursor-wait'
      }`}
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
