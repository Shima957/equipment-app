import { ComponentProps, VFC } from 'react';
import { Input } from './Input';

type InputProps = ComponentProps<typeof Input>;

const renderInputs = (Input: VFC<InputProps>) => {
  return (
    <dl className='space-y-2'>
      <dt>Text</dt>
      <dd className='space-y-4 w-60'>
        <Input type='text' defaultValue='text' />
      </dd>
      <dt>Email</dt>
      <dd className='space-y-4 w-60'>
        <Input type='email' defaultValue='sample@sample' />
      </dd>
      <dt>Password</dt>
      <dd className='space-y-4 w-60'>
        <Input type='password' defaultValue='sample' />
      </dd>
      <dt>Error</dt>
      <dd className='space-y-4 w-60'>
        <Input type='text' error />
      </dd>
    </dl>
  );
};

export default { component: Input };

export const Inputs = () => {
  return renderInputs(Input);
};
