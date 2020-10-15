import React, { useEffect, useRef } from 'react';
import RootState, { EachPostState } from '../../type';
import { Link } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';
import { useSelector } from 'react-redux';

// styles
import { StyledArticle, StyledPreviewDiv, StyledSpinnerDiv, StyledDiv, StyledPostDiv, StyledCommentDiv } from './FeedStyle';
import { StyledErrorDiv } from '../explore/RandomPostsStyle';

// icons
import { BsPlusCircle } from 'react-icons/bs';

// components
import FeedHeader from './FeedHeader';
import FeedBody from './FeedBody';
import FeedComment from './FeedComment';
import FeedIcons from './FeedIcons';
import Spinner from '../common/Spinner';
import useObserver from '../../hooks/useObserver';

interface FeedProps {
  loading: boolean;
  error: null | Error;
  myId: null | string;
  feedPosts: EachPostState[];
  addCommentPost: (post_id: number, comment_text: string, myProfile: string) => void;
  addPostLikes: (post_id: number) => void;
  deletePostLike: (post_id: number) => void;
  addBookmark: (post_id: number) => void;
  deleteBookmark: (post_id: number) => void;
}

function Feed({ loading, error, myId, feedPosts, addCommentPost, addPostLikes, deletePostLike, addBookmark, deleteBookmark }: FeedProps) {
  const { randomPosts } = useSelector((state: RootState) => state.posts.randomPosts);
  const width = useWindowWidth();
  const observerObj = useObserver();

  const filteredNinePosts = randomPosts.filter((_, i) => i < 9);

  return (
    <StyledDiv>
      {feedPosts.length === 0 && !loading && error === null && (
        <StyledPreviewDiv>
          {filteredNinePosts.map(post => (
            <StyledPostDiv key={post.id} image={post.image_path} />
          ))}
          <StyledCommentDiv>
            <p>지금 당신의 추억을 공유해 보세요</p>
            <Link to="/upload">
              <BsPlusCircle />
            </Link>
          </StyledCommentDiv>
        </StyledPreviewDiv>
      )}
      {loading && (
        <StyledSpinnerDiv>
          <Spinner />
        </StyledSpinnerDiv>
      )}
      {error !== null && (
        <StyledErrorDiv>
          <p>
            게시물 로딩에 실패하였습니다.{' '}
            <span aria-label="아쉬운 표정" role="img">
              😥
            </span>{' '}
            <br />
            페이지 새로고침 후 다시 실행해 주시기바랍니다.
          </p>
        </StyledErrorDiv>
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
              addPostLikes={addPostLikes}
              deletePostLike={deletePostLike}
              addBookmark={addBookmark}
              deleteBookmark={deleteBookmark}
            />
            <FeedComment
              userId={post.user_id}
              postId={post.id}
              context={post.post_context}
              hashTags={post.hastag}
              addCommentPost={addCommentPost}
              postCreatedTime={post.created_at}
            />
          </StyledArticle>
        ))}
      <div ref={observerObj.lastItemRef}></div>
    </StyledDiv>
  );

  function toggleClass(e: React.FocusEvent<HTMLElement>) {
    (e.currentTarget as Element).classList.toggle('selected');
  }
}

export default React.memo(Feed);
