import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/modules/auth';
import TokenService from '../../redux/services/tokenService';
import useWindowWidth from '../../hooks/useWindowWidth';
import { StyledBg, StyledModal } from './LogoutModalStyle';

interface logoutModalProps {
  closeModal?: () => void;
}
export default function LogoutModal({ closeModal }: logoutModalProps) {
  const width = useWindowWidth();
  const dispatch = useDispatch();
  const yesLogout = () => {
    dispatch(logout());
    TokenService.remove();
  };

  return (
    <>
      <StyledBg>
        <StyledModal width={width}>
          <p>정말 로그아웃하시겠습니까?</p>
          <div className="btns">
            <button className="yesBtn" onClick={yesLogout}>
              네
            </button>
            <button className="noBtn" onClick={closeModal}>
              아니오
            </button>
          </div>
        </StyledModal>
      </StyledBg>
    </>
  );
}
