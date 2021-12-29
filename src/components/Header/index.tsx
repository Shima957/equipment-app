import userSession from '@/atoms/atoms';
import { supabase } from '@/lib/supabase';
import paths from '@/paths';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import PrimaryLink from '../Button/LinkButton/PrimaryLink';
import PrimaryButton from '../Button/PrimaryButton';

const Header = () => {
  const session = useRecoilValue(userSession);

  const signOut = () => supabase.auth.signOut();

  return (
    <header className='py-4 px-4 bg-gray-800'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto'>
        <h1 className='text-white text-2xl font-bold'>
          <Link href={paths.home}>My U Gear</Link>
        </h1>
        <nav className='flex items-center space-x-2 w-32'>
          {!session ? (
            <PrimaryLink link={paths.signIn}>ログイン</PrimaryLink>
          ) : (
            <PrimaryButton buttonType='button' onClick={signOut}>
              ログアウト
            </PrimaryButton>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
