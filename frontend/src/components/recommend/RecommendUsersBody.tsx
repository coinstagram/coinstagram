import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// components
import RecommendUsersInfo from './RecommendUsersInfo';
import RootState, { AnotherUserState } from '../../type';

const StyledDiv = styled.div`
  p {
    color: rgb(142, 142, 142);
    font-weight: bold;
  }

  div + div {
    margin-top: 10px;
  }
`;

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
  const myId = useSelector((state: RootState) => state.userInfo.user?.user_id);
  const filteredUsers = randomUsers.filter(
    randomUser => randomUser.user_id !== myId,
  );

  return (
    <StyledDiv>
      <p>회원님을 위한 추천</p>
      {loading && <p>사용자 정보를 가져오는 중 입니다...</p>}
      {!loading && filteredUsers.length === 0 && <p>추천 유저가 없습니다.</p>}
      {filteredUsers.map(user => (
        <RecommendUsersInfo
          key={user.user_id}
          size={42}
          isAnother={true}
          userId={user.user_id}
          userName={user.user_name}
          userProfile={user.user_profile}
          followers={followers}
        />
      ))}
    </StyledDiv>
  );
}

export default React.memo(RecommendUsersBody);
