import React from 'react';
import { Link } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';

import JoinContainer from '../../containers/JoinContainer';
import JoinHeader from '../../components/Join/JoinHeader';
import JoinAppDownload from '../../components/Join/JoinAppDownload';
import JoinAskLogin from '../../components/common_login,join/JoinAskLogin';
import JoinPolicy from '../../components/Join/JoinPolicy';
import { StyledDiv, StyledJoinWrapper } from './JoinWrapperStyle';

export default function JoinWrapper() {
  const width = useWindowWidth();
  return (
    <StyledDiv width={width}>
      <StyledJoinWrapper width={width}>
        <JoinHeader />
        <JoinContainer />
        <JoinPolicy />
      </StyledJoinWrapper>
      <Link to={'/login'}>
        <JoinAskLogin askContent="계정이 있으신가요?" content="로그인" />
      </Link>
      {width > 750 && <JoinAppDownload />}
    </StyledDiv>
  );
}
