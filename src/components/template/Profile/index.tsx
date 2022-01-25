import LoginUserState from '@/globalState/LoginUser';
import { gears, users } from '@prisma/client';
import { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import SecondaryButton from '../../atoms/Button/SecondaryButton';
import UpdateProfile from '../../organisms/UpdateProfile';
import Avatar from '../../atoms/Avatar';
import PostGears from '../../organisms/PostGears';
import useModal from '@/hooks/useModal';
import TwitterIcon from '@/components/atoms/Icons/TwitterIcon';
import SoundCloudIcon from '@/components/atoms/Icons/SoundCloudIcon';

type Props = {
  user: users | null;
  gears: (gears | null)[];
};

const Profile: VFC<Props> = ({ user, gears }) => {
  const { modalState, openModal, closeModal } = useModal();
  const loginUser = useRecoilValue(LoginUserState);

  return (
    <div className='space-y-4'>
      <div className='border border-gray-300 rounded-md p-4 w-1/2 mx-auto bg-white shadow-sm space-y-4'>
        <div className='flex flex-col items-center space-y-4'>
          <Avatar user={user} />
          <h2 className='font-bold text-xl'>{user?.display_name}</h2>
          <div className='flex items-center space-x-2'>
            {user?.twitter_id ? (
              <TwitterIcon tiwtterId={user?.twitter_id} />
            ) : null}
            {user?.soundcloud_id ? (
              <SoundCloudIcon soundCloudId={user.soundcloud_id} />
            ) : null}
          </div>
        </div>
        <div className='flex justify-center md:justify-end'>
          {loginUser?.userId === user?.user_id && (
            <SecondaryButton buttonType='button' size='md' onClick={openModal}>
              プロフィールを更新
            </SecondaryButton>
          )}
        </div>
      </div>
      <PostGears gears={gears} />
      <UpdateProfile
        modalState={modalState}
        closeModal={closeModal}
        user={user}
      />
    </div>
  );
};

export default Profile;
