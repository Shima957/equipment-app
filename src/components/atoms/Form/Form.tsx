import { FC } from 'react';

type Props = {
  onSubmit: () => void;
};

export const Form: FC<Props> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      {children}
    </form>
  );
};
