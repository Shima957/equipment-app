import { VFC } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  registerName: string;
  required?: string;
  error?: boolean;
  defaultValue?: string | undefined;
};

const Input: VFC<Props> = ({ registerName, required, error, defaultValue }) => {
  const { register } = useFormContext();

  return (
    <input
      {...register(registerName, { required: required })}
      type='text'
      defaultValue={defaultValue}
      className={`w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 ${
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'focus:border-sky-500 focus:ring-sky-500'
      }`}
    />
  );
};

export default Input;
