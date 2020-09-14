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
  getPostCounts: (post_id: number) => void;
}

function ProfilePosts({
  profileId,
  myId,
  bookmarkedId,
  getPostCounts,
  getBookmarkPosts,
}: ProfilePostsProps) {
  const pageName = useLocation().pathname.split('/')[2];
  const { otherPosts } = useSelector((state: RootState) => state.otherPosts);
  const { bookmarkPosts } = useSelector(
    (state: RootState) => state.bookmarks.bookmarkPosts,
  );

  useEffect(() => {
    if (profileId !== myId) return;
    if (bookmarkedId.length === 0) return;

    if (bookmarkPosts.length === 0) {
      bookmarkedId.forEach(id => getBookmarkPosts(id));
    }

    // const addedBookmarkId = [];
    // for (let i = 0; i < bookmarkedId.length; i++) {
    //   if (bookmarkPosts.every(post => post.id !== bookmarkedId[i])) {
    //     addedBookmarkId.push(bookmarkedId[i]);
    //   }
    // }

    // addedBookmarkId.forEach(id => getBookmarkPosts(id));
  }, [getBookmarkPosts, bookmarkedId, myId, profileId, bookmarkPosts.length]);

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
                getPostCounts={getPostCounts}
                imageUrl="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/118216363_304413394169573_8108378978856811545_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=_nLTaop65HIAX9hnkWl&oh=01db5a23bd1862d9a1d814c843b39d96&oe=5F870209"
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
                imageUrl="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/119227495_2812132312354934_7941606087414372365_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=BHJtVbbnNLUAX_JNgMU&oh=a9c12fbf4899e197869f2ca2b133523c&oe=5F8794F7"
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
