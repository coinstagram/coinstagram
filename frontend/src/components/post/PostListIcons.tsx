import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  BsHeartFill,
  BsHeart,
  BsBookmarks,
  BsBookmarksFill,
  BsChat,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    like?: boolean;
  }
}

const StyledDiv = styled.div`
  height: 64px;
  padding: 8px 16px;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    font-size: 25px;
    &:hover {
      color: rgb(73, 80, 87);
    }

    span {
      outline: none;
    }

    &#like {
      ${props =>
        props.like === true &&
        css`
          color: rgb(250, 82, 82);
          &:hover {
            color: rgb(255, 107, 107);
          }
        `};
    }
  }

  a {
    display: inline-block;
    margin-left: 15px;
    font-size: 26px;
    &:hover {
      color: rgb(73, 80, 87);
    }

    span {
      outline: none;
    }
  }
`;

interface State {
  like: boolean;
  favorite: boolean;
}

function PostListIcons() {
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
          <Link to="/post/:postid">
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

export default PostListIcons;
