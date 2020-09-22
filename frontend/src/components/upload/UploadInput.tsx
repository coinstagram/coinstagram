import React, { useState } from 'react';
import { StyledDiv, StyledLabel } from './UploadInput.style';
import FeedImgSlider from '../feed/FeedImgSlider';
import uploadService from '../../redux/services/uploadService';
import { contextValue } from '../../containers/ChangePostContainer';

interface UploadDetailsProps {
  image: (img: Array<object>) => void;
  data?: contextValue;
}
interface resDataProps {
  image_path: string;
}

const UploadInput: React.FC<UploadDetailsProps> = ({ image }) => {
  const [imageURL, setImageURL] = useState<Array<string>>([]);
  const [imageFile, setImageFile] = useState<Array<String>>([]);

  const isSelectedImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const FileUrl = await uploadService.uploadImageView(event.target.files, localStorage.getItem('access_token'));
    setImageFile([...imageFile, ...FileUrl]);
    setImageURL([...imageURL, ...FileUrl.map((data: resDataProps) => data.image_path)]);
  };

  React.useEffect(() => {
    image(imageFile);
  }, [image, imageFile]);

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
