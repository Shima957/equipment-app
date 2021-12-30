import { UserIcon } from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';
import DropMenu from './DropMenu';

const AccountNav = () => {
  return (
    <Menu as='div' className='absolute'>
      <Menu.Button className='rounded-full bg-sky-500 p-2'>
        <UserIcon className=' text-white h-6 w-6' />
      </Menu.Button>
      <DropMenu />
    </Menu>
  );
};

export default AccountNav;
