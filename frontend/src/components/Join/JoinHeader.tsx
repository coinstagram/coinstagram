import React from 'react';
import { Header, StyledH2 } from './JoinHeaderStyle';
import { MainLogo } from '../common_login,join/ImageLogo';

export default function JoinHeader() {
  return (
    <>
      <Header>
        <MainLogo>coInstagram</MainLogo>
        <StyledH2>친구들의 사진과 동영상을 보려면 가입하세요.</StyledH2>
      </Header>
    </>
  );
}
