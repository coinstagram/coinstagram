import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import { StyledNocontentDiv, StyledSpinnerDiv } from './ProfilePostsStyle';
import { StyledErrorDiv } from '../explore/RandomPostsStyle';

// components
import OtherPostItem from '../post/OtherPostItem';
import Spinner from '../common/Spinner';

interface ProfilePostsBookmarkedProps {
  getPostCounts: (post_id: number) => void;
  getBookmarkPosts: (post_id: number) => void;
  bookmarkedId: number[];
}

function ProfilePostsBookmarked({ getPostCounts, getBookmarkPosts, bookmarkedId }: ProfilePostsBookmarkedProps) {
  const { loading, error, bookmarkPosts } = useSelector((state: RootState) => state.bookmarks.bookmarkPosts);

  useEffect(() => {
    bookmarkedId.forEach(id => getBookmarkPosts(id));
  }, [getBookmarkPosts, bookmarkedId]);

  return (
    <>
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
              😅
            </span>{' '}
            <br />
            페이지 새로고침 후 다시 실행해 주시기바랍니다.
          </p>
        </StyledErrorDiv>
      )}
      {loading && bookmarkPosts.length === 0 && (
        <StyledNocontentDiv>
          아직 찜한 게시물이 없어요{' '}
          <span aria-label="아쉬운 표정" role="img">
            😊
          </span>
        </StyledNocontentDiv>
      )}
      <ul>
        {bookmarkPosts.map(post => (
          <OtherPostItem key={post.id} postId={post.id} postOwnerId={post.user_id} getPostCounts={getPostCounts} imageThumbnail={post.image_path} />
        ))}
      </ul>
    </>
  );
}

export default ProfilePostsBookmarked;
