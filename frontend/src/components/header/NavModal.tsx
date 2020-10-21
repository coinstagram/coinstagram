import React, { useState } from 'react';
import { logout } from '../../redux/modules/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TokenService from '../../redux/services/tokenService';
import LogoutModal from '../login/LogoutModal';

// styles
import { StyledDivBg, StyledModal, StyledReadyDiv } from './NavModalStyle';

// icons
import { IoIosSettings } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { BiBookmark } from 'react-icons/bi';

// components

export interface NavModalProps {
  top: number;
  left: number;
  favorite?: boolean;
  profile?: boolean;
  userId?: null | string;
}

function NavModal({ top, left, favorite, profile, userId }: NavModalProps) {
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState(true);

  const onLogout = () => {
    // console.log(logoutModal);
    setLogoutModal(true);
    dispatch(logout());
    TokenService.remove();
  };
  // console.log(logoutModal);
  return (
    <StyledDivBg>
      <StyledModal top={top} left={left}>
        <ul className="modal-container">
          {profile && (
            <>
              <li>
                <Link to={`/account/${userId}`}>
                  <CgProfile />
                  <span>프로필</span>
                </Link>
              </li>
              <li>
                <Link to={`/account/${userId}/saved`}>
                  <BiBookmark />
                  <span>저장됨</span>
                </Link>
              </li>
              <li>
                <Link to="/edit/profile">
                  <IoIosSettings />
                  <span>설정</span>
                </Link>
              </li>
              {/* <li onClick={onLogout}> */}
              <li onClick={() => setLogoutModal(true)}>
                {/* 로그아웃 */}
                <Link to="/">로그아웃</Link>
              </li>
            </>
          )}
          {/* <LogoutModal logoutModal={logoutModal} /> */}
          {/* {logoutModal && <LogoutModal />} */}
          {/* {profile && logoutModal && <LogoutModal />} */}
          {favorite && (
            <li>
              <StyledReadyDiv>
                열심히 준비중인 기능이에요{' '}
                <span aria-label="우는 표정" role="img">
                  😭
                </span>
              </StyledReadyDiv>
            </li>
          )}
        </ul>
      </StyledModal>
    </StyledDivBg>
  );
}

NavModal.defaultProps = {
  favorite: false,
  profile: false,
  userId: null,
};

export default NavModal;
