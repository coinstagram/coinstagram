import React, { useEffect } from 'react';
import { EachPostState } from '../../type';

// styles
import { StyledArticle } from './FeedStyle';

// components
import FeedHeader from './FeedHeader';
import FeedBody from './FeedBody';
import FeedComment from './FeedComment';
import FeedIcons from './FeedIcons';

interface FeedProps {
  loading: boolean;
  error: null | Error;
  feedPosts: EachPostState[];
  userProfile: null | string;
  userId: null | string;
  getFeedPosts: (user_id: string) => void;
  getCommentsPost: (post_id: number) => void;
  addCommentPost: (post_id: number, comment_text: string) => void;
}

function Feed({
  loading,
  error,
  feedPosts,
  userProfile,
  userId,
  getFeedPosts,
  getCommentsPost,
  addCommentPost,
}: FeedProps) {
  useEffect(() => {
    if (!userId) return;
    getFeedPosts(userId);
  }, [getFeedPosts, userId]);

  return (
    <>
      {feedPosts.length === 0 && loading === false && error === null && (
        <div>팔로우 유저가 없습니다. 지금 바로 팔로우 해보세요!</div>
      )}
      {feedPosts.length === 0 && loading === true && (
        <div>게시물 로딩 중...</div>
      )}
      {feedPosts.length === 0 && error !== null && (
        <div>게시물을 불러오는 데 실패하였습니다.</div>
      )}
      {feedPosts.length !== 0 &&
        feedPosts.map(post => (
          <StyledArticle key={post.id}>
            <h3 className="a11y-hidden">{post.user_id}의 게시물</h3>
            <FeedHeader
              userId={post.user_id}
              postId={post.id}
              location={post.post_location}
              userProfile={userProfile}
            />
            <FeedBody />
            <FeedIcons postId={post.id} />
            <FeedComment
              userId={post.user_id}
              postId={post.id}
              context={post.post_context}
              getCommentsPost={getCommentsPost}
              addCommentPost={addCommentPost}
              postCreatedTime={post.created_at}
            />
          </StyledArticle>
        ))}
    </>
  );
}

export default React.memo(Feed);
