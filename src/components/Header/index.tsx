import LoginUserState from '@/globalState/LoginUser';
import paths from '@/paths';
import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AccountNav from '../AccountNav';
import PrimaryButton from '../Button/PrimaryButton';
import PrimaryLink from '../Button/LinkButton/PrimaryLink';
import createGearModalState from '@/globalState/createGearModalState';
import CreateGear from '../Modal/CreateGear';

const Header = () => {
  const LoginUser = useRecoilValue(LoginUserState);
  const onOpenModal = useSetRecoilState(createGearModalState);
  const modalState = useRecoilValue(createGearModalState);

  return (
    <header className='py-4 px-4 bg-gray-800'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto'>
        <h1 className='text-white text-2xl font-bold'>
          <Link href={paths.home}>My U Gear</Link>
        </h1>
        <nav className='flex items-center space-x-2 w-32'>
          {!LoginUser ? (
            <PrimaryLink href={paths.signIn}>ログイン</PrimaryLink>
          ) : (
            <div className='flex items-center space-x-2'>
              <div className='w-36'>
                <PrimaryButton
                  buttonType='button'
                  onClick={() => onOpenModal(true)}
                  size='md'
                >
                  Gearを作成
                </PrimaryButton>
              </div>
              <AccountNav />
            </div>
          )}
        </nav>
      </div>
      {modalState && <CreateGear />}
    </header>
  );
};

export default Header;
