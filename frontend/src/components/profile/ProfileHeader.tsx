import React from 'react';

// styles
import { StyledSection } from './ProfileHeaderStyle';

// components
import Thumbnail from '../common/Thumbnail';

function ProfileHeader() {
  return (
    <StyledSection>
      <div className="thumbnail-container">
        <Thumbnail size={150} imageUrl={null} />
      </div>
      <div>asdfsadf</div>
    </StyledSection>
  );
}

export default ProfileHeader;
