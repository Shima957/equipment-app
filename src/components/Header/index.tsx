import paths from '@/paths';
import Link from 'next/link';
import PrimaryLink from '../Button/LinkButton/PrimaryLink';

const Header = () => {
  return (
    <header className='py-4 bg-gray-800'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto'>
        <h1 className='text-white text-2xl font-bold'>
          <Link href={paths.home}>My U Gear</Link>
        </h1>
        <nav className='flex items-center space-x-2 w-32'>
          <PrimaryLink link={paths.signIn}>ログイン</PrimaryLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
