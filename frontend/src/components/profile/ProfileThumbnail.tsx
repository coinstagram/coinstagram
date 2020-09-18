import React, { useState, useEffect } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledDiv } from './ProfileThumbnailStyle';

// components
import Thumbnail from '../common/Thumbnail';
import uploadService from '../../redux/services/uploadService';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import RootState from '../../type';
import { changeUserProfile } from '../../redux/modules/userInfo';

function ProfileThumbnail() {
  const width = useWindowWidth();
  const dispatch = useDispatch();

  const [imageURL, setImageURL] = useState<string | null>(null);

  const myProfile = useSelector(
    (state: RootState) => state.userInfo.user,
    shallowEqual,
  );

  const isSelectedImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const res = await uploadService.UserProFile(
      event.target.files.item(0),
      localStorage.getItem('access_token'),
    );
    setImageURL(res);
  };
  useEffect(() => {
    console.log('dispatch');

    dispatch(changeUserProfile(imageURL));
  }, [dispatch, imageURL]);
  useEffect(() => {
    console.log('imageUrl');

    setImageURL(myProfile && myProfile.user_profile);
  }, [myProfile]);

  return (
    <>
      {imageURL === null ? (
        <StyledDiv width={width}>
          <input
            id="user-profile"
            name="user-profile"
            className="a11y-hidden"
            type="file"
            accept="image/png, image/jpeg"
            onChange={isSelectedImg}
          />

          <label htmlFor="user-profile">
            {width < 750 && <Thumbnail size={77} imageUrl={null} />}
            {width >= 750 && <Thumbnail size={150} imageUrl={null} />}
          </label>
        </StyledDiv>
      ) : (
        <StyledDiv width={width}>
          <input
            id="user-profile"
            name="user-profile"
            className="a11y-hidden"
            type="file"
            accept="image/png, image/jpeg"
            onChange={isSelectedImg}
          />

          <label htmlFor="user-profile">
            {width < 750 && <Thumbnail size={77} imageUrl={imageURL} />}
            {width >= 750 && <Thumbnail size={150} imageUrl={imageURL} />}
          </label>
        </StyledDiv>
      )}
    </>
  );
}
export default ProfileThumbnail;
