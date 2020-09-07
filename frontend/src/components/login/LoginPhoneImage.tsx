import React from 'react';
import styled from 'styled-components';
import login_phone_image from '../../../src/resource/image/login_phone_image.png';

export default function LoginPhoneImage() {
  const StyledDiv = styled.div``;
  return (
    <StyledDiv>
      <img src={login_phone_image} alt="login_phone_image" />
    </StyledDiv>
  );
}
