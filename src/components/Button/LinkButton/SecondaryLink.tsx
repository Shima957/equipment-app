import buttonSize from '@/util/buttonSize';
import Link from 'next/link';
import { FC } from 'react';

type Props = {
  href: string;
  size?: 'min' | 'md' | 'lg';
};

const SecondaryLink: FC<Props> = ({ children, href, size }) => {
  return (
    <Link href={href}>
      <a
        className={`flex justify-center items-center w-full py-1 rounded-md border-2 font-bold ${buttonSize(
          size
        )}`}
      >
        {children}
      </a>
    </Link>
  );
};

export default SecondaryLink;
