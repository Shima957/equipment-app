import { ComponentProps, VFC } from 'react';
import { Button, variants } from './Button';

type ButtonProps = ComponentProps<typeof Button>;
export default { component: Button };

const renderButtons = (
  Button: VFC<ButtonProps>,
  variant: keyof typeof variants
) => {
  return (
    <dl className='space-y-2'>
      <dt className='font-bold text-lg'>Default</dt>
      <dd className='space-y-4'>
        <Button variant={variant}>ボタン</Button>
        <Button variant={variant} isLoading>
          ボタン
        </Button>
        <Button variant={variant} disabled>
          ボタン
        </Button>
      </dd>
      <dt className='font-bold text-lg'>Small</dt>
      <dd className='space-y-4'>
        <Button variant={variant} size='sm'>
          ボタン
        </Button>
        <Button variant={variant} isLoading size='sm'>
          ボタン
        </Button>
        <Button variant={variant} disabled size='sm'>
          ボタン
        </Button>
      </dd>
      <dt className='font-bold text-lg'>Medium</dt>
      <dd className='space-y-4'>
        <Button variant={variant} size='md'>
          ボタン
        </Button>
        <Button variant={variant} isLoading size='md'>
          ボタン
        </Button>
        <Button variant={variant} disabled size='md'>
          ボタン
        </Button>
      </dd>
      <dt className='font-bold text-lg'>Large</dt>
      <dd className='space-y-4'>
        <Button variant={variant} size='lg'>
          ボタン
        </Button>
        <Button variant={variant} isLoading size='lg'>
          ボタン
        </Button>
        <Button variant={variant} disabled size='lg'>
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
