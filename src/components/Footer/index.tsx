import Link from 'next/link';
import paths from '@/paths';

const Footer = () => {
  return (
    <footer className='bg-white py-6'>
      <div className='max-w-screen-xl mx-auto'>
        <h2 className='font-bold text-lg'>
          <Link href={paths.home}>My U Gear</Link>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
