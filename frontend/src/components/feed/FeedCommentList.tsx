import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';
import { Link } from 'react-router-dom';

// styles
import { StyledDiv } from './FeedCommentListStyle';

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
              <li key={comment.id}>
                <div>
                  <dt className="a11y-hidden">comment owner id</dt>
                  <dd>
                    <Link to={`/${comment.user_id}`}>
                      <span tabIndex={-1}>{comment.user_id}</span>
                    </Link>
                  </dd>
                </div>
                <p>{comment.comment_text}</p>
              </li>
            ),
        )}
      </ul>
    </StyledDiv>
  );
}

export default FeedCommentList;
