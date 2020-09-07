import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { rotate } from '../../styles/ThumbnailBorderStyle';
import borderStyle from '../../styles/ThumbnailBorderStyle';
import { AnotherUserState } from '../../type';
import useWindowWidth from '../../hooks/useWindowWidth';

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
  slideCount: number | null;
  visual: boolean;
}

interface FoolowUsersProps {
  loading: boolean;
  error: null | Error;
  followers: AnotherUserState[];
}

function FollowUsers({ followers, loading, error }: FoolowUsersProps) {
  const ulRef = useRef<HTMLUListElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const [state, setState] = useState<State>({
    count: 0,
    slideCount: null,
    visual: false,
  });
  const width = useWindowWidth();

  useEffect(() => {
    const li = liRef.current;
    const ul = ulRef.current;

    if (li === null || ul === null) return;
    const ulRightPos = ul.getBoundingClientRect().right;
    const liRightPos = li.getBoundingClientRect().right;
    const liLeftPos = (ul.firstElementChild as HTMLLIElement).getBoundingClientRect()
      .left;
    const lastSlidePos = liRightPos - liLeftPos - ul.offsetWidth + 10;

    if (state.slideCount === state.count) {
      ul.style.transform = `translateX(-${lastSlidePos}px)`;
    }

    if (liRightPos > ulRightPos) {
      setState(prevState => ({
        ...prevState,
        visual: true,
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        visual: false,
      }));
    }
  }, [followers, width, state.count, state.slideCount]);

  const next = useCallback(() => {
    const li = liRef.current;
    const ul = ulRef.current;
    if (ul === null || li === null) return;

    const left = ul.getBoundingClientRect().left;
    const right = li.getBoundingClientRect().right;
    const slideWidth = ul.offsetWidth;
    const fullWidth = right - left;
    const slideCount = Math.floor(fullWidth / slideWidth);

    if (slideCount !== state.count + 1) {
      ul.style.transform = `translateX(-${slideWidth * (state.count + 1)}px)`;
      setState({
        ...state,
        count: state.count + 1,
      });
    }

    if (slideCount === state.count + 1) {
      setState({
        ...state,
        slideCount,
        count: state.count + 1,
      });
    }
  }, [state]);

  const prev = useCallback(() => {
    const ul = ulRef.current;
    if (ul === null) return;

    const width = ul.offsetWidth;
    ul.style.transform = `translateX(-${width * (state.count - 1)}px)`;
    setState({
      ...state,
      count: state.count - 1,
    });
  }, [state]);

  return (
    <StyledSection>
      <h3 className="a11y-hidden">팔로우한 계정</h3>
      <div className="hidden-container">
        {state.count !== 0 && <PrevBtn onClick={prev} />}
        {state.visual && state.slideCount !== state.count && (
          <NextBtn onClick={next} />
        )}
        <ul ref={ulRef}>
          {followers.length === 0 && (
            <p>
              지금 바로{' '}
              <span style={{ color: 'rgb(0, 149, 246)' }}>follow</span> 해
              보세요!
            </p>
          )}
          {followers.length !== 0 &&
            followers.map(follower => (
              <li key={follower.user_id} ref={liRef}>
                <StyledButton
                  onClick={click}
                  id={follower.user_id === null ? undefined : follower.user_id}
                >
                  <Thumbnail size={56} imageUrl={follower.user_profile} />
                  <div tabIndex={-1}>
                    <dt className="a11y-hidden">유저 ID</dt>
                    <dd>{follower.user_id}</dd>
                  </div>
                </StyledButton>
              </li>
            ))}
        </ul>
      </div>
    </StyledSection>
  );

  function click(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    rotate(e);
  }
}

export default FollowUsers;
