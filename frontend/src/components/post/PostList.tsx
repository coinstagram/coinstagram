import React from 'react';
import styled from 'styled-components';

// components
import PostListHeader from './PostListHeader';
import PostListBody from './PostListBody';
import PostListComment from './PostListComment';

const StyledArticle = styled.article`
  border: 1px solid rgb(219, 219, 219);
  border-radius: 3px;
`;

function PostList() {
  return (
    <StyledArticle>
      <PostListHeader />
      <PostListBody />
      <PostListComment />
    </StyledArticle>
  );
}

export default PostList;
