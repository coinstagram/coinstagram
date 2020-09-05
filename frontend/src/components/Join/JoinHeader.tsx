import React from 'react';
import styled from 'styled-components';
import { StyledH1 } from '../header/Logo';

export default function JoinHeader() {
  const Header = styled.div`
    height: 150px;
  `;
  const MainLogo = styled(StyledH1)`
    font-size: 50px;
    text-align: center;
    margin-top: 30px;
    font-weight: 600;
  `;
  const StyledH2 = styled.h2`
    color: #828282;
    font-size: 1.2rem;
    text-align: center;
    margin: 10px 0;
  `;
  const OrBorder = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0 20px;

    .leftLine,
    .rightLine {
      height: 1px;
      background: #dbdbdb;

      width: 100%;
      position: relative;
      top: 0.65em;
    }

    /* .or {
      margin: 0 18px;
      color: #828282;
      font-weight: bold;
      white-space: nowrap;
      font-size: 0.9em;
    } */
  `;
  return (
    <>
      <Header>
        <MainLogo>coInstagram</MainLogo>
        <StyledH2>친구들의 사진과 동영상을 보려면 가입하세요.</StyledH2>
      </Header>
      <OrBorder>
        <div className="leftLine"></div>
        {/* <div className="or">또는</div> */}
        <div className="rightLine"></div>
      </OrBorder>
    </>
  );
}
