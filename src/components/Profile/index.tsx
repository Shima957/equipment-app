import LoginUserState from '@/globalState/LoginUser';
import { Gears, User } from '@prisma/client';
import { useState, VFC } from 'react';
import { useRecoilValue } from 'recoil';
import SecondaryButton from '../Button/SecondaryButton';
import UpdateProfile from '../Modal/UpdateProfile';
import Avator from './Avator';
import Gear from './Gear';
import { AiOutlineTwitter } from 'react-icons/ai';
import { RiSoundcloudFill } from 'react-icons/ri';

type Props = {
  user: User | null;
  gears: (Gears | null)[];
};

const Profile: VFC<Props> = ({ user, gears }) => {
  const [modalSate, setModalState] = useState(false);
  const closeModal = () => setModalState(false);
  const openModal = () => setModalState(true);
  const loginUser = useRecoilValue(LoginUserState);
  console.log(user);

  return (
    <div className='space-y-4'>
      <div className='border border-gray-300 rounded-md p-4 w-1/2 mx-auto bg-white shadow-sm space-y-4'>
        <div className='flex flex-col items-center space-y-4'>
          <Avator user={user} />
          <h2 className='font-bold text-xl'>{user?.displayName}</h2>
          <div className='flex items-center space-x-2'>
            {user?.twitterId ? (
              <a href={`https://twitter.com/${user?.twitterId}`}>
                <AiOutlineTwitter className='text-[#00acee] h-6 w-6' />
              </a>
            ) : null}
            {user?.soundCloudId ? (
              <a href={`https://soundcloud.com/${user?.soundCloudId}`}>
                <RiSoundcloudFill className='h-6 w-6 text-[#ff7700]' />
              </a>
            ) : null}
          </div>
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
