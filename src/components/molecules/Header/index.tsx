import { paths } from '@/paths';
import { Link } from '@/components/atoms/RouterLink';
import { HeaderNav } from '../HeaderNav';
import mountedState from '@/globalState/mounted';
import { useRecoilValue } from 'recoil';

export const Header = () => {
  const mounted = useRecoilValue(mountedState);

  return (
    <header className='px-4 bg-gray-800'>
      <div className='max-w-screen-xl h-20 flex items-center justify-between mx-auto'>
        <Link href={paths.home}>
          <a className='text-white text-2xl font-bold'>My U Gear</a>
        </Link>
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
