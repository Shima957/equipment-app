import { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout: FC = ({ children }) => {
  return (
    <div className='bg-slate-200'>
      <Header />
      <main className='max-w-screen-xl mx-auto py-20 h-[calc(100vh-76px-76px)] px-4'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
