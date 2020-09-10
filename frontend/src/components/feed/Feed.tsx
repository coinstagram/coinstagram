import React, { useEffect } from 'react';
import RootState, { EachPostState } from '../../type';

// styles
import { StyledArticle } from './FeedStyle';

// components
import FeedHeader from './FeedHeader';
import FeedBody from './FeedBody';
import FeedComment from './FeedComment';
import FeedIcons from './FeedIcons';
import { useSelector } from 'react-redux';

interface FeedProps {
  loading: boolean;
  error: null | Error;
  feedPosts: EachPostState[];
  userProfile: null | string;
  getFeedPosts: (user_id: string) => void;
  getCommentsPost: (post_id: number) => void;
}

function Feed({
  loading,
  error,
  feedPosts,
  userProfile,
  getFeedPosts,
  getCommentsPost,
}: FeedProps) {
  const { user } = useSelector((state: RootState) => state.userInfo);
  const user_id = user && user.user_id;

  useEffect(() => {
    if (!user_id) return;
    getFeedPosts(user_id);
  }, [getFeedPosts, user_id]);

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
              postId={+post.id}
              location={post.post_location}
              userProfile={userProfile}
            />
            <FeedBody />
            <FeedIcons />
            <FeedComment
              userId={post.user_id}
              postId={+post.id}
              context={post.post_context}
              getCommentsPost={getCommentsPost}
              postCreatedTime={post.created_at}
            />
          </StyledArticle>
        ))}
    </>
  );
}

export default React.memo(Feed);
