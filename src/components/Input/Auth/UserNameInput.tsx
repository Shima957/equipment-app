import { useFormContext } from 'react-hook-form';
import { SignUpFormValue } from '@/types';
import FormErrorMessage from '@/components/Text/FormErrorMessage';

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
        {...register('name', { required: 'ユーザーネームは必須です' })}
        className={`w-96 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none sm:text-sm focus:ring-1 ${
          errors.password?.type
            ? 'border-red-500 focus:ring-red-500 '
            : 'focus:border-sky-500 focus:ring-sky-500 '
        }`}
      />
      {errors.name?.type === 'required' && (
        <FormErrorMessage>{errors.name.message}</FormErrorMessage>
      )}
    </>
  );
};

export default UserNameInput;
