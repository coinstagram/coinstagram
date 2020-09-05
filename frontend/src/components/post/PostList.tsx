import React from 'react';
import styled from 'styled-components';

// components
import PostListHeader from './PostListHeader';
import PostListBody from './PostListBody';
import PostListComment from './PostListComment';
import PostListIcons from './PostListIcons';

const StyledArticle = styled.article`
  border: 1px solid rgb(219, 219, 219);
  border-radius: 3px;
`;

function PostList() {
  return (
    <StyledArticle>
      <h3 className="a11y-hidden">follow user의 게시물</h3>
      <PostListHeader />
      <PostListBody />
      <PostListIcons />
      <PostListComment />
    </StyledArticle>
  );
}

export default PostList;
