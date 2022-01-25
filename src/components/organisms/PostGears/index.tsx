import { gears } from '@prisma/client';
import { VFC } from 'react';
import { Tab } from '@headlessui/react';
import GearCategory from '@/util/GearCategory';
import axios from 'axios';
import TabList from '@/components/molecules/TabList';
import TabPanel from '@/components/molecules/TabIPanel';
import { useRecoilValue } from 'recoil';
import LoginUserState from '@/globalState/LoginUser';
import useGear from '@/hooks/useGear';
import { useSWRConfig } from 'swr';

type Props = {
  gears: (gears | null)[];
};

const PostGears: VFC<Props> = ({ gears }) => {
  const loginUser = useRecoilValue(LoginUserState);
  const { data } = useGear(loginUser?.userId);
  const { mutate } = useSWRConfig();

  const removeGear = async (gearId: number | undefined) => {
    mutate(
      '/api/get-post-gear',
      data?.filter((data) => data?.id !== gearId),
      false
    );
    await axios.delete('/api/remove-gear', { data: { gearId } });
    mutate('/api/get-post/-gear');
  };

  return (
    <>
      <Tab.Group>
        <TabList tabLists={GearCategory} />
        <div className='w-1/2 mx-auto'>
          <TabPanel
            gears={loginUser ? data : gears}
            tabPanels={GearCategory}
            removeGear={removeGear}
          />
        </div>
      </Tab.Group>
    </>
  );
};

export default PostGears;
