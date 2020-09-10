import React, { useState } from 'react';

// styles
import { StyledForm } from './FeedAddCommentStyle';

interface FeedAddCommentProps {
  userId: string;
  postId: number;
}

function FeedAddComment({ userId, postId }: FeedAddCommentProps) {
  const [comment, setComment] = useState<string>('');

  return (
    <StyledForm onClick={addComment} comment={comment}>
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
    </StyledForm>
  );

  function changeComment(e: React.ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value);
    e.stopPropagation();
  }

  function addComment(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    // e.preventDefault();
  }
}

export default FeedAddComment;
