import { VFC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  registeration: Partial<UseFormRegisterReturn>;
};

export const FileInput: VFC<Props> = ({ registeration }) => {
  return (
    <input
      type='file'
      accept='image/*'
      {...registeration}
      className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-100 file:text-sky-500
      hover:file:bg-gray-200'
    />
  );
};
