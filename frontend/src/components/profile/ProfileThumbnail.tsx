import React from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledDiv } from './ProfileThumbnailStyle';

// components
import Thumbnail from '../common/Thumbnail';

function ProfileThumbnail() {
  const width = useWindowWidth();

  return (
    <StyledDiv width={width}>
      <input
        id="user-profile"
        className="a11y-hidden"
        type="file"
        accept="image/png, image/jpeg"
      />
      <label htmlFor="user-profile">
        {width < 750 && <Thumbnail size={77} imageUrl={null} />}
        {width >= 750 && <Thumbnail size={150} imageUrl={null} />}
      </label>
    </StyledDiv>
  );
}

export default ProfileThumbnail;
