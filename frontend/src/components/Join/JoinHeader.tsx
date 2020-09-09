import React from 'react';
import { MainLogo, Header, StyledH2, OrBorder } from './JoinHeaderStyle';

export default function JoinHeader() {
  return (
    <>
      <Header>
        <MainLogo>coInstagram</MainLogo>
        <StyledH2>친구들의 사진과 동영상을 보려면 가입하세요.</StyledH2>
      </Header>
      <OrBorder>
        <div className="leftLine"></div>
        <div className="rightLine"></div>
      </OrBorder>
    </>
  );
}
