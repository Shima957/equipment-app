import axios from 'axios';
import useSWR from 'swr';
import { useCallback } from 'react';
import { gears } from '@prisma/client';
import { useRouter } from 'next/router';

export const useGear = (userId: string | undefined) => {
  const route = useRouter();
  const fetcher = useCallback(
    async (url: string) => {
      const res = await axios.get(url, { params: { userId } });

      return res.data;
    },
    [userId]
  );
  const { data } = useSWR<(gears | null)[]>(
    userId === route.query.userId ? `/api/get-post-gear` : null,
    fetcher
  );

  return { data };
};
