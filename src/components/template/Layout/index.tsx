import { FC } from 'react';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';

export const Layout: FC = ({ children }) => {
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
