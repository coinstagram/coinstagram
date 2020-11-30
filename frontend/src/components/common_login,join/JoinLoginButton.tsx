import React from 'react';
import { StyledButton, ContentProps } from './JoinLoginButtonStyle';
import LoadingSpinner from '../../components/common_login,join/LoadingSpinner';
import useWindowWidth from '../../hooks/useWindowWidth';
export default function JoinLoginButton({ content, className, disabled, loading, children }: ContentProps) {
  const width = useWindowWidth();
  return (
    <>
      <StyledButton type="submit" disabled={disabled} className={className} width={width}>
        {content}
        {loading && <LoadingSpinner />}
      </StyledButton>
    </>
  );
}
