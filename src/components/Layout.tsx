import { FC } from 'react';
import Header from './Header';

const Layout: FC = ({ children }) => {
  return (
    <div className=' bg-slate-100'>
      <Header />
      <main className='max-w-screen-xl mx-auto py-20 h-[calc(100vh-76px-70px)]'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
