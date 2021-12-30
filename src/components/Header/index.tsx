import userState from '@/atoms/atoms';
import paths from '@/paths';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import AccountNav from '../AccountNav';
import PrimaryLink from '../Button/LinkButton/PrimaryLink';

const Header = () => {
  const user = useRecoilValue(userState);

  return (
    <header className='py-4 px-4 bg-gray-800 relative'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto'>
        <h1 className='text-white text-2xl font-bold'>
          <Link href={paths.home}>My U Gear</Link>
        </h1>
        <nav className='flex items-center space-x-2 w-32'>
          {!user ? (
            <PrimaryLink link={paths.signIn}>ログイン</PrimaryLink>
          ) : (
            <AccountNav />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
