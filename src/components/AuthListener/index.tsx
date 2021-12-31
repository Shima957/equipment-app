import userState from '@/globalState/LoginUser';
import { auth } from '@/lib/supabase';
import paths from '@/paths';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const AuthListener: FC = ({ children }) => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const { data } = auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        await axios.post('/api/setAuthCookie', { event, session });
        const res = await axios.get(`/api/getUserDb/${session?.user?.id}`);
        setUser(res.data);
        router.replace(paths.home);
      }
      if (event === 'SIGNED_OUT') {
        await axios.post('/api/setAuthCookie', { event, session });
        setUser(null);
      }
      if (event === 'TOKEN_REFRESHED') {
        await axios.post('/api/setAuthCookie', { event, session });
      }
    });

    return () => data?.unsubscribe();
  }, [router, setUser]);

  return <div>{children}</div>;
};

export default AuthListener;
