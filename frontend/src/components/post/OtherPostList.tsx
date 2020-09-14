import React from 'react';
import { useSelector } from 'react-redux';
import useWindowWidth from '../../hooks/useWindowWidth';
import RootState from '../../type';

// styles
import { StyledDiv } from './OtherPostListStyle';

// components
import OtherPostItem from './OtherPostItem';

function OtherPostList() {
  const width = useWindowWidth();
  const { otherPosts } = useSelector((state: RootState) => state.otherPosts);
  return (
    <StyledDiv width={width}>
      <ul>
        {otherPosts.map(post => (
          <OtherPostItem
            key={post.id}
            postId={post.id}
            postOwnerId={post.user_id}
            imageUrl={
              'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/119119043_320273322575683_5201589682283315788_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=SmwmdePmkFkAX9-UWAW&oh=c6b40ca3110b19ec34cf89917e65c018&oe=5F884D84'
            }
          />
        ))}
      </ul>
    </StyledDiv>
  );
}

export default OtherPostList;
