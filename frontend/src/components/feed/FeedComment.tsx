import React from 'react';
import { Link } from 'react-router-dom';

// styles
import { StyledContainer, StyledDiv } from './FeedCommentStyle';

interface FeedCommentProps {
  userId: null | string;
  context: null | string;
  postId: number;
}

function FeedComment({ userId, context, postId }: FeedCommentProps) {
  return (
    <StyledContainer>
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
              placeholder="댓글 달기..."
            />
            <label htmlFor={`${userId}-${postId}`}>
              <button>
                <span tabIndex={-1}>게시</span>
              </button>
            </label>
          </div>
        </fieldset>
      </form>
    </StyledContainer>
  );

  function addComment(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault();
  }
}

export default FeedComment;
