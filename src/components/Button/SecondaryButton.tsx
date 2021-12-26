import { FC } from 'react';

type Props = {
  buttonType: 'button';
};

const SecondaryButton: FC<Props> = ({ children, buttonType }) => {
  return (
    <button
      type={buttonType}
      className='flex justify-center items-center w-full py-1 rounded-md border-2 font-bold'
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
