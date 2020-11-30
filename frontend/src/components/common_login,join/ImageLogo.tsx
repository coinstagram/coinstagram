import React from 'react';
import styled, { css } from 'styled-components';
import imageLogo from '../../resource/image/logo.png';
import { StyledH1 } from '../header/LogoStyle';

const ImageLogoWrapper = styled.div`
  display: flex;
  margin: auto;
`;
const StyledDiv = styled.div`
  text-align: center;
  margin: auto 0;
  img {
    width: 80px;
    height: 80px;
  }
`;

export const MainLogo = styled(StyledH1)`
  font-size: 50px;
  text-align: center;
  margin-top: 25px;
  margin-left: 10px;
  font-weight: 600;
  ${props =>
    props.width <= 750
      ? css`
          margin-top: 20px;
          margin-bottom: 20px;
        `
      : css`
          width: 100%;
        `};
`;

export interface logoProps {
  width?: number;
  logoStyle?: string;
}
export default function ImageLogo({ width, logoStyle }: logoProps) {
  return (
    <>
      <ImageLogoWrapper>
        {width <= 750 && (
          <StyledDiv>
            <img src={imageLogo} alt="instagram_logo" />
          </StyledDiv>
        )}
        <MainLogo width={width} className={logoStyle}>
          coinstagram
        </MainLogo>
      </ImageLogoWrapper>
    </>
  );
}
