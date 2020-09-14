import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledDiv, StyledLabel } from './UploadInput.style';
import axios from 'axios';

interface UploadDetailsProps {
  image: (img: Array<object>) => void;
}

const UploadInput: React.FC<UploadDetailsProps> = ({ image }) => {
  const imageInput = useRef<HTMLInputElement>(null);

  const isSelectedImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const fd = new FormData();
      [].forEach.call(event.target.files, (f: File) => {
        fd.append('image', f);
      });
      axios
        .post(`images`, fd)
        .then(res => {
          image(res.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  };

  return (
    <StyledDiv>
      <StyledLabel htmlFor="image" tabIndex={0}>
        <button tabIndex={-1}>
          <p>사진을 업로드 해보세요</p>
        </button>
      </StyledLabel>
      <input
        type="file"
        id="image"
        name="image"
        className="a11y-hidden"
        tabIndex={-1}
        multiple
        ref={imageInput}
        onChange={isSelectedImg}
        accept="image/png, image/jpeg"
      />
    </StyledDiv>
  );
};

export default UploadInput;
