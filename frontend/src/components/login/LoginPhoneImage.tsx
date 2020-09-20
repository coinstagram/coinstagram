import React from 'react';
import login_phone_image from '../../../src/resource/image/login_phone_image.png';
import { StyledDiv, InfiniteImages } from './LoginPhoneImageStyle';
import useWindowWidth from '../../hooks/useWindowWidth';

export default function LoginPhoneImage() {
  const width = useWindowWidth();

  return (
    <>
      {width >= 810 && (
        <StyledDiv>
          <img src={login_phone_image} alt="login_phone_image" className="phoneImage" />

          <InfiniteImages />
        </StyledDiv>
      )}
    </>
  );
}
