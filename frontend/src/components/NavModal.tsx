import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// icons
import { RiSettings3Line, RiBookmarkLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { BiBookmark } from 'react-icons/bi';

const StyledDivBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div`
  position: absolute;
  top: ${({ top }: NavModalProps) => top + 13};
  left: ${({ left }: NavModalProps) => left - 200};
  width: 230px;
  height: 148px;
  border-radius: 6px;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);

  &::before {
    content: '';
    position: absolute;
    top: -7px;
    left: 193px;
    width: 14px;
    height: 14px;
    transform: rotateZ(45deg);
    background: rgb(255, 255, 255);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  }

  .modal-container {
    position: absolute;
    width: 100%;
    background-color: rgb(255, 255, 255);
    display: block;
    border-radius: 6px;

    li {
      width: 100%;
      height: 37px;
      a {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        line-height: 21px;
        padding: 8px 16px;

        svg {
          width: 20px;
          height: 20px;
          margin-right: 12px;
        }

        &:hover {
          background: rgb(248, 249, 250);
        }
        &:active {
          background: rgb(241, 243, 245);
        }
      }

      &:nth-child(4) {
        border-top: 1px solid rgb(219, 219, 219);
        font-size: 15px;
      }
    }

    li + li {
      margin-left: 0;
    }
  }
`;

interface NavModalProps {
  top: number;
  left: number;
  favorite?: boolean;
  profile?: boolean;
}

function NavModal({ top, left, favorite, profile }: NavModalProps) {
  return (
    <StyledDivBg>
      <StyledModal top={top} left={left}>
        <ul className="modal-container">
          {profile && (
            <>
              <li>
                <Link to="/:userid">
                  <CgProfile />
                  <span>프로필</span>
                </Link>
              </li>
              <li>
                <Link to="/account/:userid/saved">
                  <BiBookmark />
                  <span>저장됨</span>
                </Link>
              </li>
              <li>
                <Link to="/account/edit">
                  <RiSettings3Line />
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
};

export default NavModal;
