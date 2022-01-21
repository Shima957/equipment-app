import { Tab } from '@headlessui/react';
import { VFC, Fragment } from 'react';

type Props = {
  tabLists: string[];
};

const TabList: VFC<Props> = ({ tabLists }) => {
  return (
    <Tab.List className='flex p-2 space-x-2 bg-blue-900/20 rounded-xl whitespace-nowrap overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-300'>
      {tabLists.map((tabList, index) => (
        <Tab as={Fragment} key={index}>
          {({ selected }) => (
            <button
              className={`w-96 p-2 text-sm font-medium text-blue-700 rounded-lg hover:bg-white focus:ring-2 focus:ring-sky-500 ${
                selected && 'bg-white'
              }`}
            >
              {tabList}
            </button>
          )}
        </Tab>
      ))}
    </Tab.List>
  );
};

export default TabList;
