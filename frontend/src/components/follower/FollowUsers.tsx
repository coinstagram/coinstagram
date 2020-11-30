import React, { useRef, useState, useCallback, useEffect } from 'react';
import { rotate } from '../common/ThumbnailBorderStyle';
import RootState, { AnotherUserState } from '../../type';
import useWindowWidth from '../../hooks/useWindowWidth';
import { useHistory } from 'react-router-dom';

// styles
import { StyledButton, StyledSection, StyledDiv } from './FollowUsersStyle';

// components
import Thumbnail from '../common/Thumbnail';
import NextBtn from '../common/NextBtn';
import PrevBtn from '../common/PrevBtn';
import Notice from './Notice';
import { useSelector } from 'react-redux';

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
  const history = useHistory();
  const width = useWindowWidth();

  useEffect(() => {
    const li = liRef.current;
    const ul = ulRef.current;

    if (li === null || ul === null) return;
    const ulRightPos = ul.getBoundingClientRect().right;
    const liRightPos = li.getBoundingClientRect().right;
    const liLeftPos = (ul.firstElementChild as HTMLLIElement).getBoundingClientRect().left;
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

  const { feedPosts } = useSelector((state: RootState) => state.posts.feedPosts);
  if (feedPosts.length === 0) return null;

  return (
    <StyledDiv>
      <StyledSection width={width}>
        <h2 className="a11y-hidden">팔로우한 계정</h2>
        <div className="hidden-container">
          {state.count !== 0 && <PrevBtn onClick={prev} />}
          {state.visual && state.slideCount !== state.count && <NextBtn onClick={next} />}
          <ul ref={ulRef}>
            {followers.length === 0 && (
              <p>
                아직 팔로우한 계정이 없으시군요? 다른 유저들을 <span style={{ color: 'rgb(0, 149, 246)' }}>follow</span> 해 보세요!
              </p>
            )}
            {followers.length !== 0 &&
              followers.map(follower => (
                <li key={follower.user_id} ref={liRef}>
                  <StyledButton onClick={e => click(e, follower.user_id)} id={follower.user_id === null ? undefined : follower.user_id}>
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
      {width > 1000 && <Notice />}
    </StyledDiv>
  );

  function click(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, user_id: string) {
    rotate(e);
    setTimeout(() => {
      history.push(`/account/${user_id}`);
    }, 1500);
  }
}

export default React.memo(FollowUsers);
