import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import { StyledContainer, StyledDiv } from './FeedCommentStyle';

interface FeedCommentProps {
  userId: null | string;
  context: null | string;
  postId: number;
}

function FeedComment({ userId, context, postId }: FeedCommentProps) {
  const [comment, setComment] = useState<string>('');

  return (
    <StyledContainer comment={comment}>
      <StyledDiv>
        <div>
          <dt className="a11y-hidden">post owner id</dt>
          <dd>
            <Link to={`/${userId}`}>
              <span tabIndex={-1}>{userId}</span>
            </Link>
          </dd>
        </div>
        <p>{context}</p>
      </StyledDiv>
      <form onClick={addComment}>
        <fieldset>
          <legend className="a11y-hidden">Add comment</legend>
          <div>
            <input
              id={`${userId}-${postId}`}
              type="text"
              value={comment}
              placeholder="댓글 달기..."
              onChange={changeComment}
            />
            <label htmlFor={`${userId}-${postId}`}>
              <button disabled={comment === '' ? true : false}>
                <span tabIndex={-1}>게시</span>
              </button>
            </label>
          </div>
        </fieldset>
      </form>
    </StyledContainer>
  );

  function changeComment(e: React.ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value);
    e.stopPropagation();
  }

  function addComment(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    // e.preventDefault();
  }
}

export default FeedComment;
