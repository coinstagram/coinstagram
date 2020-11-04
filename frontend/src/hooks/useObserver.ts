import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getOtherPostsSaga } from '../redux/modules/otherPost';
import { getFeedPostsSaga, getRandomPostsSaga } from '../redux/modules/post';

function useObserver(section: string, isLast: boolean, user_id?: string) {
  const dispatch = useDispatch();
  const observerRef = useRef<IntersectionObserver>();
  const lastItemRef = useRef<HTMLDivElement>(null);
  const count = useRef<number>(1);

  lastItemRef.current && isLast && observerRef.current.unobserve(lastItemRef.current);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              section === 'random' && dispatch(getRandomPostsSaga(count.current));
              section === 'feed' && dispatch(getFeedPostsSaga(count.current));
              section === 'user' && dispatch(getOtherPostsSaga(user_id, count.current));
              count.current += 1;
            }
          });
        },
        {
          threshold: 0.9,
        },
      );
    }

    lastItemRef.current && observerRef.current.observe(lastItemRef.current);
  }, [dispatch, section, user_id]);

  return {
    lastItemRef,
  };
}

export default useObserver;
