import React, { useState, useEffect } from 'react';
import login_phone_image from '../../../src/resource/image/login_phone_image.png';
import { StyledDiv, imgArray } from './LoginPhoneImageStyle';
import useWindowWidth from '../../hooks/useWindowWidth';

export default function LoginPhoneImage() {
  const [index, setIndex] = useState(0);
  const selectedImg = imgArray[index];
  const width = useWindowWidth();

  useEffect(() => {
    const rotateId = setInterval(
      () => setIndex(index < imgArray.length - 1 ? index + 1 : 0),
      5000,
    );

    return function cleanup() {
      clearInterval(rotateId);
    };
  }, [index]);

  return (
    <>
      {width >= 750 && (
        <StyledDiv>
          <img
            src={login_phone_image}
            alt="login_phone_image"
            className="phoneImage"
          />
          <img src={selectedImg} alt="randomImage" className="randomImage" />
        </StyledDiv>
      )}
    </>
  );
}
