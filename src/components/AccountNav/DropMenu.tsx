import loginUserSate from '@/globalState/LoginUser';
import { useRecoilValue } from 'recoil';
import { Menu } from '@headlessui/react';
import { auth } from '@/lib/supabase';
import { useRouter } from 'next/router';

const DropMenu = () => {
  const loginUser = useRecoilValue(loginUserSate);
  const route = useRouter();

  const menuItems = [
    {
      title: loginUser?.displayName ?? loginUser?.userId,
      onClick: () => route.push(`/${loginUser?.userId}`),
    },
    { title: '設定', onClick: () => console.log('sessting') },
    { title: 'ログアウト', onClick: () => auth.signOut() },
  ];

  return (
    <Menu.Items
      as='ul'
      className='absolute top-11 right-3 w-44 border rounded-md drop-shadow-md py-1 bg-white '
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
