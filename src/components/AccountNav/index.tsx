import { UserIcon } from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';
import DropDown from './DropDown';
import { useRecoilValue } from 'recoil';
import LoginUserState from '@/globalState/LoginUser';
import { useRouter } from 'next/router';
import { auth } from '@/lib/supabase';
import paths from '@/paths';

const AccountNav = () => {
  const loginUser = useRecoilValue(LoginUserState);
  const route = useRouter();

  const menuItems = [
    {
      title: loginUser?.displayName,
      onClick: () => route.push(`/${loginUser?.userId}`),
    },
    { title: '設定', onClick: () => route.push(paths.setting) },
    { title: 'ログアウト', onClick: () => auth.signOut() },
  ];

  return (
    <Menu as='div' className='relative'>
      <Menu.Button className='rounded-full p-2 bg-slate-400'>
        <UserIcon className=' text-white h-6 w-6' />
      </Menu.Button>
      <div className='absolute top-11 -right-14'>
        <DropDown menuItems={menuItems} />
      </div>
    </Menu>
  );
};

export default AccountNav;
