import React, { useState } from 'react';
import { StyledDiv, StyledLabel } from './UploadInput.style';
import axios from 'axios';
import FeedImgSlider from '../feed/FeedImgSlider';
import uploadService from '../../redux/services/uploadService';

interface UploadDetailsProps {
  image: (img: Array<object>) => void;
}
interface resDataProps {
  image_path: String;
}

const UploadInput: React.FC<UploadDetailsProps> = ({ image }) => {
  const [imageURL, setImageURL] = useState<Array<string>>([]);
  const [imageFile, setImageFile] = useState<FileList>();

  const isSelectedImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      setImageFile(() => event.target.files);
    } else {
    }

    const FileUrl = await uploadService.uploadImageView(
      event.target.files,
      localStorage.getItem('access_token'),
    );

    image(FileUrl);

    setImageURL([
      ...imageURL,
      ...FileUrl.map((data: resDataProps) => data.image_path),
    ]);
  };

  React.useEffect(() => {
    console.log(imageFile);
    // console.log('imageFile', imageFile);
  }, [imageFile]);

  return (
    <>
      {imageURL[0] === '' ? (
        <StyledDiv>
          <StyledLabel htmlFor="image" tabIndex={0}>
            <input
              type="file"
              id="image"
              name="image"
              className="a11y-hidden"
              tabIndex={-1}
              multiple
              onChange={isSelectedImg}
              accept="image/png, image/jpeg"
            />
          </StyledLabel>
        </StyledDiv>
      ) : (
        <>
          <FeedImgSlider imageUrl={imageURL}>
            <StyledLabel htmlFor="image" tabIndex={0}>
              <input
                type="file"
                id="image"
                name="image"
                className="a11y-hidden"
                tabIndex={-1}
                multiple
                onChange={isSelectedImg}
                accept="image/png, image/jpeg"
              />
            </StyledLabel>
          </FeedImgSlider>
        </>
      )}
    </>
  );
};

export default UploadInput;
