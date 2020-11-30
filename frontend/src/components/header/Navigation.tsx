import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// styles
import { StyledButton, StyledNav } from './NavigationStyle';

// icons
import { BsHouseDoorFill, BsHouseDoor, BsPlusCircleFill, BsPlusCircle, BsHeartFill, BsHeart, BsCompass } from 'react-icons/bs';
import { FaCompass } from 'react-icons/fa';

// components
import Thumbnail from '../common/Thumbnail';
import NavModal from './NavModal';
import useWindowWidth from '../../hooks/useWindowWidth';
import LogoutModal from '../login/LogoutModal';

interface State {
  favorite: boolean;
  profile: boolean;
}

interface NavigationProps {
  imageUrl: null | string;
  userId: null | string;
}

function Navigation({ imageUrl, userId }: NavigationProps) {
  const width = useWindowWidth();
  const page = useLocation().pathname.split('/')[1];
  const route = useLocation().pathname.split('/')[2];
  const [state, setState] = useState<State>({
    favorite: false,
    profile: false,
  });
  const top = useRef<number>(0);
  const left = useRef<number>(0);

  const [logoutModal, setLogoutModal] = useState(false);
  const onLogout = () => {
    setLogoutModal(true);
  };
  const closeModal = () => {
    setLogoutModal(false);
  };
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
          <Link to="/explore">{page === 'explore' && route === undefined && !state.favorite && !state.profile ? <FaCompass /> : <BsCompass />}</Link>
        </li>
        <li aria-label="새 소식" onClick={toggle} id="favorite">
          <button>{state.favorite ? <BsHeartFill tabIndex={-1} /> : <BsHeart tabIndex={-1} />}</button>
          {state.favorite && <NavModal top={top.current} left={left.current} favorite={state.favorite} userId={userId} />}
        </li>
        <li aria-label="내 프로필" onClick={toggle} id="profile">
          <StyledButton clicked={state.profile}>
            <Thumbnail size={width > 400 ? 28 : 22} imageUrl={imageUrl} />
          </StyledButton>
          {state.profile && <NavModal top={top.current} left={left.current} profile={state.profile} userId={userId} onLogout={onLogout} />}
        </li>
      </ul>
      {logoutModal && <LogoutModal closeModal={closeModal} />}
    </StyledNav>
  );

  function toggle({ currentTarget }: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const id = (currentTarget as Element).id;
    const posBottom = currentTarget.getBoundingClientRect().bottom;
    const posCenter = currentTarget.getBoundingClientRect().right - currentTarget.getBoundingClientRect().width / 2;

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
