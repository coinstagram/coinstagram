import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledDiv, StyledLabel } from './UploadInput.style';
import axios from 'axios';

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
      let token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsInVzZXJfbmFtZSI6IjEiLCJ1c2VyX2dlbmRlciI6bnVsbCwidXNlcl9pbnRyb2R1Y2UiOm51bGwsInVzZXJfcGhvbmUiOm51bGwsInVzZXJfZW1haWwiOiIxIiwidXNlcl9wcm9maWxlIjpudWxsLCJpYXQiOjE2MDAwOTUyMzMsImV4cCI6MTYwMDcwMDAzM30.9-qcZA4LwwmgM8wwm4EcAPiA83frfsplRI7SHqnqeAE';

      const res = await axios.post(`images`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      image(res.data);
      console.log(res.data.map((data: resDataProps) => data.image_path));

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
