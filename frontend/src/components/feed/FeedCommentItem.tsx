import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { computePassedTime } from '../feed/FeedComment';

// icons
import { BsHeartFill, BsHeart } from 'react-icons/bs';

// styles
import { StyledLi } from './FeedCommentItemStyle';
import Thumbnail from '../common/Thumbnail';

interface FeedCommentItemProps {
  commentId: number;
  userId: string;
  userProfile: null | string;
  commentText: string;
  createdTime: string;
  viewTime?: boolean;
  thumbnail: boolean;
}

function FeedCommentItem({
  commentId,
  userId,
  userProfile,
  commentText,
  thumbnail,
  viewTime,
  createdTime,
}: FeedCommentItemProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <StyledLi like={liked} thumbnail={thumbnail} viewTime={viewTime}>
      <span className="user-comment">
        <dt className="a11y-hidden">owner id</dt>
        <dd>
          <Link to={`/${userId}`}>
            {thumbnail && <Thumbnail imageUrl={userProfile} size={35} />}
            <span tabIndex={-1}>{userId}</span>
          </Link>
        </dd>
      </span>
      <span>{commentText}</span>
      <time>{computePassedTime(createdTime)}</time>
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
