import { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout: FC = ({ children }) => {
  return (
    <div className=' h-screen'>
      <Header />
      <div className='h-full bg-slate-200'>
        <main className='max-w-screen-xl mx-auto pt-20 px-4 '>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
