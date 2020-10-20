import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedPostsSaga, getRandomPostsSaga, resetFeedPost } from '../redux/modules/post';
import RootState from '../type';

function useObserver(section: string) {
  const { randomPosts, feedPosts } = useSelector((state: RootState) => state.posts);
  const { users } = useSelector((state: RootState) => state.userInfo.followers);
  const dispatch = useDispatch();
  const observerRef = useRef<IntersectionObserver>();
  const lastItemRef = useRef<HTMLDivElement>(null);
  const count = useRef<number>(1);

  if (randomPosts.randomPosts.length <= 15 && randomPosts.randomPosts.length > 0) count.current = 2;
  if (feedPosts.feedPosts.length <= 6 && feedPosts.feedPosts.length > 0) count.current = 2;
  lastItemRef.current && randomPosts.isLast === true && observerRef.current.unobserve(lastItemRef.current);
  lastItemRef.current && feedPosts.isLast === true && observerRef.current.unobserve(lastItemRef.current);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              section === 'random' && dispatch(getRandomPostsSaga(count.current));
              section === 'feed' && dispatch(getFeedPostsSaga(count.current));
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

  useEffect(() => {
    count.current = 1;
    dispatch(resetFeedPost());
    dispatch(getFeedPostsSaga(1));

    lastItemRef.current && observerRef.current.observe(lastItemRef.current);
  }, [dispatch, users]);

  return {
    observerRef,
    lastItemRef,
  };
}

export default useObserver;
