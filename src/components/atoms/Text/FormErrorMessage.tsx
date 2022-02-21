import { FC } from 'react';

export const FormErrorMessage: FC = ({ children }) => {
  return <p className='text-red-500 text-sm'>{children}</p>;
};
