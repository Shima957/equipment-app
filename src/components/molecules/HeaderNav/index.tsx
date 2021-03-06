import { UserIcon } from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';
import { DropDown } from '../../atoms/DropDown';
import { SetterOrUpdater } from 'recoil';
import { useRouter } from 'next/router';
import { auth } from '@/lib/supabase';
import { paths } from '@/paths';
import { Button } from '../../atoms/Button';
import { ButtonLink } from '@/components/atoms/ButtonLink';
import { CreateGear } from '../../organisms/CreateGear';
import { AddUsingGear } from '../../organisms/AddUsingGear';
import { VFC } from 'react';
import { users } from '@prisma/client';

type Props = {
  loginUser: users | null;
  onOpenCreateGearModal: SetterOrUpdater<boolean>;
  onOpenAddGearModal: SetterOrUpdater<boolean>;
  createModalState: boolean;
  addModalState: boolean;
};

export const HeaderNav: VFC<Props> = ({
  loginUser,
  onOpenCreateGearModal,
  onOpenAddGearModal,
  createModalState,
  addModalState,
}) => {
  const route = useRouter();

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
        <ButtonLink href={paths.signIn} variant='primary' size='md'>
          ログイン
        </ButtonLink>
      ) : null}
      {loginUser && (
        <div className='flex items-center space-x-2 transition-opacity duration-500'>
          <Button
            type='button'
            onClick={() => onOpenAddGearModal(true)}
            size='md'
          >
            Gearを追加
          </Button>
          <Button
            type='button'
            onClick={() => onOpenCreateGearModal(true)}
            size='md'
          >
            Gearを作成
          </Button>
          <Menu as='div' className='relative'>
            <Menu.Button className='rounded-full p-2 bg-slate-400'>
              <UserIcon className=' text-white h-6 w-6' />
            </Menu.Button>
            <div className='absolute top-11 -left-36 z-10'>
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
