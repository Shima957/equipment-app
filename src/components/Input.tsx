import { VFC } from 'react';

type Props = {
  inputType: 'email' | 'password' | 'text';
  placeholder?: string;
};

const Input: VFC<Props> = ({ inputType, placeholder }) => {
  return (
    <input
      type={inputType}
      autoComplete={inputType}
      placeholder={placeholder}
      className='w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    />
  );
};

export default Input;
