import React from 'react';
import { StyledButton, ContentProps } from './JoinLoginButtonStyle';
import useWindowWidth from '../../hooks/useWindowWidth';
export default function JoinLoginButton({ content, className, disabled }: ContentProps) {
  const width = useWindowWidth();
  return (
    <>
      <StyledButton type="submit" disabled={disabled} className={className} width={width}>
        {content}
      </StyledButton>
    </>
  );
}
