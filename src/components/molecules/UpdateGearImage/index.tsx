import FileInput from '@/components/atoms/Input/FileInput';
import Image from 'next/image';
import { VFC } from 'react';

type Props = {
  gearImageUrl: string | undefined;
};

const UpdateGearImage: VFC<Props> = ({ gearImageUrl }) => {
  return (
    <div className='flex flex-col'>
      <Image
        alt='Gear画像'
        width={240}
        height={240}
        src={gearImageUrl ?? '/public/no-image.png'}
        objectFit='contain'
      />
      <label className='px-4 border border-gray-200 rounded-md p-4'>
        <span>Gear画像</span>
        <FileInput registerName='img' />
      </label>
    </div>
  );
};

export default UpdateGearImage;
