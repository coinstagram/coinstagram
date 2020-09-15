import React, { useEffect, useRef } from 'react';
import { EachPostState } from '../../type';

// styles
import { StyledArticle } from './FeedStyle';

// components
import FeedHeader from './FeedHeader';
import FeedBody from './FeedBody';
import FeedComment from './FeedComment';
import FeedIcons from './FeedIcons';

interface FeedProps {
  feedPosts: EachPostState[];
  myId: null | string;
  getFeedPosts: (user_id: string) => void;
  getCommentsPost: (post_id: number) => void;
  addCommentPost: (post_id: number, comment_text: string) => void;
  getPostLikes: (post_id: number) => void;
  addPostLikes: (post_id: number) => void;
  deletePostLike: (post_id: number) => void;
  getBookmarks: (user_id: string) => void;
  addBookmark: (post_id: number) => void;
  deleteBookmark: (post_id: number) => void;
}

function Feed({
  feedPosts,
  myId,
  getFeedPosts,
  getCommentsPost,
  addCommentPost,
  getPostLikes,
  addPostLikes,
  deletePostLike,
  getBookmarks,
  addBookmark,
  deleteBookmark,
}: FeedProps) {
  const lastItemRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!myId) return;
    getFeedPosts(myId);
  }, [getFeedPosts, myId]);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // getFeedPosts(userId);
            }
          });
        },
        {
          threshold: 0.9,
        },
      );
    }

    lastItemRef.current && observerRef.current.observe(lastItemRef.current);
  }, [getFeedPosts, myId]);

  return (
    <>
      {feedPosts.length !== 0 &&
        feedPosts.map(post => (
          <StyledArticle key={post.id}>
            <h3 className="a11y-hidden">{post.user_id}의 게시물</h3>
            <FeedHeader
              userId={post.user_id}
              postId={post.id}
              location={post.post_location}
            />
            <FeedBody />
            <FeedIcons
              myId={myId}
              postId={post.id}
              getPostLikes={getPostLikes}
              addPostLikes={addPostLikes}
              deletePostLike={deletePostLike}
              getBookmarks={getBookmarks}
              addBookmark={addBookmark}
              deleteBookmark={deleteBookmark}
            />
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
      <div ref={lastItemRef}></div>
    </>
  );
}

export default React.memo(Feed);
