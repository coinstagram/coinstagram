import React from 'react';
import { ContentProps, StyledAskLogin } from './JoinAskLoginStyle';
import useWindowWidth from '../../hooks/useWindowWidth';

export default function JoinAskLogin({ askContent, content }: ContentProps) {
  const width = useWindowWidth();
  return (
    <StyledAskLogin width={width}>
      <p>
        {askContent} <b className="login">{content}</b>
      </p>
    </StyledAskLogin>
  );
}
