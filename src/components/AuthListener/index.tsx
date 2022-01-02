import userState from '@/globalState/LoginUser';
import { auth } from '@/lib/supabase';
import paths from '@/paths';
import { User } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { FC, useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

const AuthListener: FC = ({ children }) => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const hadAuthCookie = useCallback(async () => {
    const res: AxiosResponse<User | null> = await axios.get(
      '/api/get-auth-cookie'
    );
    if (res.data) {
      const loginUser = await axios.get(`/api/get-login-user/${res.data?.id}`);
      setUser(loginUser.data);
    }
  }, [setUser]);

  useEffect(() => {
    hadAuthCookie();
    const { data } = auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        await axios.post('/api/set-auth-cookie', { event, session });
        const res: AxiosResponse<User | null> = await axios.get(
          `/api/get-login-user/${session?.user?.id}`
        );
        setUser(res.data);
        router.replace(paths.home);
      }
      if (event === 'SIGNED_OUT') {
        await axios.post('/api/set-auth-cookie', { event, session });
        setUser(null);
      }
      if (event === 'TOKEN_REFRESHED') {
        await axios.post('/api/set-auth-cookie', { event, session });
      }
    });

    return () => data?.unsubscribe();
  }, [hadAuthCookie, router, setUser]);

  return <div>{children}</div>;
};

export default AuthListener;
