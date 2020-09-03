import React, { useRef, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { loading } from '../../styles/ThumbnailBorderStyle';
import borderStyle from '../../styles/ThumbnailBorderStyle';

// components
import Thumbnail from '../Thumbnail';
import NextBtn from '../../styles/NextBtn';
import PrevBtn from '../../styles/PrevBtn';

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
    transition: transform 0.6s ease-out;
    li + li {
      margin-left: 22.5px;
    }
  }
`;

const StyledButton = styled.button`
  div {
    position: relative;
    text-align: center;
    outline: none;
  }
  dd {
    position: absolute;
    top: 10px;
    left: -10px;
    width: 76px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${borderStyle(4)}
`;

interface State {
  count: number;
  slideCount: number;
}

interface slideInfo {
  slideCount: number;
  slideWidth: number;
  lastSlidePos: number;
  ul: HTMLUListElement;
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
    const { lastSlidePos, slideCount, ul } = getSlideInfo() as slideInfo;
    setState(st => ({
      ...st,
      slideCount,
    }));

    pos.current = lastSlidePos;

    if (Math.floor(slideCount) === state.count) {
      ul.style.transform = `translateX(-${pos.current}px)`;
    }
  }, [state.count, width]);

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
    const { slideWidth, ul } = getSlideInfo() as slideInfo;
    ul.style.transform = `translateX(-${slideWidth * (state.count - 1)}px)`;

    setState({
      ...state,
      count: state.count - 1,
    });
  }, [state]);

  return (
    <StyledSection>
      <h2 className="a11y-hidden">팔로우한 계정</h2>
      <div className="hidden-container">
        {state.count !== 0 && <PrevBtn onClick={prev} />}
        {state.slideCount > state.count + 1 && <NextBtn onClick={next} />}
        <ul ref={ulRef}>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={loading}>
              <Thumbnail size={56} />
              <div tabIndex={-1}>
                <dt className="a11y-hidden">유저 ID</dt>
                <dd>user id1</dd>
              </div>
            </StyledButton>
          </li>
        </ul>
      </div>
    </StyledSection>
  );

  function getSlideInfo() {
    const ul = ulRef.current;

    if (ul === null) return;

    const lastLi = ul.lastElementChild;
    const firstLi = ul.firstElementChild;
    const firstLiPos = (firstLi as HTMLLIElement).getBoundingClientRect().left;
    const lastLiPos = (lastLi as HTMLLIElement).getBoundingClientRect().right;
    const slideWidth = ul.offsetWidth;
    const ulWidth = lastLiPos - firstLiPos + 10; // 10은 ul의 leftpadding값
    const lastSlidePos = ulWidth - slideWidth;
    const slideCount = ulWidth / slideWidth;

    return {
      slideCount,
      slideWidth,
      lastSlidePos,
      ul,
    };
  }
}

export default FollowUsers;
