import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// icons
import { BsHeartFill, BsHeart } from 'react-icons/bs';

// styles
import { StyledLi } from './FeedCommentItemStyle';

interface FeedCommentItemProps {
  commentId: number;
  userId: string;
  commentText: string;
}

function FeedCommentItem({
  commentId,
  userId,
  commentText,
}: FeedCommentItemProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <StyledLi like={liked}>
      <div>
        <dt className="a11y-hidden">owner id</dt>
        <dd>
          <Link to={`/${userId}`}>
            <span tabIndex={-1}>{userId}</span>
          </Link>
        </dd>
      </div>
      <p>{commentText}</p>
      <div className={`like-comment${commentId}`}>
        <button onClick={addLike}>
          <span tabIndex={-1}>{liked ? <BsHeartFill /> : <BsHeart />}</span>
        </button>
      </div>
    </StyledLi>
  );

  function addLike() {
    setLiked(!liked);
  }
}

export default FeedCommentItem;
