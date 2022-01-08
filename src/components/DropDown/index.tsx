import { Menu } from '@headlessui/react';
import { VFC } from 'react';
import type { MenuItems } from '@/types';

type Props = {
  menuItems: MenuItems[];
};

const DropDown: VFC<Props> = ({ menuItems }) => {
  return (
    <Menu.Items
      as='ul'
      className='w-44 border rounded-md drop-shadow-md py-1 bg-white '
    >
      {menuItems.map((menuItem, index) => (
        <Menu.Item key={index} as='li' className='py-1'>
          {({ active }) => (
            <button
              type='button'
              onClick={menuItem.onClick}
              className={`${
                active && 'bg-sky-500 text-white'
              } w-full text-left p-1`}
            >
              {menuItem.title}
            </button>
          )}
        </Menu.Item>
      ))}
    </Menu.Items>
  );
};

export default DropDown;
