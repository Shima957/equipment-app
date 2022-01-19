import { useFormContext } from 'react-hook-form';
import FormErrorMessage from '@/components/atoms/Text/FormErrorMessage';

const NewEmailInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ newEmail: string }>();

  return (
    <>
      <input
        type='email'
        autoComplete='email'
        placeholder={'メールアドレス'}
        {...register('newEmail', {
          required: '新しいメールアドレスを入力してください',
          pattern: {
            value:
              /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'メールアドレスの形式が正しくありません',
          },
        })}
        className={`w-96 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 ${
          errors.newEmail?.type
            ? 'border-red-500 focus:ring-red-500 '
            : 'focus:border-sky-500 focus:ring-sky-500 '
        }`}
      />
      {errors.newEmail?.type === 'required' && (
        <FormErrorMessage>{errors.newEmail.message}</FormErrorMessage>
      )}
    </>
  );
};

export default NewEmailInput;
