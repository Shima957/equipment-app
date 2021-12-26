import { FC } from 'react';

type Props = {
  buttonType: 'button' | 'submit';
};

const PrimaryButton: FC<Props> = ({ children, buttonType }) => {
  return (
    <button
      type={buttonType}
      className='w-96 bg-sky-500 text-white py-2 rounded-md transition-colors duration-100 font-bold hover:bg-sky-600 focus:ring focus:ring-offset-2 focus:ring-sky-600 focus:outline-none'
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
