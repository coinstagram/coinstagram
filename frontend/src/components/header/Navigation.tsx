import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';

// icons
import {
  BsHouseDoorFill,
  BsHouseDoor,
  BsPlusCircleFill,
  BsPlusCircle,
  BsHeartFill,
  BsHeart,
  BsCompass,
} from 'react-icons/bs';
import { FaCompass } from 'react-icons/fa';

// components
import Thumbnail from '../Thumbnail';
import NavModal from './NavModal';

interface StyledNavProps {
  width: number;
}

const StyledNav = styled.nav`
  ul {
    display: flex;
    align-items: center;
  }
  li + li {
    margin-left: ${(props: StyledNavProps) =>
      props.width < 600 ? '15px' : '22px'};
  }
  li {
    height: 25px;
  }
  svg {
    font-size: 23px;
    width: 25px;
    height: 25px;
    outline: none;
    vertical-align: bottom;

    &:active {
      color: rgb(120, 120, 120);
    }
  }
`;

const StyledButton = styled.button`
  ${props =>
    props.clicked &&
    css`
      & > span {
        position: relative;
        border: 1px solid rgb(255, 255, 255);
      }
      & > span::after {
        content: '';
        position: absolute;
        top: ${-2}px;
        bottom: ${-2}px;
        left: ${-2}px;
        right: ${-2}px;
        z-index: -1;
        border-radius: 50%;
        background: rgb(0, 0, 0);
      }
    `}
`;

interface State {
  favorite: boolean;
  profile: boolean;
}

interface NavigationProps {
  imageUrl: null | string;
}

function Navigation({ imageUrl }: NavigationProps) {
  const width = useWindowWidth();
  const page = useLocation().pathname.split('/')[1];
  const [state, setState] = useState<State>({
    favorite: false,
    profile: false,
  });
  const top = useRef<number>(0);
  const left = useRef<number>(0);

  return (
    <StyledNav width={width}>
      <h2 id="nav-heading" className="a11y-hidden">
        메인 메뉴
      </h2>
      <ul aria-labelledby="nav-heading">
        <li aria-label="홈">
          <Link to="/">
            {page === '' && !state.favorite && !state.profile ? (
              <BsHouseDoorFill />
            ) : (
              <BsHouseDoor />
            )}
          </Link>
        </li>
        <li aria-label="게시물 업로드">
          <Link to="/upload">
            {page === 'upload' && !state.favorite && !state.profile ? (
              <BsPlusCircleFill />
            ) : (
              <BsPlusCircle />
            )}
          </Link>
        </li>
        <li aria-label="타인 게시물 보기">
          <Link to="/explore">
            {page === 'explore' && !state.favorite && !state.profile ? (
              <FaCompass />
            ) : (
              <BsCompass />
            )}
          </Link>
        </li>
        <li aria-label="새 소식" onClick={toggle} id="favorite">
          <button>
            {state.favorite ? (
              <BsHeartFill tabIndex={-1} />
            ) : (
              <BsHeart tabIndex={-1} />
            )}
          </button>
          {state.favorite && (
            <NavModal
              top={top.current}
              left={left.current}
              favorite={state.favorite}
            />
          )}
        </li>
        <li aria-label="내 프로필" onClick={toggle} id="profile">
          <StyledButton clicked={state.profile}>
            <Thumbnail size={26} imageUrl={imageUrl} />
          </StyledButton>
          {state.profile && (
            <NavModal
              top={top.current}
              left={left.current}
              profile={state.profile}
            />
          )}
        </li>
      </ul>
    </StyledNav>
  );

  function toggle({
    currentTarget,
  }: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const id = (currentTarget as Element).id;
    const posBottom = currentTarget.getBoundingClientRect().bottom;
    const posCenter =
      currentTarget.getBoundingClientRect().right -
      currentTarget.getBoundingClientRect().width / 2;

    top.current = posBottom;
    left.current = posCenter;

    const isState = (x: string): x is keyof State => x in state;
    if (!isState(id)) return;

    setState({
      ...state,
      [id]: !state[id],
    });
  }
}

Navigation.defaultProp = {
  imageUrl: '',
};

export default Navigation;
