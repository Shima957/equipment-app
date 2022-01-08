import { Menu } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { Gears } from '@prisma/client';
import Image from 'next/image';
import { VFC } from 'react';

type Props = {
  gear: Gears | null;
  openModal: () => void;
};

const TabPanel: VFC<Props> = ({ gear, openModal }) => {
  const menuItems = [
    { title: 'Gearを編集', onClick: () => console.log(1) },
    { title: '削除', onClick: openModal },
  ];

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
          <div className='flex items-center'>
            {gear?.webUrl ? (
              <a
                className='block p-2 w-24 text-center rounded-md bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer'
                href={gear?.webUrl}
              >
                製品ページ
              </a>
            ) : null}
            <Menu as='div' className='relative'>
              <Menu.Button>
                <DotsVerticalIcon className='h-6 w-6' />
              </Menu.Button>
              <Menu.Items
                as='ul'
                className='absolute top-8 -right-16 w-44 border rounded-md drop-shadow-md py-1 bg-white '
              >
                {menuItems.map((item, index) => (
                  <Menu.Item as='li' className='py-1' key={index}>
                    {({ active }) => (
                      <button
                        type='button'
                        onClick={item.onClick}
                        className={`${
                          active && 'bg-sky-500 text-white'
                        } w-full text-left p-1`}
                      >
                        {item.title}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabPanel;
