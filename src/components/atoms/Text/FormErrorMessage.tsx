import { FC } from 'react';

const FormErrorMessage: FC = ({ children }) => {
  return <p className='text-red-500 text-sm'>{children}</p>;
};

export default FormErrorMessage;
