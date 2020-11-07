import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getOtherPostsSaga } from '../redux/modules/otherPost';
import { getFeedPostsSaga, getRandomPostsSaga, getTaggedPostsSaga } from '../redux/modules/post';

function useObserver(section: string, isLast: boolean) {
  const user_id = useLocation().pathname.split('/')[2];
  const tag = useLocation().pathname.split('/')[3];
  const dispatch = useDispatch();
  const observerRef = useRef<IntersectionObserver>();
  const lastItemRef = useRef<HTMLDivElement>(null);

  lastItemRef.current && isLast && observerRef.current.unobserve(lastItemRef.current);

  useEffect(() => {
    let count = 1;
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              section === 'random' && dispatch(getRandomPostsSaga(count));
              section === 'tag' && dispatch(getTaggedPostsSaga(tag, count));
              section === 'feed' && dispatch(getFeedPostsSaga(count));
              section === 'user' && dispatch(getOtherPostsSaga(user_id, count));
              count += 1;
            }
          });
        },
        {
          threshold: 0.9,
        },
      );
    }

    lastItemRef.current && observerRef.current.observe(lastItemRef.current);
  }, [dispatch, section, tag, user_id]);

  return {
    lastItemRef,
  };
}

export default useObserver;
