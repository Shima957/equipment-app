import LoginUserState from '@/globalState/LoginUser';
import { gears, users } from '@prisma/client';
import { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { Button } from '@/components/atoms/Button';
import { UpdateProfile } from '@/components/organisms/UpdateProfile';
import { Avatar } from '@/components/atoms/Avatar';
import { PostGears } from '@/components/organisms/PostGears';
import { useModal } from '@/hooks';
import { TwitterIcon, SoundCloudIcon } from '@/components/atoms/Icons';

type Props = {
  user: users | null;
  gears: (gears | null)[];
};

export const Profile: VFC<Props> = ({ user, gears }) => {
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
          {loginUser?.user_id === user?.user_id && (
            <Button
              type='button'
              size='md'
              onClick={openModal}
              variant='secondary'
            >
              プロフィールを更新
            </Button>
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
