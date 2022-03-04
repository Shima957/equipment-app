import { FC } from 'react';
import { FieldError } from 'react-hook-form';

type Props = {
  label: string;
  required?: boolean;
  error?: FieldError | undefined;
};

export const FormField: FC<Props> = ({ label, required, error, children }) => {
  return (
    <div className='space-y-2'>
      <label className='space-y-1'>
        {required ? (
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 pb-1">
            {label}
          </span>
        ) : (
          <span>{label}</span>
        )}
        <div>{children}</div>
      </label>
      {error?.message && (
        <div
          role='alert'
          aria-label={error.message}
          className='text-sm font-medium text-red-500'
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
