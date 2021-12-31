import Link from 'next/link';
import { FC } from 'react';

type Props = {
  href: string;
};

const PrimaryLink: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a
        className={`w-full inline-flex justify-center py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:ring-sky-300 disabled:opacity-50`}
      >
        {children}
      </a>
    </Link>
  );
};

export default PrimaryLink;
