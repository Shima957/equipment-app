import { LoginUserState } from '@/globalState/LoginUser';
import { Tab } from '@headlessui/react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ChangeEmail } from '../../molecules/ChangeEmail';
import { ChangePassowrd } from '../../molecules/ChangePassword';
import { DeleteAccount } from '../../molecules/DeleteAccount';

export const UserSetting = () => {
  const tabList = [
    { title: 'メールアドレスを変更する' },
    { title: 'パスワードを変更する' },
    { title: 'アカウントを削除する' },
  ];
  const loginUser = useRecoilValue(LoginUserState);
  const updateLoginUser = useSetRecoilState(LoginUserState);

  const tabPanel = [
    <ChangeEmail
      key='email'
      loginUser={loginUser}
      updateLoginUser={updateLoginUser}
    />,
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
