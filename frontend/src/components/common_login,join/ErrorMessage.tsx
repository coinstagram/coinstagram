import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { StyledDiv, IconWrapper, StyledP } from './ErrorMessageStyle';

export interface ErrorProps {
  error?: Error | null;
  children?: React.ReactNode;
}

export default function ErrorMessage({ error, children }: ErrorProps) {
  return (
    <>
      {error && (
        <StyledDiv>
          <IconWrapper>
            <RiErrorWarningFill className="errorIcon" />
          </IconWrapper>
          <StyledP className="error">{children}</StyledP>
        </StyledDiv>
      )}
    </>
  );
}
