import React, { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StyledDiv, StyledLabel } from './UploadInput.style';
import { add_image, uploadImage } from '../../redux/modules/upload';

interface UploadDetailsProps {
  change: (event: React.ChangeEvent<HTMLButtonElement>) => void;
}

const UploadInput: React.FC<UploadDetailsProps> = ({ change }) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onChangeImages = useCallback(
    e => {
      let imageData: uploadImage = { image: [] };
      [].forEach.call(e.target.files, (f: File) => {
        console.log(f);

        imageData = { image: [...imageData.image, f] };
      });
      console.log(imageData);

      dispatch(add_image(imageData));
    },
    [dispatch],
  );

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
