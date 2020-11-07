import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';

// icons
import { BsCardImage, BsTag, BsBookmarks } from 'react-icons/bs';

// styles
import { StyledSection, StyledNavDiv } from './ProfilePostsStyle';
import { StyledDiv } from '../post/OtherPostListStyle';

// components
import ProfilePostsUploaded from './ProfilePostsUploaded';
import ProfilePostsBookmarked from './ProfilePostsBookmarked';
import ProfilePostsTagged from './ProfilePostsTagged';

interface ProfilePostsProps {
  profileId: string;
  myId: string;
  bookmarkedId: number[];
  getBookmarkPosts: (post_id: number) => void;
  getPostCounts: (post_id: number) => void;
}

function ProfilePosts({ profileId, myId, bookmarkedId, getPostCounts, getBookmarkPosts }: ProfilePostsProps) {
  const pageName = useLocation().pathname.split('/')[3];
  const width = useWindowWidth();

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
        {pageName === undefined && <ProfilePostsUploaded profileId={profileId} getPostCounts={getPostCounts} />}
        {pageName === 'saved' && (
          <ProfilePostsBookmarked bookmarkedId={bookmarkedId} getPostCounts={getPostCounts} getBookmarkPosts={getBookmarkPosts} />
        )}
        {pageName === 'tagged' && <ProfilePostsTagged />}
      </StyledDiv>
    </StyledSection>
  );
}

export default ProfilePosts;
