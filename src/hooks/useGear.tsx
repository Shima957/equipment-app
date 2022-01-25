import axios from 'axios';
import useSWR from 'swr';
import { useCallback } from 'react';
import { gears } from '@prisma/client';

const useGear = (userId: string | undefined) => {
  const fetcher = useCallback(
    async (url: string) => {
      const res = await axios.get(url, { params: { userId } });

      return res.data;
    },
    [userId]
  );
  const { data } = useSWR<(gears | null)[]>(
    userId ? `/api/get-post-gear` : null,
    fetcher
  );

  return { data };
};
export default useGear;
