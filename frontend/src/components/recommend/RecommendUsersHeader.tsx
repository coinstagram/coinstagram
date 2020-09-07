import React from 'react';
import styled from 'styled-components';
import { UserState } from '../../type';

// components
import RecommendUsersInfo from './RecommendUsersInfo';

const StyledDiv = styled.div`
  margin: 20px 0;
`;

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
