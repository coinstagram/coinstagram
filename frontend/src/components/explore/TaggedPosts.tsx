import React from 'react';
import { useLocation } from 'react-router-dom';
import { EachPostState } from '../../type';
import useObserver from '../../hooks/useObserver';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledLastComment, StyledSpinnerDiv } from '../feed/FeedStyle';
import { StyledNocontentDiv } from '../profile/ProfilePostsStyle';
import { StyledSection, StyledErrorDiv } from './RandomPostsStyle';
import { StyledSpan } from './TaggedPostsStyle';

// comonents
import Spinner from '../common/Spinner';
import OtherPostItem from '../post/OtherPostItem';

interface TaggedPostsProps {
  loading: boolean;
  error: Error | null;
  randomPosts: EachPostState[];
  isLast: boolean;
  getPostCounts: (post_id: number) => void;
}

function TaggedPosts({ loading, error, randomPosts, isLast, getPostCounts }: TaggedPostsProps) {
  const tag = useLocation().pathname.split('/')[3];
  const width = useWindowWidth();
  const observer = useObserver('tag', isLast);

  return (
    <StyledSection width={width}>
      <h2>
        <StyledSpan aria-hidden={true}>#</StyledSpan>
        <StyledSpan>{tag}</StyledSpan>
        <span className="a11y-hidden">태그 관련 게시물</span>
      </h2>
      {!loading && error !== null && (
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
      <div style={{ position: 'relative', height: 80 }} ref={observer.lastItemRef}>
        {loading && (
          <StyledSpinnerDiv>
            <Spinner />
          </StyledSpinnerDiv>
        )}
        {isLast && <StyledLastComment>마지막 게시물입니다.</StyledLastComment>}
      </div>{' '}
    </StyledSection>
  );
}

export default TaggedPosts;
