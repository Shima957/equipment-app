import { FC } from 'react';
import Footer from '../molecules/Footer';
import Header from '../molecules/Header';

const Layout: FC = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='h-full bg-slate-200 flex-grow'>
        <main className='max-w-screen-xl mx-auto py-20 px-4'>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
