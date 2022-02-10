import buttonSize from '@/util/buttonSize';
import { FC } from 'react';
import Spiner from '../Loading/Spiner';

type Props = {
  buttonType: 'button' | 'submit';
  isLoading?: boolean;
  size?: 'min' | 'md' | 'lg';
  onClick?: () => void;
};

const PrimaryButton: FC<Props> = ({
  children,
  buttonType,
  isLoading,
  size,
  onClick,
}) => {
  return (
    <button
      type={buttonType}
      className={`flex justify-center py-2 rounded-md text-sm font-medium transition-color duration-200 text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-600 focus:ring focus:ring-sky-300 focus:ring-offset-2 focus:outline-none disabled:opacity-50
      ${buttonSize(size)}
      `}
      disabled={isLoading}
      onClick={onClick}
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
