import { paths } from '@/paths';
import { Link } from '@/components/atoms/RouterLink';
import { HeaderNav } from '../../molecules/HeaderNav';
import { mountedState } from '@/globalState/mounted';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginUserState } from '@/globalState/LoginUser';
import { addGearModalState } from '@/globalState/addGearModalState';
import { createGearModalState } from '@/globalState/createGearModalState';

export const Header = () => {
  const loginUser = useRecoilValue(LoginUserState);
  const onOpenAddGearModal = useSetRecoilState(addGearModalState);
  const onOpenCreateGearModal = useSetRecoilState(createGearModalState);
  const addModalState = useRecoilValue(addGearModalState);
  const createModalState = useRecoilValue(createGearModalState);
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
          <HeaderNav
            loginUser={loginUser}
            onOpenAddGearModal={onOpenAddGearModal}
            onOpenCreateGearModal={onOpenCreateGearModal}
            createModalState={createModalState}
            addModalState={addModalState}
          />
        </div>
      </div>
    </header>
  );
};
