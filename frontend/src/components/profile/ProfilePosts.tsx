import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import RootState from '../../type';
import OtherPostItem from '../post/OtherPostItem';

// styles
import { StyledSection } from './ProfilePostsStyle';

interface ProfilePostsProps {
  profileId: string;
  myId: string;
  bookmarkedId: number[];
  getBookmarkPosts: (post_id: number) => void;
}

function ProfilePosts({
  profileId,
  myId,
  bookmarkedId,
  getBookmarkPosts,
}: ProfilePostsProps) {
  const pageName = useLocation().pathname.split('/')[2];
  const { otherPosts } = useSelector((state: RootState) => state.otherPosts);

  useEffect(() => {
    if (profileId !== myId) return;

    bookmarkedId.forEach(id => getBookmarkPosts(id));
  }, [getBookmarkPosts, bookmarkedId, myId, profileId]);

  return (
    <StyledSection>
      <div>
        <ul>
          <li>
            <NavLink to={`/${profileId}`} exact>
              게시물
            </NavLink>
          </li>
          {profileId === myId && (
            <li>
              <NavLink to={`/${profileId}/saved`}>저장됨</NavLink>
            </li>
          )}
          <li>
            <NavLink to={`/${profileId}/tagged`}>태그됨</NavLink>
          </li>
        </ul>
      </div>
      <div>
        {pageName === undefined && (
          <ul>
            {otherPosts.map(post => (
              <OtherPostItem
                key={post.id}
                postId={post.id}
                postOwnerId={post.user_id}
                imageUrl="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/118216363_304413394169573_8108378978856811545_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=_nLTaop65HIAX9hnkWl&oh=01db5a23bd1862d9a1d814c843b39d96&oe=5F870209"
              />
            ))}
          </ul>
        )}
        {pageName === 'saved' && '저장된 게시물 뷰'}
        {pageName === 'tagged' && '태그된 게시물 뷰'}
      </div>
    </StyledSection>
  );
}

export default ProfilePosts;
