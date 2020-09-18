import React from 'react';
import { Header } from './JoinHeaderStyle';
// import styled from 'styled-components';
import ImageLogo from '../common_login,join/ImageLogo';
import useWindowWidth from '../../hooks/useWindowWidth';
import { StyledH2 } from './JoinHeaderStyle';

export default function JoinHeader() {
  const width = useWindowWidth();
  return (
    <>
      <Header>
        <ImageLogo width={width} />
        {/* <MainLogo style={{ marginBottom: '15px' }}>coInstagram</MainLogo> */}
        {width > 750 && (
          <StyledH2>친구들의 사진과 동영상을 보려면 가입하세요.</StyledH2>
        )}
      </Header>
    </>
  );
}
