import { useFormContext } from 'react-hook-form';
import { SignUpFormValue } from '@/types';
import FormErrorMessage from '@/components/atoms/Text/FormErrorMessage';

const UserNameInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormValue>();

  return (
    <>
      <input
        type='text'
        placeholder='ユーザーネーム'
        {...register('displayName', { required: 'ユーザーネームは必須です' })}
        className={`w-96 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 ${
          errors.displayName?.type
            ? 'border-red-500 focus:ring-red-500'
            : 'focus:border-sky-500 focus:ring-sky-500'
        }`}
      />
      {errors.displayName && (
        <FormErrorMessage>{errors.displayName.message}</FormErrorMessage>
      )}
    </>
  );
};

export default UserNameInput;
