import { VFC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  type: 'text' | 'email' | 'password';
  defaultValue?: string;
  placeholder?: string;
  registeration?: Partial<UseFormRegisterReturn>;
  error?: FieldError | undefined;
};

const styles = {
  default: 'border-gray-300 focus:ring-sky-500',

  error: 'border-red-500 focus:ring-red-500',
};

export const Input: VFC<Props> = ({
  type = 'text',
  defaultValue,
  placeholder,
  registeration,
  error,
}) => {
  return (
    <input
      defaultValue={defaultValue}
      type={type}
      placeholder={placeholder}
      className={`w-full border rounded-md p-2 text-sm focus:outline-none ring-offset-2 focus:ring-2 ${
        error ? styles.error : styles.default
      }`}
      {...registeration}
    />
  );
};
