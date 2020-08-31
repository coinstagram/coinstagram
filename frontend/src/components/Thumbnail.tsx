import React from 'react';
import styled, { css } from 'styled-components';
import profile from '../resource/image/profile_none.jpg';

const borderStyle = (width: number, isFollower: boolean) => css`
  border: ${width}px solid rgb(255, 255, 255);
  &::after {
    content: '';
    position: absolute;
    top: ${-2 * width};
    bottom: ${-2 * width};
    left: ${-2 * width};
    right: ${-2 * width};
    z-index: -1;
    border-radius: 50%;
    background: ${isFollower
      ? 'linear-gradient(to bottom left, rgb(174, 0, 255), rgba(255, 132, 66))'
      : 'rgb(0, 0, 0)'};
  }
`;

const StyledButton = styled.button`
  span {
    position: relative;
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
      imageUrl === '' ? profile : imageUrl});

    ${({ profile }: ThumbnailProps) =>
      profile === true
        ? borderStyle(1, false)
        : profile === null && borderStyle(2, true)}
  }

  div {
    position: relative;
    text-align: center;
    outline: none;
  }
  dd {
    position: absolute;
    top: 10px;
    left: -10px;
    width: 76px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.selected > span::after {
    background: linear-gradient(
      to bottom left,
      rgb(174, 0, 255),
      rgba(255, 255, 255)
    );

    transition: transform 2s;
    transform: rotate(720deg);
  }
`;

interface ThumbnailProps {
  imageUrl: string;
  size: number;
  profile: boolean;
}

function Thumbnail({ imageUrl, size, profile }: ThumbnailProps) {
  return (
    <StyledButton
      onClick={loading}
      imageUrl={imageUrl}
      size={size}
      profile={profile}
    >
      <span tabIndex={-1} />
      {profile === null && (
        <div tabIndex={-1}>
          <dt className="a11y-hidden">유저 ID</dt>
          <dd>user id1</dd>
        </div>
      )}
    </StyledButton>
  );

  function loading({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    currentTarget.classList.toggle('selected');
  }
}

Thumbnail.defaultProps = {
  imageUrl: '',
  profile: null,
};

export default React.memo(Thumbnail);
