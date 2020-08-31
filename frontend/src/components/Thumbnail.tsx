import React from 'react';
import styled, { css } from 'styled-components';
import profile from '../resource/image/profile_none.jpg';

const StyledSpan = styled.span`
  box-sizing: border-box;
  display: block;
  outline: none;
  border-radius: 50%;
  border: ${({ state }: ThumbnailProps) => state && '1px solid'};

  ${({ size }: ThumbnailProps) =>
    size !== null &&
    css`
      width: ${size}px;
      height: ${size}px;
    `}

  background-image: url(${({ imageUrl }: ThumbnailProps) =>
    imageUrl === '' ? profile : imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
`;

interface ThumbnailProps {
  imageUrl: string;
  size: number | null;
  state: boolean | null;
}

function Thumbnail({ imageUrl, size, state }: ThumbnailProps) {
  return (
    <StyledSpan imageUrl={imageUrl} size={size} state={state} tabIndex={-1} />
  );
}

Thumbnail.defaultProps = {
  imageUrl: '',
  size: null,
  state: null,
};

export default React.memo(Thumbnail);
