import { VFC } from 'react';
import { RiSoundcloudFill } from 'react-icons/ri';

type Props = {
  soundCloudId: string;
};

const SoundCloudIcon: VFC<Props> = ({ soundCloudId }) => {
  return (
    <a
      href={`https://twitter.com/${soundCloudId}`}
      target='_blank'
      rel='noreferrer'
    >
      <RiSoundcloudFill className='text-[#ff7700] h-6 w-6' />
    </a>
  );
};

export default SoundCloudIcon;
