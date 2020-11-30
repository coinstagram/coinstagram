import React, { useRef, useCallback, useState } from 'react';
import styled from 'styled-components';

// components
import Thumbnail from './Thumbnail';
import NextBtn from './common/NextBtn';
import PrevBtn from './common/PrevBtn';

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
    transition: transform 0.3s;
    li + li {
      margin-left: 22.5px;
    }
  }
`;

interface State {
  count: number;
  divPos: number;
  lastLiPos: number;
}

function FollowUsers() {
  const [state, setState] = useState<State>({
    count: 0,
    divPos: 0,
    lastLiPos: 0,
  });
  const divRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const next = useCallback(() => {
    const { divPos, lastLiPos, slideWidth } = getSlideInfo() as Position;
    const ul = ulRef.current;
    if (ul === null) return;

    ul.style.transform = `translateX(-${slideWidth * (state.count + 1)}px)`;

    setState({
      count: state.count + 1,
      divPos,
      lastLiPos: lastLiPos - slideWidth,
    });
  }, [state]);

  const prev = useCallback(() => {
    if (state.count === 0) return;
    const ul = ulRef.current;
    if (ul === null) return;

    const { slideWidth } = getSlideInfo() as Position;
    ul.style.transform = `translateX(-${slideWidth * (state.count - 1)}px)`;

    setState({
      ...state,
      count: state.count - 1,
    });
  }, [state]);

  return (
    <StyledSection>
      <div className="hidden-container" ref={divRef}>
        {state.count !== 0 && <PrevBtn prev={prev} />}
        {!(state.lastLiPos < state.divPos) && <NextBtn next={next} />}
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
        </ul>
      </div>
    </StyledSection>
  );

  interface Position {
    divPos: number;
    lastLiPos: number;
    slideWidth: number;
  }

  function getSlideInfo() {
    const div = divRef.current;
    const ul = ulRef.current;

    if (ul === null || div === null) return;

    const li = ul.lastElementChild;
    const divPos = div.getBoundingClientRect().right;
    const lastLiPos = (li as HTMLLIElement).getBoundingClientRect().right;
    const slideWidth = (li as HTMLLIElement).offsetWidth * 5;

    return {
      divPos,
      lastLiPos,
      slideWidth,
    };
  }
}

export default FollowUsers;
