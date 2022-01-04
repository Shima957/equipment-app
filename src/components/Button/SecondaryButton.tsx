import buttonSize from '@/util/buttonSize';
import { FC } from 'react';

type Props = {
  buttonType: 'button';
  size?: 'min' | 'md' | 'lg';
  onClick?: () => void;
};

const SecondaryButton: FC<Props> = ({
  children,
  buttonType,
  size,
  onClick,
}) => {
  return (
    <button
      type={buttonType}
      className={`flex justify-center items-center py-1 rounded-md border-2 font-bold transition-colors duration-200 hover:bg-gray-300 focus:ring focus:outline-none focus:ring-gray-300
      ${buttonSize(size)}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
