import React from 'react';
import { StyledButton, ContentProps } from './JoinLoginButton.style';

export default function JoinLoginButton({ content }: ContentProps) {
  return (
    <>
      <StyledButton type="submit">{content}</StyledButton>
    </>
  );
}
