import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import { StyledForm } from './FeedAddCommentStyle';

interface FeedAddCommentProps {
  userId: string;
  postId: number;
  addCommentPost: (post_id: number, comment_text: string, myProfile: string) => void;
}

function FeedAddComment({ userId, postId, addCommentPost }: FeedAddCommentProps) {
  const [comment, setComment] = useState<string>('');
  const { user } = useSelector((state: RootState) => state.userInfo);
  const myProfile = user === null ? '' : user.user_profile;

  return (
    <StyledForm onSubmit={addComment} comment={comment.trim()}>
      <fieldset>
        <legend className="a11y-hidden">Add comment</legend>
        <div>
          <input id={`${userId}-${postId}`} type="text" value={comment} placeholder="댓글 달기..." onChange={changeComment} />
          <label htmlFor={`${userId}-${postId}`}>
            <button disabled={comment.trim() === '' ? true : false}>
              <span tabIndex={-1}>게시</span>
            </button>
          </label>
        </div>
      </fieldset>
    </StyledForm>
  );

  function changeComment(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    setComment(e.target.value);
  }

  function addComment(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault();

    if (comment.trim() === '') return;
    addCommentPost(postId, comment, myProfile);
    setComment('');
  }
}

export default FeedAddComment;
