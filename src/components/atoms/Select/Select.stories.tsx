import { Select } from './Select';
import { ComponentProps, VFC } from 'react';

type SelectProps = ComponentProps<typeof Select>;
const options = ['option1', 'option2', 'option3'];

const renderSelect = (Select: VFC<SelectProps>) => {
  return (
    <dl className='space-y-2'>
      <dt className='font-bold text-lg'>Default</dt>
      <dd>
        <Select options={options} />
      </dd>
    </dl>
  );
};

export default { component: Select };

export const Default = () => {
  return renderSelect(Select);
};
