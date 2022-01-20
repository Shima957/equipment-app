import LoginUserState from '@/globalState/LoginUser';
import { Gears, User } from '@prisma/client';
import { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import SecondaryButton from '../atoms/Button/SecondaryButton';
import UpdateProfile from '../Modal/UpdateProfile';
import Avatar from '../atoms/Avatar';
import Gear from './Gear';
import { AiOutlineTwitter } from 'react-icons/ai';
import { RiSoundcloudFill } from 'react-icons/ri';
import useModal from '@/hooks/useModal';

type Props = {
  user: User | null;
  gears: (Gears | null)[];
};

const Profile: VFC<Props> = ({ user, gears }) => {
  const { modalState, openModal, closeModal } = useModal();
  const loginUser = useRecoilValue(LoginUserState);

  return (
    <div className='space-y-4'>
      <div className='border border-gray-300 rounded-md p-4 w-1/2 mx-auto bg-white shadow-sm space-y-4'>
        <div className='flex flex-col items-center space-y-4'>
          <Avatar user={user} />
          <h2 className='font-bold text-xl'>{user?.displayName}</h2>
          <div className='flex items-center space-x-2'>
            {user?.twitterId ? (
              <a
                href={`https://twitter.com/${user?.twitterId}`}
                target='_blank'
                rel='noreferrer'
              >
                <AiOutlineTwitter className='text-[#00acee] h-6 w-6' />
              </a>
            ) : null}
            {user?.soundCloudId ? (
              <a
                href={`https://soundcloud.com/${user?.soundCloudId}`}
                target='_blank'
                rel='noreferrer'
              >
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
        modalState={modalState}
        closeModal={closeModal}
        user={user}
      />
    </div>
  );
};

export default Profile;
