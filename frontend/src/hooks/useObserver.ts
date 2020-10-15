import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getRandomPostsSaga } from "../redux/modules/post";

function useObserver() {
  const dispatch = useDispatch();
  const observerRef = useRef<IntersectionObserver>();
  const lastItemRef = useRef<HTMLDivElement>(null);
  const count = useRef<number>(1);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // getFeedPosts(userId);
              console.log(count.current);
              dispatch(getRandomPostsSaga(count.current));
              count.current += 1
              console.log('감지완료');
            }
          });
        },
        {
          threshold: 0.9,
        },
      );
    }

    lastItemRef.current && observerRef.current.observe(lastItemRef.current);
  }, []);

  return {
    observerRef,
    lastItemRef,
  };
}

export default useObserver;