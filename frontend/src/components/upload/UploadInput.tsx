import React, { useRef, useCallback } from 'react';
import { StyledDiv, StyledLabel } from './UploadInput.style';

interface UploadDetailsProps {
  change: (event: React.ChangeEvent<HTMLButtonElement>) => void;
}

const UploadInput: React.FC<UploadDetailsProps> = ({ change }) => {
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
