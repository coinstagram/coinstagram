import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWindowWidth from '../../hooks/useWindowWidth';
import RootState from '../../type';
import OtherPostItem from '../post/OtherPostItem';

// styles
import { StyledSection } from './RandomPostsStyle';

interface RandomPostsProps {
  getRandomPosts: () => void;
  getPostCounts: (post_id: number) => void;
}

function RandomPosts({ getRandomPosts, getPostCounts }: RandomPostsProps) {
  const { randomPosts } = useSelector((state: RootState) => state.posts.randomPosts);
  const width = useWindowWidth();

  useEffect(() => {
    getRandomPosts();
  }, [getRandomPosts]);

  return (
    <StyledSection width={width}>
      <ul>
        {randomPosts.map(post => (
          <OtherPostItem key={post.id} postId={post.id} postOwnerId={post.user_id} getPostCounts={getPostCounts} imageThumbnail={post.image_path} />
        ))}
      </ul>
    </StyledSection>
  );
}

export default RandomPosts;
