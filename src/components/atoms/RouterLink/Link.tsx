import NextLink from 'next/link';
import { FC } from 'react';

type Props = {
  href: string;
};

export const Link: FC<Props> = ({ href, children }) => {
  return <NextLink href={href}>{children}</NextLink>;
};
