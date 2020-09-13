import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import { StyledDiv } from './FeedCommentListStyle';

// components
import FeedCommentItem from './FeedCommentItem';

interface FeedCommentListProps {
  postId: number;
  visual?: boolean;
  getCommentsPost: (post_id: number) => void;
  viewTime?: boolean;
  thumbnail?: boolean;
}

function FeedCommentList({
  postId,
  visual,
  getCommentsPost,
  viewTime,
  thumbnail,
}: FeedCommentListProps) {
  const { postComments, myComments } = useSelector(
    (state: RootState) => state.comments,
  );

  useEffect(() => {
    getCommentsPost(postId);
  }, [getCommentsPost, postId]);

  const currentPostComments = postComments.filter(
    comment => comment.post_id === postId,
  );
  const currentPostMyComments = myComments.filter(
    comment => comment.post_id === postId,
  );
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
              userProfile={null}
              commentText={comment.comment_text}
              createdTime={comment.created_at}
              thumbnail={thumbnail}
            />
          ))}
        {mergedComments.length >= 3 && !visual && (
          <>
            {currentPostComments.length >= 3 && (
              <li>
                <button className="comment-more">
                  <span tabIndex={-1}>
                    댓글 {currentPostComments.length}개 모두 보기
                  </span>
                </button>
              </li>
            )}
            {currentPostComments[0] && (
              <FeedCommentItem
                key={currentPostComments[0].id}
                commentId={currentPostComments[0].id}
                userId={currentPostComments[0].user_id}
                userProfile={null}
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
                userProfile={null}
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
                userProfile={null}
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
              userProfile={null}
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
