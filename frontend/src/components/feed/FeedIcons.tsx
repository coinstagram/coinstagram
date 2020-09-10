import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// icons
import {
  BsHeartFill,
  BsHeart,
  BsBookmarks,
  BsBookmarksFill,
  BsChat,
} from 'react-icons/bs';

// styles
import { StyledDiv, IconDiv } from './FeedIconsStyle';

interface State {
  like: boolean;
  favorite: boolean;
}

interface FeedIconsProps {
  postId: number;
}

function FeedIcons({ postId }: FeedIconsProps) {
  const [state, setState] = useState<State>({
    like: false,
    favorite: false,
  });

  return (
    <StyledDiv>
      <IconDiv like={state.like}>
        <div>
          <button onClick={click} id="like">
            <span tabIndex={-1}>
              {state.like ? <BsHeartFill /> : <BsHeart />}
            </span>
          </button>
          <Link to={`/post/${postId}`}>
            <span tabIndex={-1}>
              <BsChat />
            </span>
          </Link>
        </div>
        <button onClick={click} id="favorite">
          <span tabIndex={-1}>
            {state.favorite ? <BsBookmarksFill /> : <BsBookmarks />}
          </span>
        </button>
      </IconDiv>
      <div>
        <p>xxx 명이 좋아합니다.</p>
      </div>
    </StyledDiv>
  );

  function click({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = (currentTarget as Element).id;

    const isState = (x: string): x is keyof State => x in state;
    if (!isState(id)) return;

    setState({
      ...state,
      [id]: !state[id],
    });
  }
}

export default FeedIcons;
