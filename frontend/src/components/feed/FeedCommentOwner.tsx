import React from 'react';
import { Link } from 'react-router-dom';

// styles
import { StyledDiv } from './FeedCommentOwnerStyle';

interface FeedComponentOwnerProps {
  userId: string;
  context: string;
}

function FeedCommentOwner({ userId, context }: FeedComponentOwnerProps) {
  return (
    <StyledDiv>
      <div>
        <dt className="a11y-hidden">post owner id</dt>
        <dd>
          <Link to={`/${userId}`}>
            <span tabIndex={-1}>{userId}</span>
          </Link>
        </dd>
      </div>
      <p>{context}</p>
    </StyledDiv>
  );
}

export default FeedCommentOwner;
