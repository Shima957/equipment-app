import { VFC } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  registerName: 'name' | 'maker' | 'url';
};

const Input: VFC<Props> = ({ registerName }) => {
  const { register } = useFormContext();

  return (
    <input
      {...register(registerName)}
      type='text'
      className='w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 focus:border-sky-500 focus:ring-sky-500'
    />
  );
};

export default Input;
