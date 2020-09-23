import React, { useState } from 'react';
import FeedImgSlider from '../feed/FeedImgSlider';
import uploadService from '../../redux/services/uploadService';
import { contextValue } from '../../containers/ChangePostContainer';
import { useSelector } from 'react-redux';
import RootState from '../../type';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledDiv, StyledLabel, StyledButton, StyledSpinnerDiv } from './UploadInput.style';

// components
import Spinner from '../common/Spinner';

interface UploadDetailsProps {
  image: (img: Array<string>) => void;
  onsubmit: (e: any) => void;
  data?: contextValue;
}
interface resDataProps {
  image_path: string;
}

const UploadInput: React.FC<UploadDetailsProps> = ({ image, onsubmit, data }) => {
  const { Loading } = useSelector((state: RootState) => state.upload);
  const [imageURL, setImageURL] = useState<Array<string>>([]);
  const [imageFile, setImageFile] = useState<Array<string>>([]);
  const width = useWindowWidth();

  React.useEffect(() => {}, [data]);

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
          <StyledLabel htmlFor="image" tabIndex={0} width={width}>
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
            <StyledLabel htmlFor="image" tabIndex={0} width={width}>
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
          <StyledButton onClick={onsubmit} disabled={imageURL.length === 0 || Loading ? true : false} image={imageURL} Loading={Loading}>
            업로드
            {Loading && (
              <StyledSpinnerDiv>
                <Spinner />
              </StyledSpinnerDiv>
            )}
          </StyledButton>
        </>
      )}
    </>
  );
};

export default UploadInput;
