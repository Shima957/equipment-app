import Link from 'next/link';
import { FC } from 'react';

type Props = {
  link: string;
};

const SecondaryLink: FC<Props> = ({ children, link }) => {
  return (
    <Link href={link}>
      <a
        className={`w-full inline-flex justify-center py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 focus:ring-emerald-300 disabled:opacity-50`}
      >
        {children}
      </a>
    </Link>
  );
};

export default SecondaryLink;
