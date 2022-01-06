import { Gears } from '@prisma/client';
import { Fragment, useEffect, useState, VFC } from 'react';
import { Tab } from '@headlessui/react';
import GearCategory from '@/util/GearCategory';
import TabPanel from '../TabPanel';
import { supabase } from '@/lib/supabase';

type Props = {
  gears: (Gears | null)[];
};

const Gear: VFC<Props> = ({ gears }) => {
  const [newGears, setNewGears] = useState<(Gears | null)[]>([]);
  const filterGear = (category: string) => {
    const filtered = newGears.filter((data) => data?.category === category);

    return filtered;
  };

  useEffect(() => {
    gears.map(async (gear) => {
      if (gear?.imgUrl) {
        const { data } = await supabase.storage
          .from('gears')
          .download(gear.imgUrl);
        const url = URL.createObjectURL(data as Blob);
        gear.imgUrl = url;
        setNewGears((pre) => [...pre, gear]);
      } else {
        setNewGears((pre) => [...pre, gear]);
      }
    });
  }, [gears]);

  return (
    <Tab.Group>
      <Tab.List className='flex p-2 space-x-2 bg-blue-900/20 rounded-xl whitespace-nowrap overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-300'>
        {GearCategory.map((category, index) => (
          <Tab as={Fragment} key={index}>
            {({ selected }) => (
              <button
                className={`w-96 p-2 text-sm font-medium text-blue-700 rounded-lg hover:bg-white focus:ring-2 focus:ring-sky-500 ${
                  selected && 'bg-white'
                }`}
              >
                {category}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {GearCategory.map((category, index) => (
          <Tab.Panel className='space-y-4' key={index}>
            {filterGear(category).map((data) => (
              <TabPanel gear={data} key={data?.id} />
            ))}
          </Tab.Panel>
        ))}
        <Tab.Panel></Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gear;
