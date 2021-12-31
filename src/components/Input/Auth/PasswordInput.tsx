import { useFormContext } from 'react-hook-form';
import FormErrorMessage from '@/components/Text/FormErrorMessage';

const PasswordInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ password: string }>();

  return (
    <>
      <input
        type='password'
        autoComplete='password'
        placeholder={'パスワード'}
        {...register('password', {
          required: 'パスワードは必須です',
          pattern: {
            value: /[a-zA-Z0-9.?/-]/,
            message: 'パスワードの形式が正しくありません',
          },
          minLength: {
            value: 8,
            message: 'パスワードが短すぎます',
          },
          maxLength: {
            value: 24,
            message: 'パスワードが長すぎます',
          },
        })}
        className={`w-96 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 ${
          errors.password?.type
            ? 'border-red-500 focus:ring-red-500 '
            : 'focus:border-sky-500 focus:ring-sky-500 '
        }`}
      />
      {errors.password?.type === 'required' && (
        <FormErrorMessage>{errors.password.message}</FormErrorMessage>
      )}
      {errors.password?.type === 'minLength' && (
        <FormErrorMessage>{errors.password.message}</FormErrorMessage>
      )}
    </>
  );
};

export default PasswordInput;
