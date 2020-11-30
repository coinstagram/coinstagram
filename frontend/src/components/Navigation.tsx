import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import useWindowWidth from '../hooks/useWindowWidth';

// icons
import { BsHouseDoorFill, BsHouseDoor, BsPlusCircleFill, BsPlusCircle, BsHeartFill, BsHeart, BsCompass } from 'react-icons/bs';
import { FaCompass } from 'react-icons/fa';

// components
import Thumbnail from './Thumbnail';

interface StyledNavProps {
  width: number;
}

const StyledNav = styled.nav`
  ul {
    display: flex;
    align-items: center;
  }
  li + li {
    margin-left: ${(props: StyledNavProps) => (props.width < 600 ? '15px' : '22px')};
  }
  li {
    height: 25px;
  }
  svg {
    color: rgb(50, 50, 50);
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

interface State {
  favorite: boolean;
  profile: boolean;
}

function Navigation() {
  const width = useWindowWidth();
  const page = useLocation().pathname.split('/')[1];
  const [state, setState] = useState<State>({
    favorite: false,
    profile: false,
  });

  return (
    <StyledNav width={width}>
      <h2 id="nav-heading" className="a11y-hidden">
        메인 메뉴
      </h2>
      <ul aria-labelledby="nav-heading">
        <li aria-label="홈">
          <Link to="/">{page === '' && !state.favorite && !state.profile ? <BsHouseDoorFill /> : <BsHouseDoor />}</Link>
        </li>
        <li aria-label="게시물 업로드">
          <Link to="/upload">{page === 'upload' && !state.favorite && !state.profile ? <BsPlusCircleFill /> : <BsPlusCircle />}</Link>
        </li>
        <li aria-label="타인 게시물 보기">
          <Link to="/explore">{page === 'explore' && !state.favorite && !state.profile ? <FaCompass /> : <BsCompass />}</Link>
        </li>
        <li aria-label="새 소식" id="favorite" onClick={toggle}>
          <button>{state.favorite ? <BsHeartFill tabIndex={-1} /> : <BsHeart tabIndex={-1} />}</button>
        </li>
        <li aria-label="내 프로필" id="profile" onClick={toggle}>
          <Thumbnail size={26} profile={state.profile} />
        </li>
      </ul>
    </StyledNav>
  );

  function toggle({ currentTarget }: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const id = (currentTarget as Element).id;
    const isState = (x: string): x is keyof State => x in state;
    if (!isState(id)) return;
    setState({
      ...state,
      [id]: !state[id],
    });
  }
}

export default Navigation;
