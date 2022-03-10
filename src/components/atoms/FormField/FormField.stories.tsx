import { ComponentProps, VFC } from 'react';
import { Input } from '../Input';
import { FormField } from './FormField';

type FormFieldProps = ComponentProps<typeof FormField>;

export default { component: FormField };

const renderFormField = (FormField: VFC<FormFieldProps>) => {
  return (
    <dl className='space-y-2 w-60'>
      <dt className='font-bold text-lg'>Default</dt>
      <dd>
        <FormField label='label'>
          <Input type='text' />
        </FormField>
      </dd>
      <dt className='font-bold text-lg'>Required</dt>
      <dd>
        <FormField label='label' required>
          <Input type='text' />
        </FormField>
      </dd>
    </dl>
  );
};

export const Default = () => {
  return renderFormField(FormField);
};
