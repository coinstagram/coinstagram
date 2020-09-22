import React from 'react';
import { logout } from '../../redux/modules/auth';
import { useDispatch, useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import { StyledDivBg, StyledModal, StyledReadyDiv } from './NavModalStyle';

// icons
import { IoIosSettings } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { BiBookmark } from 'react-icons/bi';

// components
import { Link } from 'react-router-dom';
import TokenService from '../../redux/services/tokenService';

export interface NavModalProps {
  top: number;
  left: number;
  favorite?: boolean;
  profile?: boolean;
  userId?: null | string;
}

function NavModal({ top, left, favorite, profile, userId }: NavModalProps) {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    TokenService.remove();
  };
  const { auth } = useSelector((state: RootState) => state);
  const { loading } = auth;

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
                <Link to="/edit">
                  <IoIosSettings />
                  <span>설정</span>
                </Link>
              </li>
              <li onClick={onLogout}>
                <Link to="/">로그아웃</Link>
                {loading && '로딩중..'}
              </li>
            </>
          )}
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
