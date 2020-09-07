import React from 'react';
import styled from 'styled-components';

interface ContentProps {
  content?: string;
}
export default function JoinLoginButton({ content }: ContentProps) {
  const StyledButton = styled.button`
    display: block;
    background: #b2dffc;
    color: white;
    font-weight: bold;
    text-align: center;
    width: 100%;
    height: 30px;
    border-radius: 3px;
  `;

  return (
    <>
      <StyledButton type="submit">{content}</StyledButton>
    </>
  );
}
