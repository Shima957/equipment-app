import LoginUser from '@/globalState/LoginUser';
import paths from '@/paths';
import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AccountNav from '../AccountNav';
import PrimaryButton from '../Button/PrimaryButton';
import PrimaryLink from '../Button/LinkButton/PrimaryLink';
import SubmitNewModalState from '@/globalState/SubmitNewModalState';

const Header = () => {
  const user = useRecoilValue(LoginUser);
  const onOpenModal = useSetRecoilState(SubmitNewModalState);

  return (
    <header className='py-4 px-4 bg-gray-800'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto'>
        <h1 className='text-white text-2xl font-bold'>
          <Link href={paths.home}>My U Gear</Link>
        </h1>
        <nav className='flex items-center space-x-2 w-32'>
          {!user ? (
            <PrimaryLink href={paths.signIn}>ログイン</PrimaryLink>
          ) : (
            <div className='flex items-center space-x-2'>
              <div className='w-36'>
                <PrimaryButton
                  buttonType='button'
                  onClick={() => onOpenModal(true)}
                >
                  Gearを追加
                </PrimaryButton>
              </div>
              <AccountNav />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
