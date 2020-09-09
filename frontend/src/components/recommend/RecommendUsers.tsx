import React from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';
import { AnotherUserState, UserState } from '../../type';

// styles
import { StyledSection } from './RecommendUsersStyle';

// components
import RecommendUsersHeader from './RecommendUsersHeader';
import RecommendUsersBody from './RecommendUsersBody';

interface RecommendUsersProps {
  loading: boolean;
  error: null | Error;
  user: null | UserState;
  randomUsers: AnotherUserState[];
  followers: AnotherUserState[];
}

function RecommendUsers({
  loading,
  error,
  user,
  randomUsers,
  followers,
}: RecommendUsersProps) {
  const width = useWindowWidth();

  if (width < 1000) return null;

  return (
    <StyledSection>
      <h3 className="a11y-hidden">추천 계정</h3>
      <RecommendUsersHeader user={user} />
      <RecommendUsersBody
        loading={loading}
        error={error}
        randomUsers={randomUsers}
        followers={followers}
      />
    </StyledSection>
  );
}

export default RecommendUsers;
