import React from 'react';
import { computePassedTime } from '../feed/FeedComment';

// styles
import { StyledPassedTimeDiv } from '../feed/FeedCommentStyle';

// components
import FeedBody from '../feed/FeedBody';
import FeedHeader from '../feed/FeedHeader';
import FeedIcons from '../feed/FeedIcons';
import FeedCommentOwner from '../feed/FeedCommentOwner';
import FeedCommentList from '../feed/FeedCommentList';
import FeedAddComment from '../feed/FeedAddComment';

function UserPosts() {
  return (
    <article>
      {/* <div>
        <FeedBody />
      </div>
      <div>
        <FeedHeader
          userId={post.user_id}
          postId={post.id}
          location={post.post_location}
          userProfile={userProfile}
        />
        <FeedCommentOwner userId={userId} context={context} />
        <FeedCommentList postId={postId} getCommentsPost={getCommentsPost} />
        <FeedIcons postId={post.id} />
        <StyledPassedTimeDiv className={`${postId}-createdTime`}>
          {computePassedTime(postCreatedTime)}
        </StyledPassedTimeDiv>
        <FeedAddComment
          userId={userId}
          postId={postId}
          addCommentPost={addCommentPost}
        />
      </div> */}
    </article>
  );
}

export default UserPosts;
