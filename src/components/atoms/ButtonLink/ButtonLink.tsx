import { Link } from '@/components/atoms/RouterLink';
import { FC } from 'react';

export const variants = {
  primary: 'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-300',
  secondary: 'border border-gray-300 text-gray-600 focus:ring-gray-300',
  green:
    'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-300',
};

const sizes = {
  sm: 'w-24',
  md: 'w-36',
  lg: 'w-96',
  full: 'w-full',
};

type Props = {
  href: string;
  variant: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const ButtonLink: FC<Props> = ({
  href,
  children,
  variant = 'primary',
  size = 'full',
}) => {
  return (
    <Link href={href}>
      <a
        className={`flex justify-center items-center h-10 px-2 space-x-2 rounded-md font-bold disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring focus:ring-offset-2
        ${variants[variant]} ${sizes[size]}
        `}
      >
        {children}
      </a>
    </Link>
  );
};
