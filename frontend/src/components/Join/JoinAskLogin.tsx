import React from 'react';
import { ContentProps, StyledAskLogin } from './JoinAskLoginStyle';

export default function JoinAskLogin({ askContent, content }: ContentProps) {
  return (
    <StyledAskLogin>
      <p>
        {askContent} <b className="login">{content}</b>
      </p>
    </StyledAskLogin>
  );
}
