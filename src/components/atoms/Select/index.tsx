import { ChangeEvent, VFC } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  options: string[];
  registerName: string;
  required?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const Select: VFC<Props> = ({ options, registerName, required, onChange }) => {
  const { register } = useFormContext();

  return (
    <div className='relative inline-block w-full text-gray-700'>
      <select
        className='w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-md appearance-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 focus:outline-none'
        {...register(registerName, { required: required })}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
        <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
          <path
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
            fillRule='evenodd'
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Select;
