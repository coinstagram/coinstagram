import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import RootState from '../../type';
import useWindowWidth from '../../hooks/useWindowWidth';

// icons
import { BsCardImage, BsTag, BsBookmarks } from 'react-icons/bs';

// styles
import { StyledSection, StyledNavDiv, StyledSpinnerDiv, StyledReadyDiv, StyledNocontentDiv } from './ProfilePostsStyle';
import { StyledDiv } from '../post/OtherPostListStyle';
import { StyledErrorDiv } from '../explore/RandomPostsStyle';

// components
import OtherPostItem from '../post/OtherPostItem';
import Spinner from '../common/Spinner';

interface ProfilePostsProps {
  profileId: string;
  myId: string;
  bookmarkedId: number[];
  getBookmarkPosts: (post_id: number) => void;
  getPostCounts: (post_id: number) => void;
}

function ProfilePosts({ profileId, myId, bookmarkedId, getPostCounts, getBookmarkPosts }: ProfilePostsProps) {
  const pageName = useLocation().pathname.split('/')[3];
  const { loading, error, otherPosts } = useSelector((state: RootState) => state.otherPosts);
  const { bookmarkPosts } = useSelector((state: RootState) => state.bookmarks);
  const bookmarkLoading = bookmarkPosts.loading;
  const bookmarkError = bookmarkPosts.error;
  const bookmarkedPosts = bookmarkPosts.bookmarkPosts;
  const width = useWindowWidth();

  useEffect(() => {
    if (profileId !== myId) return;
    if (bookmarkedId.length === 0) return;

    bookmarkedId.forEach(id => getBookmarkPosts(id));
  }, [getBookmarkPosts, bookmarkedId, myId, profileId]);

  return (
    <StyledSection width={width}>
      <StyledNavDiv width={width}>
        <ul>
          <li>
            <NavLink to={`/account/${profileId}`} exact>
              {width < 750 ? <BsCardImage /> : '게시물'}
            </NavLink>
          </li>
          {profileId === myId && (
            <li>
              <NavLink to={`/account/${profileId}/saved`}>{width < 750 ? <BsBookmarks /> : '저장됨'}</NavLink>
            </li>
          )}
          <li>
            <NavLink to={`/account/${profileId}/tagged`}>{width < 750 ? <BsTag /> : '태그됨'}</NavLink>
          </li>
        </ul>
      </StyledNavDiv>
      <StyledDiv width={width}>
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
        {pageName === undefined && !loading && otherPosts.length === 0 && (
          <StyledNocontentDiv>
            아직 업로드하신 게시물이 없어요{' '}
            <span aria-label="아쉬운 표정" role="img">
              😂
            </span>
          </StyledNocontentDiv>
        )}
        {pageName === undefined && (
          <ul>
            {otherPosts.map(post => (
              <OtherPostItem
                key={post.id}
                postId={post.id}
                postOwnerId={post.user_id}
                getPostCounts={getPostCounts}
                imageThumbnail={post.image_path}
              />
            ))}
          </ul>
        )}
        {bookmarkLoading && (
          <StyledSpinnerDiv>
            <Spinner />
          </StyledSpinnerDiv>
        )}
        {bookmarkError !== null && (
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
        {pageName === 'saved' && !bookmarkLoading && bookmarkedPosts.length === 0 && (
          <StyledNocontentDiv>
            아직 찜한 게시물이 없어요{' '}
            <span aria-label="아쉬운 표정" role="img">
              😊
            </span>
          </StyledNocontentDiv>
        )}
        {pageName === 'saved' && (
          <ul>
            {bookmarkedPosts.map(post => (
              <OtherPostItem
                key={post.id}
                postId={post.id}
                postOwnerId={post.user_id}
                getPostCounts={getPostCounts}
                imageThumbnail={post.image_path}
              />
            ))}
          </ul>
        )}
        {pageName === 'tagged' && <StyledReadyDiv />}
      </StyledDiv>
    </StyledSection>
  );
}

export default ProfilePosts;
