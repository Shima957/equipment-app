import { Tab } from '@headlessui/react';
import ChangeEmail from './ChangeEmail';
import ChangePassowrd from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const SettingLyout = () => {
  const tabList = [
    { title: 'メールアドレスを変更する' },
    { title: 'パスワードを変更する' },
    { title: 'アカウントを削除する' },
  ];

  const tabPanel = [
    <ChangeEmail key='email' />,
    <ChangePassowrd key='password' />,
    <DeleteAccount key='delete' />,
  ];

  return (
    <Tab.Group>
      <Tab.List className='flex p-2 space-x-4'>
        {tabList.map((tab, index) => (
          <Tab className='' key={index}>
            {({ selected }) => (
              <button
                className={`font-bold text-lg text-gray-600 ${
                  selected && 'text-black border-b-2 border-sky-500'
                }`}
              >
                {tab.title}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className='mt-6'>
        {tabPanel.map((tab, index) => (
          <Tab.Panel key={index}>{tab}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default SettingLyout;
