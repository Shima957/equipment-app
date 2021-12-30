import userState from '@/atoms/atoms';
import { useRecoilValue } from 'recoil';
import { Menu } from '@headlessui/react';
import { auth } from '@/lib/supabase';

const DropMenu = () => {
  const userData = useRecoilValue(userState);

  const menuItems = [
    {
      title: userData?.username,
      onClick: () => console.log('user'),
    },
    { title: '設定', onClick: () => console.log('sessting') },
    { title: 'ログアウト', onClick: () => auth.signOut() },
  ];

  return (
    <Menu.Items
      as='ul'
      className='absolute right-2 top-11 w-36 border rounded-md drop-shadow-md py-1 bg-white'
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

export default DropMenu;
