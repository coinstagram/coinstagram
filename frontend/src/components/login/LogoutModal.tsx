import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/modules/auth';
import TokenService from '../../redux/services/tokenService';
import useWindowWidth from '../../hooks/useWindowWidth';
import { StyledBg, StyledModal } from './LogoutModalStyle';
import Home from '../../pages/Home';

interface logoutModalProps {
  logoutModal: boolean;
}
export default function LogoutModal() {
  const width = useWindowWidth();
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const yesLogout = () => {
    dispatch(logout());
    TokenService.remove();
  };
  const noLogout = () => {
    setLoggedIn(true);
  };

  return (
    <StyledBg>
      <StyledModal width={width}>
        <p>정말 로그아웃하시겠습니까?</p>
        <div className="btns">
          <button className="yesBtn" onClick={yesLogout}>
            네
          </button>
          <button className="noBtn" onClick={noLogout}>
            아니오
            {loggedIn && <Route path="/" component={Home} />}
          </button>
        </div>
      </StyledModal>
    </StyledBg>
  );
}
