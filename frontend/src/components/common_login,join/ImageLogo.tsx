import React from 'react';
import styled, { css } from 'styled-components';
import imageLogo from '../../resource/image/logo.png';
import { StyledH1 } from '../header/LogoStyle';

const StyledDiv = styled.div`
  text-align: center;
  img {
    width: 100px;
    height: 100px;
  }
`;

export const MainLogo = styled(StyledH1)`
  font-size: 50px;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 40px;
  font-weight: 600;
  ${props =>
    props.width <= 750 &&
    css`
      margin-top: 20px;
      margin-bottom: 20px;
    `};
  &.joinLogo {
    margin-bottom: 20px;
    margin-left: 10px;
    ${props => props.width}
  }
`;

export interface logoProps {
  width?: number;
  logoStyle?: string;
}
export default function ImageLogo({ width, logoStyle }: logoProps) {
  return (
    <>
      {width <= 750 && (
        <StyledDiv>
          <img src={imageLogo} alt="instagram_logo" />
        </StyledDiv>
      )}
      <MainLogo width={width} className={logoStyle}>
        coinstagram
      </MainLogo>
    </>
  );
}
