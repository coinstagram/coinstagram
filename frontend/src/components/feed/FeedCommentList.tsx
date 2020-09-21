import React from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';
import { Link } from 'react-router-dom';

// styles
import { StyledDiv } from './FeedCommentListStyle';

// components
import FeedCommentItem from './FeedCommentItem';

interface FeedCommentListProps {
  postId: number;
  visual?: boolean;
  viewTime?: boolean;
  thumbnail?: boolean;
}

function FeedCommentList({ postId, visual, viewTime, thumbnail }: FeedCommentListProps) {
  const { postComments, myComments } = useSelector((state: RootState) => state.comments);

  const currentPostComments = postComments.filter(comment => comment.post_id === postId);
  const currentPostMyComments = myComments.filter(comment => comment.post_id === postId);
  const mergedComments = [...currentPostComments, ...currentPostMyComments];

  return (
    <StyledDiv>
      <ul>
        {mergedComments.length < 3 &&
          !visual &&
          mergedComments.map(comment => (
            <FeedCommentItem
              key={comment.id}
              commentId={comment.id}
              userId={comment.user_id}
              userProfile={comment.user_profile}
              commentText={comment.comment_text}
              createdTime={comment.created_at}
              thumbnail={thumbnail}
            />
          ))}
        {mergedComments.length >= 3 && !visual && (
          <>
            {currentPostComments.length >= 3 && (
              <li>
                <Link to={`/post/${postId}`} className="comment-more">
                  <span tabIndex={-1}>댓글 {currentPostComments.length}개 모두 보기</span>
                </Link>
              </li>
            )}
            {currentPostComments[0] && (
              <FeedCommentItem
                key={currentPostComments[0].id}
                commentId={currentPostComments[0].id}
                userId={currentPostComments[0].user_id}
                userProfile={currentPostComments[0].user_profile}
                commentText={currentPostComments[0].comment_text}
                createdTime={currentPostComments[0].created_at}
                thumbnail={thumbnail}
              />
            )}
            {currentPostComments[1] && (
              <FeedCommentItem
                key={currentPostComments[1].id}
                commentId={currentPostComments[1].id}
                userId={currentPostComments[1].user_id}
                userProfile={currentPostComments[1].user_profile}
                commentText={currentPostComments[1].comment_text}
                createdTime={currentPostComments[1].created_at}
                thumbnail={thumbnail}
              />
            )}
            {currentPostMyComments.map(comment => (
              <FeedCommentItem
                key={comment.id}
                commentId={comment.id}
                userId={comment.user_id}
                userProfile={comment.user_profile}
                commentText={comment.comment_text}
                createdTime={comment.created_at}
                thumbnail={thumbnail}
              />
            ))}
          </>
        )}
        {visual &&
          mergedComments.map(comment => (
            <FeedCommentItem
              key={comment.id}
              commentId={comment.id}
              userId={comment.user_id}
              userProfile={comment.user_profile}
              commentText={comment.comment_text}
              createdTime={comment.created_at}
              viewTime={viewTime}
              thumbnail={thumbnail}
            />
          ))}
      </ul>
    </StyledDiv>
  );
}

FeedCommentList.defaultProps = {
  visual: false,
  thumbnail: false,
};

export default FeedCommentList;
