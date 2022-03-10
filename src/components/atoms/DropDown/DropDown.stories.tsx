import { Button } from '@/components/atoms/Button';
import { Menu } from '@headlessui/react';
import { ComponentProps, VFC } from 'react';
import { DropDown } from './DropDown';

const menuItem = [{ title: 'menu1' }, { title: 'menu2' }, { title: 'menu3' }];

type DropDownProps = ComponentProps<typeof DropDown>;

const renderDropDown = (DropDown: VFC<DropDownProps>) => {
  return (
    <Menu>
      <Menu.Button>
        <Button>DropDown</Button>
      </Menu.Button>
      <DropDown menuItems={menuItem} />
    </Menu>
  );
};

export default { component: DropDown };

export const Default = () => {
  return renderDropDown(DropDown);
};
