import LoginUserState from '@/globalState/LoginUser';
import { Gears, User } from '@prisma/client';
import { useState, VFC } from 'react';
import { useRecoilValue } from 'recoil';
import SecondaryButton from '../Button/SecondaryButton';
import UpdateProfile from '../Modal/UpdateProfile';
import Avator from './Avator';
import Gear from './Gear';

type Props = {
  user: User | null;
  gears: (Gears | null)[];
};

const Profile: VFC<Props> = ({ user, gears }) => {
  const [modalSate, setModalState] = useState(false);
  const closeModal = () => setModalState(false);
  const openModal = () => setModalState(true);
  const loginUser = useRecoilValue(LoginUserState);

  return (
    <div className='space-y-4'>
      <div className='border border-gray-300 rounded-md p-4 w-1/2 mx-auto bg-white shadow-sm space-y-4'>
        <div className='flex flex-col items-center space-y-4'>
          <Avator user={user} />
          <span className='font-bold text-xl'>{user?.displayName}</span>
        </div>
        <div className='flex justify-center md:justify-end'>
          {loginUser?.userId === user?.userId && (
            <SecondaryButton buttonType='button' size='md' onClick={openModal}>
              プロフィールを更新
            </SecondaryButton>
          )}
        </div>
      </div>
      <Gear gears={gears} />
      <UpdateProfile
        modalState={modalSate}
        closeModal={closeModal}
        user={user}
      />
    </div>
  );
};

export default Profile;
