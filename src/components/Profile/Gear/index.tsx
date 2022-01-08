import { Gears } from '@prisma/client';
import { Fragment, useEffect, useState, VFC } from 'react';
import { Tab } from '@headlessui/react';
import GearCategory from '@/util/GearCategory';
import TabPanel from '../TabPanel';
import { supabase } from '@/lib/supabase';
import RemoveUsingGear from '@/components/Modal/RemoveUsingGear';
import axios from 'axios';

type Props = {
  gears: (Gears | null)[];
};

const Gear: VFC<Props> = ({ gears }) => {
  const [usingGears, setUsingGears] = useState<(Gears | null)[]>([]);
  const [modalSate, setModalState] = useState(false);
  const closeModal = () => setModalState(false);
  const openModal = () => setModalState(true);
  const filteredGear = (category: string) => {
    const filtered = usingGears.filter((data) => data?.category === category);

    return filtered;
  };

  const removeGear = (gearId: number | undefined) => {
    const removedGear = gears.filter((gear) => gear?.id !== gearId);
    setUsingGears(removedGear);
    axios.delete('/api/remove-gear', { data: { gearId } });
  };

  useEffect(() => {
    gears.map(async (gear) => {
      if (gear?.imgUrl) {
        const { data } = await supabase.storage
          .from('gears')
          .download(gear.imgUrl);
        const url = window.URL.createObjectURL(data as Blob);
        gear.imgUrl = url;
        setUsingGears((pre) => [...pre, gear]);
      } else {
        setUsingGears((pre) => [...pre, gear]);
      }
    });
  }, [gears]);

  return (
    <>
      <Tab.Group>
        <Tab.List className='flex p-2 space-x-2 bg-blue-900/20 rounded-xl whitespace-nowrap overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-300 '>
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
        <Tab.Panels className='w-1/2 mx-auto'>
          {GearCategory.map((category, index) => (
            <Tab.Panel className='space-y-4' key={index}>
              {filteredGear(category).length === 0 ? (
                <div className=' h-60 flex justify-center items-center'>
                  <h2 className='font-bold text-lg text-slate-600'>
                    Gearがありません
                  </h2>
                </div>
              ) : (
                filteredGear(category).map((data) => (
                  <>
                    <TabPanel
                      gear={data}
                      openModal={openModal}
                      key={data?.id}
                    />
                    <RemoveUsingGear
                      modalState={modalSate}
                      closeModal={closeModal}
                      removeGear={removeGear}
                      gearId={data?.id}
                    />
                  </>
                ))
              )}
            </Tab.Panel>
          ))}
          <Tab.Panel></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Gear;
