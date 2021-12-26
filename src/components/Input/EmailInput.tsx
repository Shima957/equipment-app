import { useFormContext } from 'react-hook-form';

const EmailInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ email: string }>();

  return (
    <input
      type='email'
      autoComplete='email'
      placeholder={'メールアドレス'}
      {...register('email', {
        required: 'メールアドレスは必須です',
        pattern: {
          value:
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: 'メールアドレスの形式が正しくありません',
        },
      })}
      className={`w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 ${
        errors.email?.type
          ? 'border-red-500 focus:ring-red-500 '
          : 'focus:border-sky-500 focus:ring-sky-500 '
      }`}
    />
  );
};

export default EmailInput;
