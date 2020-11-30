import React from 'react';

// styles
import { StyledDiv } from './RecommendUsersBodyStyle';

// components
import RecommendUsersInfo from './RecommendUsersInfo';
import { AnotherUserState } from '../../type';

interface RecommendUsersBodyProps {
  loading: boolean;
  error: null | Error;
  randomUsers: AnotherUserState[];
  followers: AnotherUserState[];
}

function RecommendUsersBody({
  loading,
  error,
  randomUsers,
  followers,
}: RecommendUsersBodyProps) {
  return (
    <StyledDiv>
      <p>회원님을 위한 추천</p>
      {loading && <p>사용자 정보를 가져오는 중 입니다...</p>}
      {!loading && error === null && randomUsers.length === 0 && (
        <p>추천 유저가 없습니다.</p>
      )}
      {error !== null && randomUsers.length === 0 && (
        <p>유저 정보를 가져오는데 실패하였습니다.</p>
      )}
      {randomUsers.map(user => (
        <RecommendUsersInfo
          key={user.user_id}
          size={42}
          isAnother={true}
          userId={user.user_id}
          userName={user.user_name}
          userProfile={user.user_profile}
          followers={followers}
          isRecommend={true}
        />
      ))}
    </StyledDiv>
  );
}

export default React.memo(RecommendUsersBody);
