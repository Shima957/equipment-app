import userSession from '@/atoms/atoms';
import { auth } from '@/lib/supabase';
import paths from '@/paths';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const AuthListener: FC = ({ children }) => {
  const router = useRouter();
  const setSession = useSetRecoilState(userSession);

  useEffect(() => {
    const { data: authlistener } = auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          await axios.post('/api/setAuthCookie', { event, session });
          setSession(session);
          router.replace(paths.home);
        }
        if (event === 'SIGNED_OUT') {
          await axios.post('/api/setAuthCookie', { event, session });
          setSession(session);
        }
      }
    );

    return () => authlistener?.unsubscribe();
  }, [router, setSession]);

  return <div>{children}</div>;
};

export default AuthListener;
