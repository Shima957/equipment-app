import Image from 'next/image';
import { VFC } from 'react';
import { FiUpload } from 'react-icons/fi';

type Props = {
  gearImageUrl: string | undefined;
};

const UpdateGearImage: VFC<Props> = ({ gearImageUrl }) => {
  return (
    <div className='max-w[300px] space-y-2'>
      <div className='flex justify-start px-4 cursor-default'>
        <span>Gear画像</span>
      </div>
      <div className='flex flex-col items-center space-y-4'>
        <label className='space-y-2 flex flex-col items-center'>
          <div className='border-4 border-dashed border-gray-200 rounded-md px-8'>
            <Image
              alt='Gear画像'
              width={240}
              height={240}
              src={gearImageUrl ?? '/public/no-image.png'}
              objectFit='contain'
            />
          </div>
          <div className='w-46 flex items-center justify-center p-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-emerald-500 cursor-pointer hover:bg-emerald-600 active:bg-emerald-700'>
            <FiUpload className='w-6 h-6' />
            <span className='ml-1'>画像をアップロード</span>
          </div>
          <input type='file' className='hidden' />
        </label>
      </div>
    </div>
  );
};

export default UpdateGearImage;
