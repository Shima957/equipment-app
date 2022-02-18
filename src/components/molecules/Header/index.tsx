import paths from '@/paths';
import Link from 'next/link';
import HeaderNav from '../HeaderNav';
import mountedState from '@/globalState/mounted';
import { useRecoilValue } from 'recoil';

const Header = () => {
  const mounted = useRecoilValue(mountedState);

  return (
    <header className='px-4 bg-gray-800'>
      <div className='max-w-screen-xl h-20 flex items-center justify-between mx-auto'>
        <h1 className='text-white text-2xl font-bold'>
          <Link href={paths.home}>My U Gear</Link>
        </h1>
        <div
          className={`transition-opacity opacity-0 duration-500 ${
            mounted && 'opacity-100'
          }`}
        >
          <HeaderNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
