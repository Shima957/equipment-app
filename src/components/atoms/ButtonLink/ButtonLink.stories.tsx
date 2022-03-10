import { ComponentProps, VFC } from 'react';
import { ButtonLink, variants } from './ButtonLink';

type ButtonLinkProps = ComponentProps<typeof ButtonLink>;

export default { component: ButtonLink };

const renderButtonLink = (
  ButtonLink: VFC<ButtonLinkProps>,
  variant: keyof typeof variants
) => {
  return (
    <dl className='space-y-2'>
      <dt className='font-bold text-lg'>Default</dt>
      <dd>
        <ButtonLink href='/' variant={variant}>
          ボタンリンク
        </ButtonLink>
      </dd>
      <dt className='font-bold text-lg'>Small</dt>
      <dd>
        <ButtonLink href='/' variant={variant} size='sm'>
          ボタンリンク
        </ButtonLink>
      </dd>
      <dt className='font-bold text-lg'>Medium</dt>
      <dd>
        <ButtonLink href='/' variant={variant} size='md'>
          ボタンリンク
        </ButtonLink>
      </dd>
      <dt className='font-bold text-lg'>Large</dt>
      <dd>
        <ButtonLink href='/' variant={variant} size='lg'>
          ボタンリンク
        </ButtonLink>
      </dd>
    </dl>
  );
};

export const Primary = () => {
  return renderButtonLink(ButtonLink, 'primary');
};

export const Secondary = () => {
  return renderButtonLink(ButtonLink, 'secondary');
};

export const Green = () => {
  return renderButtonLink(ButtonLink, 'green');
};
