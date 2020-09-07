import React from 'react';
import styled from 'styled-components';
import useWindowWidth from '../../hooks/useWindowWidth';
import { AnotherUserState, UserState } from '../../type';

// components
import RecommendUsersHeader from './RecommendUsersHeader';
import RecommendUsersBody from './RecommendUsersBody';

const StyledSection = styled.section`
  box-sizing: border-box;
  position: fixed;
  width: 313px;
`;

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
