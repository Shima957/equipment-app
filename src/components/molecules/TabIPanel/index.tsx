import { Tab } from '@headlessui/react';
import { Gears } from '@prisma/client';
import { VFC } from 'react';
import GearCard from '@/components/molecules/GearCard';

type Props = {
  tabPanels: string[];
  gears: (Gears | null)[] | undefined;
  removeGear: (gearId: number | undefined) => void;
};

const TabPanel: VFC<Props> = ({ tabPanels, gears, removeGear }) => {
  const filteredPanel = (tabPanel: string) => {
    return gears
      ?.filter((gear) => gear?.category === tabPanel)
      .map((data) => (
        <GearCard gear={data} key={data?.id} removeGear={removeGear} />
      ));
  };

  return (
    <Tab.Panels>
      {tabPanels.map((tabPanel, index) => (
        <Tab.Panel key={index} className='space-y-4'>
          {filteredPanel(tabPanel)?.length === 0 ? (
            <div className=' h-60 flex justify-center items-center'>
              <h2 className='font-bold text-lg text-slate-600'>
                Gearがありません
              </h2>
            </div>
          ) : (
            filteredPanel(tabPanel)
          )}
        </Tab.Panel>
      ))}
    </Tab.Panels>
  );
};

export default TabPanel;