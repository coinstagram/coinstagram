import React from 'react';
import styled, { css } from 'styled-components';

// image
import profile from '../resource/image/profile_none.jpg';

const StyledSpan = styled.span`
  box-sizing: border-box;
  display: inline-block;
  outline: none;
  border-radius: 50%;

  ${({ size }: ThumbnailProps) =>
    size &&
    css`
      width: ${size}px;
      height: ${size}px;
    `}

  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url(${({ imageUrl }: ThumbnailProps) =>
    imageUrl === null ? profile : imageUrl});
`;

interface ThumbnailProps {
  imageUrl: string | null;
  size: number;
}

function Thumbnail({ imageUrl, size }: ThumbnailProps) {
  return (
    <StyledSpan
      tabIndex={-1}
      imageUrl={imageUrl}
      size={size}
      className="thumbnail"
    />
  );
}

export default React.memo(Thumbnail);
