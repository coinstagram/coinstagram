import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getFeedPostsSaga, getRandomPostsSaga, resetFeedPost } from '../redux/modules/post';

function useObserver(section: string, isLast: boolean) {
  const dispatch = useDispatch();
  const observerRef = useRef<IntersectionObserver>();
  const lastItemRef = useRef<HTMLDivElement>(null);
  const count = useRef<number>(1);

  lastItemRef.current && isLast === true && observerRef.current.unobserve(lastItemRef.current);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              section === 'random' && dispatch(getRandomPostsSaga(count.current));
              section === 'feed' && dispatch(getFeedPostsSaga(count.current));
              console.log(count.current);
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
  }, [dispatch, section]);

  // useEffect(() => {
  //   count.current = 1;
  //   dispatch(resetFeedPost());
  //   dispatch(getFeedPostsSaga(1));

  //   lastItemRef.current && observerRef.current.observe(lastItemRef.current);
  // }, [dispatch, users]);

  return {
    observerRef,
    lastItemRef,
  };
}

export default useObserver;
