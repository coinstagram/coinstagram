import React from 'react';
import { UserState } from '../../type';

// styles
import { StyledDiv } from './RecommendUsersHeaderStyle';

// components
import RecommendUsersInfo from './RecommendUsersInfo';

interface RecommendUsersHeaderProps {
  user: UserState | null;
}

function RecommendUsersHeader({ user }: RecommendUsersHeaderProps) {
  return (
    <StyledDiv>
      <RecommendUsersInfo
        size={56}
        userId={user && user.user_id}
        userName={user && user.user_name}
        userProfile={user && user.user_profile}
      />
    </StyledDiv>
  );
}

export default React.memo(RecommendUsersHeader);
