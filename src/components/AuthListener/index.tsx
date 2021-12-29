import userState from '@/atoms/atoms';
import { auth } from '@/lib/supabase';
import paths from '@/paths';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const AuthListener: FC = ({ children }) => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const getUserDb = useCallback(async () => {
    const user = auth.user();
    if (user) {
      const res = await axios.get(`/api/getUserDb/${user?.id}`);
      setUser(res.data);
    }
  }, [setUser]);

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
        const res = await axios.get(`/api/getUserDb/${session?.user?.id}`);
        setUser(res.data);
      }
    });

    getUserDb();

    return () => data?.unsubscribe();
  }, [getUserDb, router, setUser]);

  return <div>{children}</div>;
};

export default AuthListener;
