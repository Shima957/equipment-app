import { Gears, User } from '@prisma/client';
import { useState, VFC } from 'react';
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

  return (
    <div className='space-y-4'>
      <div className='border border-gray-300 rounded-md p-4 w-1/2 mx-auto bg-white shadow-sm'>
        <div className='flex flex-col items-center space-y-4'>
          <Avator user={user} />
          <span className='font-bold text-xl'>{user?.displayName}</span>
        </div>
        <div className='flex justify-end'>
          <SecondaryButton buttonType='button' size='md' onClick={openModal}>
            プロフィールを更新
          </SecondaryButton>
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
