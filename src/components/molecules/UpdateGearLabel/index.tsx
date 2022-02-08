import SecondaryButton from '@/components/atoms/Button/SecondaryButton';
import { useState, VFC } from 'react';
import TextInput from '@/components/atoms/Input/TextInput';
import { translateGearLabel } from '@/util/translateGearLabel';
import { GearLabel } from '@/types';

type Props = {
  gearInfo: string | undefined;
  label: GearLabel;
};

const UpdateGearLabel: VFC<Props> = ({ gearInfo, label }) => {
  const [inputShow, setInputShow] = useState(false);

  return (
    <div className='w-[325px] flex items-end justify-between space-x-4 border-b border-gray-200 p-4'>
      <label>
        <span>{label}</span>
        <div>
          {inputShow ? (
            <TextInput
              registerName={translateGearLabel(label) as string}
              defaultValue={gearInfo}
            />
          ) : (
            <p className='p-2 w-[181px] overflow-hidden text-ellipsis whitespace-nowrap'>
              {gearInfo}
            </p>
          )}
        </div>
      </label>
      {inputShow ? (
        <SecondaryButton
          buttonType='button'
          size='min'
          onClick={() => setInputShow(false)}
        >
          キャンセル
        </SecondaryButton>
      ) : (
        <SecondaryButton
          buttonType='button'
          size='min'
          onClick={() => setInputShow(true)}
        >
          編集
        </SecondaryButton>
      )}
    </div>
  );
};

export default UpdateGearLabel;
