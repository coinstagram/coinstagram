import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import RootState from '../../type';
import useWindowWidth from '../../hooks/useWindowWidth';

// icons
import { BsCardImage, BsTag, BsBookmarks } from 'react-icons/bs';

// styles
import { StyledSection } from './ProfilePostsStyle';

// components
import OtherPostItem from '../post/OtherPostItem';

interface ProfilePostsProps {
  profileId: string;
  myId: string;
  bookmarkedId: number[];
  getBookmarkPosts: (post_id: number) => void;
  getPostCounts: (post_id: number) => void;
}

function ProfilePosts({
  profileId,
  myId,
  bookmarkedId,
  getPostCounts,
  getBookmarkPosts,
}: ProfilePostsProps) {
  const pageName = useLocation().pathname.split('/')[3];
  const { otherPosts } = useSelector((state: RootState) => state.otherPosts);
  const { bookmarkPosts } = useSelector(
    (state: RootState) => state.bookmarks.bookmarkPosts,
  );
  const width = useWindowWidth();

  useEffect(() => {
    if (profileId !== myId) return;
    if (bookmarkedId.length === 0) return;

    bookmarkedId.forEach(id => getBookmarkPosts(id));
  }, [getBookmarkPosts, bookmarkedId, myId, profileId]);

  return (
    <StyledSection width={width}>
      <div>
        <ul>
          <li>
            <NavLink to={`/account/${profileId}`} exact>
              {width < 750 ? <BsCardImage /> : '게시물'}
            </NavLink>
          </li>
          {profileId === myId && (
            <li>
              <NavLink to={`/account/${profileId}/saved`}>
                {width < 750 ? <BsBookmarks /> : '저장됨'}
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to={`/account/${profileId}/tagged`}>
              {width < 750 ? <BsTag /> : '태그됨'}
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        {pageName === undefined && otherPosts.length === 0 && (
          <div>@{profileId}님이 업로드하신 게시물이 없습니다.</div>
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
        {pageName === 'saved' && (
          <ul>
            {bookmarkPosts.map(post => (
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
        {pageName === 'tagged' && '태그된 게시물 뷰'}
      </div>
    </StyledSection>
  );
}

export default ProfilePosts;
