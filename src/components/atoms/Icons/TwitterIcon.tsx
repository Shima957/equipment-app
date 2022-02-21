import { VFC } from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';

type Props = {
  tiwtterId: string;
};

export const TwitterIcon: VFC<Props> = ({ tiwtterId }) => {
  return (
    <a
      href={`https://twitter.com/${tiwtterId}`}
      target='_blank'
      rel='noreferrer'
    >
      <AiOutlineTwitter className='text-[#00acee] h-6 w-6' />
    </a>
  );
};
