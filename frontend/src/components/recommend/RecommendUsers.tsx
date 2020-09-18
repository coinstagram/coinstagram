import React, { useEffect } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';
import RootState, { AnotherUserState, UserState } from '../../type';
import { useSelector } from 'react-redux';

// styles
import { StyledSection } from './RecommendUsersStyle';

// components
import RecommendUsersHeader from './RecommendUsersHeader';
import RecommendUsersBody from './RecommendUsersBody';

interface RecommendUsersProps {
  user: null | UserState;
  followers: AnotherUserState[];
  getRandomUser: () => void;
}

function RecommendUsers({
  user,
  followers,
  getRandomUser,
}: RecommendUsersProps) {
  const { loading, error, users } = useSelector(
    (state: RootState) => state.userInfo.randomUsers,
  );
  const width = useWindowWidth();

  useEffect(() => {
    getRandomUser();
  }, [getRandomUser]);

  if (width < 1000) return null;

  return (
    <StyledSection>
      <h3 className="a11y-hidden">추천 계정</h3>
      <RecommendUsersHeader user={user} />
      <RecommendUsersBody
        loading={loading}
        error={error}
        randomUsers={users}
        followers={followers}
      />
    </StyledSection>
  );
}

export default RecommendUsers;
