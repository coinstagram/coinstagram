import React from 'react';
import { Link } from 'react-router-dom';
import { computePassedTime } from '../feed/FeedComment';

// styles
import { StyledDiv } from './FeedCommentOwnerStyle';
import Thumbnail from '../common/Thumbnail';

interface FeedComponentOwnerProps {
  userId: string;
  userProfile?: null | string;
  context: string;
  createdTime?: string;
  thumbnail?: boolean;
}

function FeedCommentOwner({ userId, userProfile, context, thumbnail, createdTime }: FeedComponentOwnerProps) {
  return (
    <StyledDiv thumbnail={thumbnail}>
      <span className="owner-comment">
        <dt className="a11y-hidden">post owner id</dt>
        <dd>
          <Link to={`/${userId}`}>
            {thumbnail && <Thumbnail imageUrl={userProfile} size={35} />}
            <span tabIndex={-1}>{userId}</span>
          </Link>
        </dd>
      </span>
      <span className="owner-context">{context}</span>
      <time>{computePassedTime(createdTime)}</time>
    </StyledDiv>
  );
}

FeedCommentOwner.defaultProps = {
  userProfile: null,
  thumbnail: false,
};

export default FeedCommentOwner;
