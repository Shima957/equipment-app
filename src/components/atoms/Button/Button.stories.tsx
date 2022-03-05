import { ComponentProps, VFC } from 'react';
import { Button } from './Button';

type ButtonProps = ComponentProps<typeof Button>;
export default { component: Button };

const renderButtons = (
  Button: VFC<ButtonProps>,
  variants: 'primary' | 'secondary' | 'danger'
) => {
  return (
    <dl className='space-y-2'>
      <dt>Default</dt>
      <dd className='space-y-4'>
        <Button variant={variants}>ボタン</Button>
        <Button variant={variants} isLoading>
          ボタン
        </Button>
        <Button variant={variants} disabled>
          ボタン
        </Button>
      </dd>
      <dt>Small</dt>
      <dd className='space-y-4'>
        <Button variant={variants} size='sm'>
          ボタン
        </Button>
        <Button variant={variants} isLoading size='sm'>
          ボタン
        </Button>
        <Button variant={variants} disabled size='sm'>
          ボタン
        </Button>
      </dd>
      <dt>Medium</dt>
      <dd className='space-y-4'>
        <Button variant={variants} size='md'>
          ボタン
        </Button>
        <Button variant={variants} isLoading size='md'>
          ボタン
        </Button>
        <Button variant={variants} disabled size='md'>
          ボタン
        </Button>
      </dd>
      <dt>Large</dt>
      <dd className='space-y-4'>
        <Button variant={variants} size='lg'>
          ボタン
        </Button>
        <Button variant={variants} isLoading size='lg'>
          ボタン
        </Button>
        <Button variant={variants} disabled size='lg'>
          ボタン
        </Button>
      </dd>
    </dl>
  );
};

export const Primary = () => {
  return renderButtons(Button, 'primary');
};

export const Secondary = () => {
  return renderButtons(Button, 'secondary');
};

export const Danger = () => {
  return renderButtons(Button, 'danger');
};
