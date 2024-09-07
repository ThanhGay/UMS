import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@redux/hooks';

export const usePageAuth = () => {
  const { user } = useAppSelector((state) => state.authState);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [router, user]);
};
