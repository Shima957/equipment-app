import userSession from '@/atoms/atoms';
import { supabase } from '@/lib/supabase';
import paths from '@/paths';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const AuthListener: FC = ({ children }) => {
  const router = useRouter();
  const setSession = useSetRecoilState(userSession);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setSession(session);
        router.push(paths.home);
      }
    });

    return () => data?.unsubscribe();
  }, [router]);

  return <div>{children}</div>;
};

export default AuthListener;
