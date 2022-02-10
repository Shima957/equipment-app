import { VFC } from 'react';
import TextInput from '@/components/atoms/Input/TextInput';
import { translateGearLabel } from '@/util/translateGearLabel';
import { GearLabel } from '@/types';

type Props = {
  defaultValue: string | undefined;
  label: GearLabel;
};

const UpdateGearLabel: VFC<Props> = ({ defaultValue, label }) => {
  return (
    <div className='space-x-4 border-b border-gray-200 p-4'>
      <label className='w-full'>
        <span className='font-bold'>{label}</span>
        <TextInput
          registerName={translateGearLabel(label) as string}
          defaultValue={defaultValue}
        />
      </label>
    </div>
  );
};

export default UpdateGearLabel;
