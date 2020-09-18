import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { StyledDiv, IconWrapper, StyledP } from './ErrorMessageStyle';
import { logoProps } from './ImageLogo';

export interface ErrorProps extends logoProps {
  error?: Error | null;
  children?: React.ReactNode;
}

export default function ErrorMessage({ error, children, width }: ErrorProps) {
  return (
    <>
      {error && (
        <StyledDiv width={width}>
          <IconWrapper>
            <RiErrorWarningFill className="errorIcon" />
          </IconWrapper>
          <StyledP className="error">{children}</StyledP>
        </StyledDiv>
      )}
    </>
  );
}
