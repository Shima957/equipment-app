import { VFC } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  registerName: string;
};

const FileInput: VFC<Props> = ({ registerName }) => {
  const { register } = useFormContext();

  return (
    <input
      type='file'
      accept='image/*'
      {...register(registerName)}
      className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-100 file:text-sky-500
      hover:file:bg-gray-200'
    />
  );
};

export default FileInput;
