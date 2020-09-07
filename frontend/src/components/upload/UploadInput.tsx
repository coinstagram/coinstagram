import React, { useRef, useCallback } from 'react';
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
const UploadInput: React.FC = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onChangeImages = useCallback(e => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
  }, []);
  return (
    <StyledDiv>
      <StyledLabel htmlFor="upload" tabIndex={0}>
        <button tabIndex={-1}>
          <p>사진을 업로드 해보세요</p>
        </button>
      </StyledLabel>
      <input
        type="file"
        id="upload"
        className="a11y-hidden"
        tabIndex={-1}
        multiple
        ref={imageInput}
        onClick={onClickImageUpload}
        onChange={onChangeImages}
        accept="image/png, image/jpeg"
      />
    </StyledDiv>
  );
};

export default UploadInput;
