import React from 'react';

// styles
import { StyledDivBg, StyledModal } from './NavModalStyle';

// icons
import { IoIosSettings } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { BiBookmark } from 'react-icons/bi';

// components
import { Link } from 'react-router-dom';

export interface NavModalProps {
  top: number;
  left: number;
  favorite?: boolean;
  profile?: boolean;
  userId?: null | string;
}

function NavModal({ top, left, favorite, profile, userId }: NavModalProps) {
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
              <li>
                <Link to="/">로그아웃</Link>
              </li>
            </>
          )}
          {favorite && <li>준비중입니다.</li>}
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
