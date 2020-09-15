import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledDiv, StyledLabel } from './UploadInput.style';
import axios from 'axios';
import UploadImageView from './UploadImageView';

interface UploadDetailsProps {
  image: (img: Array<object>) => void;
}
interface resDataProps {
  image_path: String;
}

const UploadInput: React.FC<UploadDetailsProps> = ({ image }) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageURL, setImageURL] = useState<Object>({});

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
      console.log(res.data[0].image_path);

      setImageURL({
        ...imageURL,
        ...res.data.map((data: resDataProps) => data.image_path),
      });
    }
  };

  React.useEffect(() => {
    console.log(imageURL);
  }, [imageURL]);

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
