import { UserIcon } from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';
import DropDown from '../DropDown';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import LoginUserState from '@/globalState/LoginUser';
import { useRouter } from 'next/router';
import { auth } from '@/lib/supabase';
import paths from '@/paths';
import PrimaryButton from '../../atoms/Button/PrimaryButton';
import PrimaryLink from '../../atoms/Button/LinkButton/PrimaryLink';
import createGearModalState from '@/globalState/createGearModalState';
import addGearModalState from '@/globalState/addGearModalState';
import CreateGear from '../../organisms/CreateGear';
import AddUsingGear from '../../organisms/AddUsingGear';

const AccountNav = () => {
  const route = useRouter();
  const loginUser = useRecoilValue(LoginUserState);
  const onOpenCreateGearModal = useSetRecoilState(createGearModalState);
  const onOpenAddGearModal = useSetRecoilState(addGearModalState);
  const createModalState = useRecoilValue(createGearModalState);
  const addModalState = useRecoilValue(addGearModalState);

  const menuItems = [
    {
      title: 'マイページ',
      onClick: () => route.push(`/${loginUser?.user_id}`),
    },
    { title: '設定', onClick: () => route.push(paths.setting) },
    { title: 'ログアウト', onClick: () => auth.signOut() },
  ];

  return (
    <nav className='flex items-center space-x-2'>
      {!loginUser ? (
        <PrimaryLink href={paths.signIn} size='md'>
          ログイン
        </PrimaryLink>
      ) : null}
      {loginUser && (
        <div className='flex items-center space-x-2 transition-opacity duration-500'>
          <PrimaryButton
            buttonType='button'
            onClick={() => onOpenAddGearModal(true)}
            size='md'
          >
            Gearを追加
          </PrimaryButton>
          <PrimaryButton
            buttonType='button'
            onClick={() => onOpenCreateGearModal(true)}
            size='md'
          >
            Gearを作成
          </PrimaryButton>
          <Menu as='div' className='relative'>
            <Menu.Button className='rounded-full p-2 bg-slate-400'>
              <UserIcon className=' text-white h-6 w-6' />
            </Menu.Button>
            <div className='absolute top-11 -left-36'>
              <DropDown menuItems={menuItems} />
            </div>
          </Menu>
        </div>
      )}
      {createModalState && <CreateGear />}
      {addModalState && <AddUsingGear />}
    </nav>
  );
};

export default AccountNav;
