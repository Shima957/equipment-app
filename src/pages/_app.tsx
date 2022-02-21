import { AuthListener } from '@/components/template/AuthListener';
import { Layout } from '@/components/template/Layout';
import '@/styles/tailwind.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthListener>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthListener>
    </RecoilRoot>
  );
}

export default MyApp;
