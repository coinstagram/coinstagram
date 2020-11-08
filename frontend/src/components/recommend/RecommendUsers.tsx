import React, { useEffect } from 'react';
import RootState, { AnotherUserState, UserState } from '../../type';
import { useSelector } from 'react-redux';

// styles
import { StyledSection } from './RecommendUsersStyle';

// components
import RecommendUsersHeader from './RecommendUsersHeader';
import RecommendUsersBody from './RecommendUsersBody';
import Footer from './Footer';

interface RecommendUsersProps {
  user: null | UserState;
  followers: AnotherUserState[];
  getRandomUser: () => void;
}

function RecommendUsers({ user, followers, getRandomUser }: RecommendUsersProps) {
  const { loading, error, users } = useSelector((state: RootState) => state.userInfo.randomUsers);

  useEffect(() => {
    getRandomUser();
  }, [getRandomUser]);

  return (
    <StyledSection>
      <h2 className="a11y-hidden">추천 계정</h2>
      <RecommendUsersHeader user={user} />
      <RecommendUsersBody loading={loading} error={error} randomUsers={users} followers={followers} />
      <Footer />
    </StyledSection>
  );
}

export default RecommendUsers;
