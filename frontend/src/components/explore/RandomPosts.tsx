import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../type';
import OtherPostItem from '../post/OtherPostItem';

// styles
import { StyledSection } from './RandomPostsStyle';

interface RandomPostsProps {
  getRandomPosts: () => void;
}

function RandomPosts({ getRandomPosts }: RandomPostsProps) {
  const { randomPosts } = useSelector(
    (state: RootState) => state.posts.randomPosts,
  );

  useEffect(() => {
    getRandomPosts();
  }, [getRandomPosts]);

  return (
    <StyledSection>
      <ul>
        {randomPosts.map(post => (
          <OtherPostItem
            key={post.id}
            postId={post.id}
            postOwnerId={post.user_id}
            imageUrl={
              'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/119232040_162319315441202_3745921877582233225_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=jA1EtwUVGQ8AX_ePfpo&oh=d594c6d7d785ef8b59092d4152ebc412&oe=5F875325'
            }
          />
        ))}
      </ul>
    </StyledSection>
  );
}

export default RandomPosts;
