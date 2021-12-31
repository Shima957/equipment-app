import Link from 'next/link';
import { FC } from 'react';

type Props = {
  href: string;
};

const SecondaryLink: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className='flex justify-center items-center w-full py-1 rounded-md border-2 font-bold'>
        {children}
      </a>
    </Link>
  );
};

export default SecondaryLink;
