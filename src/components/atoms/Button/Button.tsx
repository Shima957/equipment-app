import { ButtonHTMLAttributes, FC } from 'react';
import { Spiner } from '@/components/atoms/Loading';

export const variants = {
  primary: 'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-300',
  secondary: 'border border-gray-300 text-gray-600 focus:ring-gray-300',
  danger:
    'bg-red-500 hover:bg-red-600 active:bg-red-600 focus:ring-red-300 text-white',
};

const sizes = {
  sm: 'w-24',
  md: 'w-36',
  lg: 'w-96',
  full: 'w-full',
};

type Props = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  isLoading?: boolean;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
  size = 'full',
  variant = 'primary',
  type = 'button',
  isLoading = false,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex justify-center items-center h-10 px-2 space-x-2 rounded-md font-bold disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring focus:ring-offset-2
      ${variants[variant]} ${sizes[size]}`}
    >
      {isLoading && <Spiner />}
      <span>{children}</span>
    </button>
  );
};
