import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import { StyledDiv } from './FeedCommentListStyle';

// components
import FeedCommentItem from './FeedCommentItem';

interface FeedCommentListProps {
  userId: null | string;
  context: null | string;
  postId: number;
  getCommentsPost: (post_id: number) => void;
}

function FeedCommentList({
  userId,
  postId,
  context,
  getCommentsPost,
}: FeedCommentListProps) {
  const { postComments } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    getCommentsPost(postId);
  }, [getCommentsPost, postId]);

  return (
    <StyledDiv>
      <ul>
        {postComments.map(
          comment =>
            comment.post_id === +postId && (
              <FeedCommentItem
                key={comment.id}
                commentId={comment.id}
                userId={comment.user_id}
                commentText={comment.comment_text}
              />
            ),
        )}
      </ul>
    </StyledDiv>
  );
}

export default FeedCommentList;
