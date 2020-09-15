import React from 'react';
import { StyledButton, ContentProps } from './JoinLoginButtonStyle';

export default function JoinLoginButton({
  content,
  className,
  disabled,
}: ContentProps) {
  return (
    <>
      <StyledButton type="submit" disabled={disabled} className={className}>
        {content}
      </StyledButton>
    </>
  );
}
