import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import { StyledSection } from './RecommendMobileStyle';

// components
import Thumbnail from '../common/Thumbnail';
import FollowBtn from './FollowBtn';

interface RecommendMobileProps {
  getRandomUser: () => void;
}

function RecommendMobile({ getRandomUser }: RecommendMobileProps) {
  const { users } = useSelector((state: RootState) => state.userInfo.randomUsers);

  useEffect(() => {
    getRandomUser();
  }, [getRandomUser]);

  return (
    <StyledSection>
      <p>회원님을 위한 추천</p>
      <div>
        <ul>
          {users.map(user => (
            <li key={user.user_id}>
              <button>
                <Thumbnail size={54} imageUrl={user.user_profile} />
                <dt className="a11y-hidden">user id</dt>
                <dd>{user.user_id}</dd>
              </button>
              <FollowBtn userId={user.user_id} userName={user.user_name} userProfile={user.user_profile} />
              <button>
                <span tabIndex={-1}>X</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </StyledSection>
  );
}

export default RecommendMobile;
