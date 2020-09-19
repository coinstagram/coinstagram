import React, { useEffect, useRef } from 'react';
import { EachPostState } from '../../type';
import { Link } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledArticle, StyledPreviewDiv, StyledSpinnerDiv, StyledDiv } from './FeedStyle';

// icons
import { BsPlusCircle } from 'react-icons/bs';

// components
import FeedHeader from './FeedHeader';
import FeedBody from './FeedBody';
import FeedComment from './FeedComment';
import FeedIcons from './FeedIcons';
import Spinner from '../common/Spinner';

interface FeedProps {
  loading: boolean;
  error: null | Error;
  myId: null | string;
  feedPosts: EachPostState[];
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
  loading,
  error,
  myId,
  feedPosts,
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
  const width = useWindowWidth();
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
    <StyledDiv>
      {feedPosts.length === 0 && !loading && error === null && (
        <StyledPreviewDiv>
          <div>
            <p>지금 당신의 추억을 공유해 보세요</p>
            <Link to="/upload">
              <BsPlusCircle />
            </Link>
          </div>
        </StyledPreviewDiv>
      )}
      {loading && (
        <StyledSpinnerDiv>
          <Spinner />
        </StyledSpinnerDiv>
      )}
      {feedPosts.length !== 0 &&
        feedPosts.map(post => (
          <StyledArticle key={post.id} width={width} onFocus={toggleClass} onBlur={toggleClass}>
            <h3 className="a11y-hidden">{post.user_id}의 게시물</h3>
            <FeedHeader userId={post.user_id} postId={post.id} location={post.post_location} />
            <FeedBody imageUrl={post.image_path} />
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
    </StyledDiv>
  );

  function toggleClass(e: React.FocusEvent<HTMLElement>) {
    (e.currentTarget as Element).classList.toggle('selected');
  }
}

export default React.memo(Feed);
