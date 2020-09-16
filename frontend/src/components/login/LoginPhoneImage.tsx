import React, { useState, useEffect } from 'react';
import login_phone_image from '../../../src/resource/image/login_phone_image.png';
import { StyledDiv, imgArray } from './LoginPhoneImageStyle';

export default function LoginPhoneImage() {
  const [index, setIndex] = useState(0);
  const selectedImg = imgArray[index];

  useEffect(() => {
    let rotateId: number = setInterval(() => {});
    if (index < imgArray.length) {
      rotateId = setInterval(() => setIndex(index + 1), 5000);
    } else {
      setInterval(setIndex(0), 5000);
    }
    return function cleanup() {
      clearInterval(rotateId);
    };
  }, [index]);

  return (
    <StyledDiv>
      <img
        src={login_phone_image}
        alt="login_phone_image"
        className="phoneImage"
      />
      <img src={selectedImg} alt="randomImage" className="randomImage" />
    </StyledDiv>
  );
}
