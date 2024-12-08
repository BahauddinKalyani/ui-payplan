import { useMediaQuery } from '@/hooks/use-media-query';

export function useIsMobile() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return isMobile;
  }