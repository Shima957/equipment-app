import { Gears } from '@prisma/client';
import Image from 'next/image';
import { VFC } from 'react';

type Props = {
  gear: Gears | null;
};

const TabPanel: VFC<Props> = ({ gear }) => {
  return (
    <div
      className='py-4 px-8 border border-gray-300 bg-white rounded-md shadow-sm'
      key={gear?.id}
    >
      <div className='flex space-x-6'>
        <Image
          src={gear?.imgUrl ?? '/no-image.png'}
          width='240px'
          height='240px'
          alt='gearImage'
        />
        <div className='space-y-4 mt-10'>
          <div className='flex items-center space-x-2'>
            <p>製品:</p>
            <h2 className='text-xl font-bold'>{gear?.name}</h2>
          </div>
          <div className='flex items-center space-x-2'>
            <p>メーカー:</p>
            <p className='font-bold'>{gear?.maker}</p>
          </div>
          {gear?.webUrl ? (
            <a
              className='block p-2 w-24 text-center rounded-md bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer'
              href={gear?.webUrl}
            >
              製品ページ
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TabPanel;