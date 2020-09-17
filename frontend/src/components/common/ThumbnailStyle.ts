import styled, { css } from 'styled-components';
import { ThumbnailProps } from './Thumbnail';

// image
import profile from '../../resource/image/profile_none.jpg';

export const StyledSpan = styled.span`
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
    imageUrl === null ? profile : `http://localhost:4000/uploads/${imageUrl}`});
`;
