import PrimaryButton from '@/components/atoms/Button/PrimaryButton';
import UpdateGearImage from '@/components/molecules/UpdateGearImage';
import UpdateGearLabel from '@/components/molecules/UpdateGearLabel';
import { GearFormValue } from '@/types';
import { gears } from '@prisma/client';
import { VFC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  gearData: gears | null;
};

const UpdateGear: VFC<Props> = ({ gearData }) => {
  const methods = useForm<GearFormValue>();

  return (
    <div className='bg-white p-2 py-12 rounded-md drop-shadow-md'>
      <div className='flex flex-col items-center space-y-6'>
        <h1 className='font-bold text-2xl'>Gearを編集</h1>
        <FormProvider {...methods}>
          <form className='space-y-8'>
            <div className='space-y-4'>
              <UpdateGearLabel gearInfo={gearData?.name} label='製品' />
              <UpdateGearLabel gearInfo={gearData?.maker} label='メーカー' />
              <UpdateGearLabel
                gearInfo={gearData?.webUrl ?? undefined}
                label='製品Url'
              />
              <div>
                <UpdateGearImage gearImageUrl={gearData?.imgUrl ?? undefined} />
              </div>
            </div>

            <PrimaryButton buttonType='submit'>確定</PrimaryButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UpdateGear;
