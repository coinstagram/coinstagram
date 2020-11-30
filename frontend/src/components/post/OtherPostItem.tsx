import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RootState from '../../type';

// icons
import { FaComment, FaHeart, FaClone } from 'react-icons/fa';

// styles
import { StyledCountDiv, StyledLi } from './OtherPostItemStyle';
import { followContext } from '../../App';

interface OtherPostItemProps {
  postId: number;
  postOwnerId: string;
  imageThumbnail: string[];
  getPostCounts: (post_id: number) => void;
}

const checkMultArray = (testArray: any) => {
  try {
    testArray.reduce((acc: any, it: any) => [...acc, ...it], []);
    return true;
  } catch (err) {
    return false;
  }
};

function OtherPostItem({ postId, postOwnerId, imageThumbnail, getPostCounts }: OtherPostItemProps) {
  const { counts } = useSelector((state: RootState) => state.otherPosts.counts);
  const { setFollowInfo } = useContext(followContext);
  const thisPostCounts = counts.find(info => info.post_id === postId);
  const likeCounts = thisPostCounts && thisPostCounts.likeCount;
  const commentCounts = thisPostCounts && thisPostCounts.commentCount;

  useEffect(() => {
    getPostCounts(postId);
  }, [getPostCounts, postId]);

  return (
    <StyledLi>
      <Link to={`/post/${postId}`} onClick={() => setFollowInfo(postOwnerId, '', null)}>
        <img
          src={
            checkMultArray(imageThumbnail)
              ? `http://localhost:4000/${imageThumbnail[imageThumbnail.length - 1]}`
              : `http://localhost:4000/${imageThumbnail}`
          }
          alt={`${postOwnerId}님의 게시물-${postId}}`}
        />
        {imageThumbnail.length > 1 && <FaClone />}
        <StyledCountDiv>
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
        </StyledCountDiv>
      </Link>
    </StyledLi>
  );
}

export default OtherPostItem;
