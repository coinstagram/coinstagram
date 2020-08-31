import React, { useRef, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import Thumbnail from './Thumbnail';
import NextBtn from '../styles/NextBtn';
import PrevBtn from '../styles/PrevBtn';

const StyledSection = styled.section`
  height: 84px;
  padding: 16px 40px 10px 33px;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 3px;
  margin-bottom: 24px;
  overflow: hidden;
  position: relative;

  .hidden-container {
    overflow: hidden;
    height: 100%;
    padding-left: 10px;
    padding-top: 2px;
  }

  ul {
    display: flex;
    transition: transform 0.4s;
    li + li {
      margin-left: 22.5px;
    }
  }
`;

interface State {
  count: number;
  slideCount: number;
}

function FollowUsers() {
  const [state, setState] = useState<State>({
    count: 0,
    slideCount: 0,
  });
  const ulRef = useRef<HTMLUListElement>(null);
  const pos = useRef<number>(0);
  const width = window.innerWidth;

  useEffect(() => {
    const { lastSlidePos, slideCount } = getSlideInfo() as slideInfo;
    setState(state => ({
      ...state,
      slideCount,
    }));

    pos.current = lastSlidePos;
  }, [width]);

  const next = useCallback(() => {
    const { slideCount, slideWidth, ul } = getSlideInfo() as slideInfo;

    setState({
      ...state,
      count: state.count + 1,
    });

    if (Math.floor(slideCount) === state.count + 1) {
      ul.style.transform = `translateX(-${pos.current}px)`;
      return;
    }
    ul.style.transform = `translateX(-${slideWidth * (state.count + 1)}px)`;
  }, [state]);

  const prev = useCallback(() => {
    if (state.count === 0) return;

    const { slideWidth, ul } = getSlideInfo() as slideInfo;
    ul.style.transform = `translateX(-${slideWidth * (state.count - 1)}px)`;

    setState({
      ...state,
      count: state.count - 1,
    });
  }, [state]);

  return (
    <StyledSection>
      <div className="hidden-container">
        {state.count !== 0 && <PrevBtn prev={prev} />}
        {state.slideCount > state.count + 1 && <NextBtn next={next} />}
        <ul ref={ulRef}>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
          <li>
            <Thumbnail size={56} />
          </li>
        </ul>
      </div>
    </StyledSection>
  );

  interface slideInfo {
    slideCount: number;
    slideWidth: number;
    lastSlidePos: number;
    ul: HTMLUListElement;
  }

  function getSlideInfo() {
    const ul = ulRef.current;

    if (ul === null) return;

    const lastLi = ul.lastElementChild;
    const firstLi = ul.firstElementChild;
    const firstLiPos = (firstLi as HTMLLIElement).getBoundingClientRect().left;
    const lastLiPos = (lastLi as HTMLLIElement).getBoundingClientRect().right;
    const slideWidth = ul.offsetWidth;
    const ulWidth = lastLiPos - firstLiPos + 10;
    const lastSlidePos = ulWidth - slideWidth;
    const slideCount = ulWidth / slideWidth;
    console.log('lastSlidePos', lastSlidePos);

    return {
      slideCount,
      slideWidth,
      lastSlidePos,
      ul,
    };
  }
}

export default FollowUsers;
