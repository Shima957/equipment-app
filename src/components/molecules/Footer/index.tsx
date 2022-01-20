import Link from 'next/link';
import paths from '@/paths';

const Footer = () => {
  return (
    <footer className='bg-white py-6 px-4 '>
      <div className='max-w-screen-xl mx-auto flex items-center justify-between'>
        <Link href={paths.home}>
          <a className='text-xl font-bold'>My U Gear</a>
        </Link>
        <Link href={paths.contact}>
          <a className='text-sm underline'>お問い合わせ</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
