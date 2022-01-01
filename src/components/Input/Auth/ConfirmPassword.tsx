import { useFormContext } from 'react-hook-form';
import { SignUpFormValue } from '@/types';
import FormErrorMessage from '@/components/Text/FormErrorMessage';

const ConfirmPassword = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<SignUpFormValue>();

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
        className={`w-96 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 ${
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
