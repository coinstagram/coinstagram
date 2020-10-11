import React, { useState } from 'react';

import useWindowWidth from '../../hooks/useWindowWidth';
import { StyledBg, StyledModal } from './LogoutModalStyle';

export default function LogoutModal() {
  const width = useWindowWidth();
  //   const [loggedIn, setLoggedIn] = useState(true);
  const yesLogout = () => {};
  const noLogout = () => {
    //   setLoggedIn(true);
  };
  //   const
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
          </button>
        </div>
      </StyledModal>
    </StyledBg>
  );
}
