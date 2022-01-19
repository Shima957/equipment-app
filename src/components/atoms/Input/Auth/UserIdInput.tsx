import { useFormContext } from 'react-hook-form';
import { SignUpFormValue } from '@/types';
import FormErrorMessage from '@/components/atoms/Text/FormErrorMessage';

const UserIdInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormValue>();

  return (
    <>
      <input
        type='text'
        placeholder='ユーザーID'
        {...register('userId', { required: 'ユーザーIDは必須です' })}
        className={`w-96 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 ${
          errors.userId?.type
            ? 'border-red-500 focus:ring-red-500'
            : 'focus:border-sky-500 focus:ring-sky-500'
        }`}
      />
      {errors.userId && (
        <FormErrorMessage>{errors.userId.message}</FormErrorMessage>
      )}
    </>
  );
};

export default UserIdInput;
