import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import { StyledDiv } from './FeedCommentListStyle';

// components
import FeedCommentItem from './FeedCommentItem';

interface FeedCommentListProps {
  postId: number;
  getCommentsPost: (post_id: number) => void;
}

function FeedCommentList({ postId, getCommentsPost }: FeedCommentListProps) {
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
          currentPostMyComments.map(comment => (
            <FeedCommentItem
              key={comment.id}
              commentId={comment.id}
              userId={comment.user_id}
              commentText={comment.comment_text}
            />
          ))}
        {mergedComments.length >= 3 && (
          <>
            {currentPostComments.length >= 3 && (
              <li>
                <button className="comment-more">
                  <span tabIndex={-1}>
                    댓글{currentPostComments.length}개 모두 보기
                  </span>
                </button>
              </li>
            )}
            {currentPostComments[0] && (
              <FeedCommentItem
                key={currentPostComments[0].id}
                commentId={currentPostComments[0].id}
                userId={currentPostComments[0].user_id}
                commentText={currentPostComments[0].comment_text}
              />
            )}
            {currentPostComments[1] && (
              <FeedCommentItem
                key={currentPostComments[1].id}
                commentId={currentPostComments[1].id}
                userId={currentPostComments[1].user_id}
                commentText={currentPostComments[1].comment_text}
              />
            )}
            {currentPostMyComments.map(comment => (
              <FeedCommentItem
                key={comment.id}
                commentId={comment.id}
                userId={comment.user_id}
                commentText={comment.comment_text}
              />
            ))}
          </>
        )}
      </ul>
    </StyledDiv>
  );
}

export default FeedCommentList;
