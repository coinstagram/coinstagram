import React, { useState } from 'react';
import { StyledDiv, StyledLabel } from './UploadInput.style';
import axios from 'axios';
import FeedImgSlider from '../feed/FeedImgSlider';

interface UploadDetailsProps {
  image: (img: Array<object>) => void;
}
interface resDataProps {
  image_path: String;
}

const UploadInput: React.FC<UploadDetailsProps> = ({ image }) => {
  const [imageURL, setImageURL] = useState<Array<string>>(['']);
  const isSelectedImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const fd = new FormData();
      [].forEach.call(event.target.files, (f: File) => {
        fd.append('image', f);
      });
      let token = localStorage.getItem('access_token');

      const res = await axios.post(`images`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      image(res.data);

      setImageURL([...res.data.map((data: resDataProps) => data.image_path)]);
    }
  };
  React.useEffect(() => {
    console.log(`http://localhost:4000/${imageURL[0]}`);
  }, [imageURL]);

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
