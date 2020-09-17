import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RootState from '../../type';

// icons
import { FaComment, FaHeart } from 'react-icons/fa';

// styles
import { StyledLi, StyledDiv } from './OtherPostItemStyle';

interface OtherPostItemProps {
  postId: number;
  postOwnerId: string;
  imageThumbnail: string[];
  getPostCounts: (post_id: number) => void;
}

function OtherPostItem({
  postId,
  postOwnerId,
  imageThumbnail,
  getPostCounts,
}: OtherPostItemProps) {
  const { counts } = useSelector((state: RootState) => state.otherPosts.counts);

  const thisPostCounts = counts.find(info => info.post_id === postId);
  const likeCounts = thisPostCounts && thisPostCounts.likeCount;
  const commentCounts = thisPostCounts && thisPostCounts.commentCount;

  useEffect(() => {
    getPostCounts(postId);
  }, [getPostCounts, postId]);

  return (
    <StyledLi>
      <Link to={`/post/${postId}`}>
        <img
          src={`http://localhost:4000/${imageThumbnail[0]}`}
          alt={`${postOwnerId}님의 게시물-${postId}}`}
        />
        <StyledDiv>
          <div>
            <dt className="a11y-hidden">like count</dt>
            <dd>
              <FaHeart />
              <span>{likeCounts}</span>
            </dd>
          </div>
          <div>
            <dt className="a11y-hidden">comment count</dt>
            <dd>
              <FaComment />
              <span>{commentCounts}</span>
            </dd>
          </div>
        </StyledDiv>
      </Link>
    </StyledLi>
  );
}

export default OtherPostItem;
