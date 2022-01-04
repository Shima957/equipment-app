import buttonSize from '@/util/buttonSize';
import Link from 'next/link';
import { FC } from 'react';

type Props = {
  href: string;
  size?: 'min' | 'md' | 'lg';
};

const GreenBotton: FC<Props> = ({ children, href, size }) => {
  return (
    <Link href={href}>
      <a
        className={`flex justify-center py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 focus:ring-emerald-300 disabled:opacity-50 ${buttonSize(
          size
        )}`}
      >
        {children}
      </a>
    </Link>
  );
};

export default GreenBotton;
