import React from 'react';
import { useSelector } from 'react-redux';
import useWindowWidth from '../../hooks/useWindowWidth';
import RootState from '../../type';
import { useLocation } from 'react-router-dom';

// styles
import { StyledDiv, StyledSpinnerDiv } from './OtherPostListStyle';
import { StyledNocontentDiv } from '../profile/ProfilePostsStyle';
import { StyledErrorDiv } from '../explore/RandomPostsStyle';

// components
import OtherPostItem from './OtherPostItem';
import Spinner from '../common/Spinner';

interface OtherPostListProps {
  getPostCounts: (post_id: number) => void;
}

function OtherPostList({ getPostCounts }: OtherPostListProps) {
  const width = useWindowWidth();
  const { loading, error, otherPosts } = useSelector((state: RootState) => state.otherPosts);
  const selectedPostId = +useLocation().pathname.split('/')[2];
  const exceptThisPosts = otherPosts.filter(post => post.id !== selectedPostId);
  const latestSixPosts = exceptThisPosts.filter((_, i) => i < 8);

  return (
    <StyledDiv width={width}>
      {loading && (
        <StyledSpinnerDiv>
          <Spinner />
        </StyledSpinnerDiv>
      )}
      {!loading && error === null && latestSixPosts.length === 0 && (
        <StyledNocontentDiv>
          업로드하신 다른 게시물이 없어요!{' '}
          <span aria-label="아쉬운 표정" role="img">
            🙄
          </span>
        </StyledNocontentDiv>
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
      <ul>
        {latestSixPosts.map(post => (
          <OtherPostItem key={post.id} postId={post.id} postOwnerId={post.user_id} imageThumbnail={post.image_path} getPostCounts={getPostCounts} />
        ))}
      </ul>
    </StyledDiv>
  );
}

export default OtherPostList;
