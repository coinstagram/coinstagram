import React from 'react';
import styled from 'styled-components';
import uploadImg from '../../resource/image/uploadImg.png';

const StyledDiv = styled.div`
  border-bottom: 1px solid rgb(219, 219, 219);
`;

const StyledLabel = styled.label`
  position: relative;
  display: block;
  height: 478px;

  background-image: url(${uploadImg});
  background-repeat: no-repeat;
  background-position: 46% 40%;
  background-size: 40%;
  cursor: pointer;

  span {
    display: block;
    outline: none;
    height: 100%;
  }

  p {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 20%;
    font-size: 16px;
    font-weight: bold;
    color: rgb(142, 142, 142);
  }
`;

function UploadInput() {
  return (
    <StyledDiv>
      <StyledLabel htmlFor="upload" tabIndex={0}>
        <span tabIndex={-1}>
          <p>사진을 업로드 해보세요</p>
        </span>
      </StyledLabel>
      <input
        id="upload"
        type="file"
        className="a11y-hidden"
        tabIndex={-1}
        multiple
        accept="image/png, image/jpeg"
      />
    </StyledDiv>
  );
}

export default UploadInput;
