import { VFC } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  inputType: 'email' | 'password' | 'text';
  placeholder?: string;
  rhfRegisterName: string;
  rhfRequired?: boolean;
  error?: string;
};

const Input: VFC<Props> = ({
  inputType,
  placeholder,
  rhfRegisterName,
  rhfRequired,
  error,
}) => {
  const { register } = useFormContext();

  return (
    <input
      type={inputType}
      autoComplete={inputType}
      placeholder={placeholder}
      {...register(rhfRegisterName, {
        required: rhfRequired,
      })}
      className={`w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 ${
        error
          ? 'border-red-500 focus:ring-red-500 '
          : 'focus:border-sky-500 focus:ring-sky-500 '
      }`}
    />
  );
};

export default Input;
