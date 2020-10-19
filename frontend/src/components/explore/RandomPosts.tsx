import React from 'react';
import { useSelector } from 'react-redux';
import useWindowWidth from '../../hooks/useWindowWidth';
import RootState from '../../type';
import useObserver from '../../hooks/useObserver';

// styles
import { StyledSection, StyledDiv, StyledErrorDiv } from './RandomPostsStyle';
import { StyledNocontentDiv } from '../profile/ProfilePostsStyle';

// components
import Spinner from '../common/Spinner';
import OtherPostItem from '../post/OtherPostItem';

interface RandomPostsProps {
  getRandomPosts: (count: number) => void;
  getPostCounts: (post_id: number) => void;
}

function RandomPosts({ getRandomPosts, getPostCounts }: RandomPostsProps) {
  const { loading, error, randomPosts } = useSelector((state: RootState) => state.posts.randomPosts);
  const width = useWindowWidth();
  const observerObj = useObserver('random');

  return (
    <StyledSection width={width}>
      {loading && (
        <StyledDiv>
          <Spinner />
        </StyledDiv>
      )}
      {error !== null && (
        <StyledErrorDiv>
          <p>
            게시물 로딩에 실패하였습니다.{' '}
            <span aria-label="아쉬운 표정" role="img">
              😥
            </span>{' '}
            <br />
            페이지 새로고침 후 다시 실행해 주시기바랍니다.
          </p>
        </StyledErrorDiv>
      )}
      {!loading && error === null && randomPosts.length === 0 && (
        <StyledNocontentDiv>
          추천할 게시물이 없네요{' '}
          <span aria-label="아쉬운 표정" role="img">
            😊
          </span>
        </StyledNocontentDiv>
      )}
      {
        <ul>
          {randomPosts.map(post => (
            <OtherPostItem key={post.id} postId={post.id} postOwnerId={post.user_id} getPostCounts={getPostCounts} imageThumbnail={post.image_path} />
          ))}
        </ul>
      }
      <div ref={observerObj.lastItemRef}></div>
    </StyledSection>
  );
}

export default React.memo(RandomPosts);
