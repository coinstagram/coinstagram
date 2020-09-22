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
  const { feedPostComments, selectedPostComments, myComments } = useSelector((state: RootState) => state.comments);

  const currentSelectedComments = selectedPostComments.comments;
  const currentFeedPostComments = feedPostComments.comments.filter(comment => comment.post_id === postId);
  const currentPostMyComments = myComments.filter(comment => comment.post_id === postId);
  const comments = currentFeedPostComments.length === 0 ? currentSelectedComments : currentFeedPostComments;
  const mergedComments = [...comments, ...currentPostMyComments];

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
            {comments.length >= 3 && (
              <li>
                <Link to={`/post/${postId}`} className="comment-more">
                  <span tabIndex={-1}>댓글 {comments.length}개 모두 보기</span>
                </Link>
              </li>
            )}
            {comments[0] && (
              <FeedCommentItem
                key={comments[0].id}
                commentId={comments[0].id}
                userId={comments[0].user_id}
                userProfile={comments[0].user_profile}
                commentText={comments[0].comment_text}
                createdTime={comments[0].created_at}
                thumbnail={thumbnail}
              />
            )}
            {comments[1] && (
              <FeedCommentItem
                key={comments[1].id}
                commentId={comments[1].id}
                userId={comments[1].user_id}
                userProfile={comments[1].user_profile}
                commentText={comments[1].comment_text}
                createdTime={comments[1].created_at}
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
