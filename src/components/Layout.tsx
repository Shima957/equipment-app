import { FC } from 'react';
import Header from './Header';

const Layout: FC = ({ children }) => {
  return (
    <div className=' bg-slate-100'>
      <Header />
      <div className='max-w-screen-xl mx-auto pt-20 h-[calc(100vh-76px-70px)]'>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
