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

interface ProfileThumbnailProps {
  myId?: string;
  profileId?: string;
  profileImage?: null | string;
}

function ProfileThumbnail({ myId, profileId, profileImage }: ProfileThumbnailProps) {
  const width = useWindowWidth();
  const dispatch = useDispatch();
  const myInfo = useSelector((state: RootState) => state.userInfo.user, shallowEqual);

  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    if (!imageURL) return;
    console.log(imageURL);

    dispatch(changeUserProfile(imageURL));
  }, [dispatch, imageURL]);

  // useEffect(() => {
  //   if (myInfo && myInfo.user_profile) {
  //     setImageURL(myInfo.user_profile);
  //   }
  // }, [myInfo]);

  const isSelectedImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const res = await uploadService.UserProFile(event.target.files.item(0), localStorage.getItem('access_token'));

    setImageURL(res);
  };

  return (
    <>
      {myId === profileId ? (
        <StyledDiv width={width}>
          <input id="user-profile" name="user-profile" className="a11y-hidden" type="file" accept="image/png, image/jpeg" onChange={isSelectedImg} />

          <label htmlFor="user-profile">
            {width < 750 && <Thumbnail size={77} imageUrl={myInfo.user_profile} />}
            {width >= 750 && <Thumbnail size={150} imageUrl={myInfo.user_profile} />}
          </label>
        </StyledDiv>
      ) : (
        <StyledDiv width={width}>
          {width < 750 && <Thumbnail size={77} imageUrl={profileImage} />}
          {width >= 750 && <Thumbnail size={150} imageUrl={profileImage} />}
        </StyledDiv>
      )}
    </>
  );
}
export default ProfileThumbnail;
