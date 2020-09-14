import React from 'react';

// styles
import { StyledContainer, StyledPassedTimeDiv } from './FeedCommentStyle';

// components
import FeedCommentList from './FeedCommentList';
import FeedAddComment from './FeedAddComment';
import FeedCommentOwner from './FeedCommentOwner';

interface FeedCommentProps {
  userId: null | string;
  context: null | string;
  postId: number;
  getCommentsPost: (post_id: number) => void;
  addCommentPost: (post_id: number, comment_text: string) => void;
  postCreatedTime: string;
}

function FeedComment({
  userId,
  context,
  postId,
  getCommentsPost,
  addCommentPost,
  postCreatedTime,
}: FeedCommentProps) {
  return (
    <>
      <StyledContainer>
        <FeedCommentOwner userId={userId} context={context} />
        <FeedCommentList postId={postId} getCommentsPost={getCommentsPost} />
        <StyledPassedTimeDiv className={`${postId}-createdTime`}>
          {computePassedTime(postCreatedTime)}
        </StyledPassedTimeDiv>
      </StyledContainer>
      <FeedAddComment
        userId={userId}
        postId={postId}
        addCommentPost={addCommentPost}
      />
    </>
  );
}

export function computePassedTime(time: null | string) {
  if (!time) return;
  const date = time.split('T')[0].split('-');
  const times = time.split('T')[1].split(':');
  const now = new Date();

  const createdYear = +date[0];
  const createdMonth = +date[1];
  const createdDate = +date[2];
  const createdHour = +times[0];
  const createdMinute = +times[1];
  const createdSeconds = +times[2].split('.')[0];

  const currentYear = now.getUTCFullYear();
  const currentMonth = now.getUTCMonth() + 1;
  const currentDate = now.getUTCDate();
  const currentHour = now.getUTCHours();
  const currentMinute = now.getUTCMinutes();
  const currentSeconds = now.getUTCSeconds();

  const createdTime = Date.UTC(
    createdYear,
    createdMonth,
    createdDate,
    createdHour,
    createdMinute,
    createdSeconds,
  );

  const currentTime = Date.UTC(
    currentYear,
    currentMonth,
    currentDate,
    currentHour,
    currentMinute,
    currentSeconds,
  );
  const passedTime = currentTime - createdTime;

  if (passedTime / 1000 < 60) return `${Math.floor(passedTime / 1000)}초 전`;
  if (passedTime / 1000 < 60 * 60)
    return `${Math.floor(passedTime / (1000 * 60))}분 전`;
  if (passedTime / 1000 < 60 * 60 * 24)
    return `${Math.floor(passedTime / (1000 * 60 * 60))}시간 전`;
  if (passedTime / 1000 < 60 * 60 * 24 * 30)
    return `${Math.floor(passedTime / (1000 * 60 * 60 * 24))}일 전`;
  if (passedTime / 1000 < 60 * 60 * 24 * 30 * 12)
    return `${Math.floor(passedTime / (1000 * 60 * 60 * 24 * 30))}달 전`;
  if (passedTime / 100 >= 60 * 60 * 24 * 30 * 12)
    return `${Math.floor(passedTime / (1000 * 60 * 60 * 24 * 30 * 12))}년 전`;
}

export default FeedComment;
