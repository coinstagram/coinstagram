import React from 'react';
import { Link } from 'react-router-dom';
import { computePassedTime } from '../feed/FeedComment';

// styles
import { StyledDiv, StyledTagDiv, StyledEmptyDiv } from './FeedCommentOwnerStyle';
import Thumbnail from '../common/Thumbnail';

interface FeedComponentOwnerProps {
  userId: string;
  userProfile?: null | string;
  context: string;
  hashTags?: string[];
  createdTime?: string;
  thumbnail?: boolean;
}

function FeedCommentOwner({ userId, userProfile, context, hashTags, thumbnail, createdTime }: FeedComponentOwnerProps) {
  return (
    <StyledDiv thumbnail={thumbnail}>
      <span className="owner-comment">
        <dt className="a11y-hidden">post owner id</dt>
        <dd>
          <Link to={`/account/${userId}`}>
            {thumbnail && <Thumbnail imageUrl={userProfile} size={35} />}
            <span tabIndex={-1}>{userId}</span>
          </Link>
        </dd>
      </span>
      <span className="owner-context">{context}</span>
      <StyledTagDiv>
        {hashTags.length !== 0 &&
          hashTags.map(tag => (
            <Link to={`/explore/tags/${tag.slice(1)}`} key={tag}>
              {tag}
            </Link>
          ))}
        {hashTags.length === 0 && <StyledEmptyDiv />}
      </StyledTagDiv>
      {createdTime && <time>{computePassedTime(createdTime)}</time>}
    </StyledDiv>
  );
}

FeedCommentOwner.defaultProps = {
  userProfile: null,
  thumbnail: false,
  hashTags: [],
};

export default FeedCommentOwner;
