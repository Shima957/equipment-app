import { useFormContext } from 'react-hook-form';
import type { FormValue } from '@/components/SignUpForm';
import FormErrorMessage from '../Text/FormErrorMessage';

const ConfirmPassword = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<FormValue>();

  return (
    <>
      <input
        type='password'
        autoComplete='password'
        placeholder={'パスワード'}
        {...register('confirm', {
          required: '入力してください',
          validate: (value) =>
            value === getValues('password')
              ? undefined
              : 'パスワードが一致しません',
        })}
        className={`w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 ${
          errors.confirm?.type
            ? 'border-red-500 focus:ring-red-500 '
            : 'focus:border-sky-500 focus:ring-sky-500 '
        }`}
      />
      {errors.confirm?.type === 'validate' && (
        <FormErrorMessage>{errors.confirm.message}</FormErrorMessage>
      )}
      {errors.confirm?.type === 'required' && (
        <FormErrorMessage>{errors.confirm.message}</FormErrorMessage>
      )}
    </>
  );
};

export default ConfirmPassword;
