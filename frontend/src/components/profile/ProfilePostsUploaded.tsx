import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RootState from '../../type';
import { resetOtherPost } from '../../redux/modules/otherPost';
import useObserver from '../../hooks/useObserver';

// styles
import { StyledNocontentDiv, StyledSpinnerDiv } from './ProfilePostsStyle';
import { StyledErrorDiv } from '../explore/RandomPostsStyle';
import { StyledLastComment } from '../feed/FeedStyle';

// components
import Spinner from '../common/Spinner';
import OtherPostItem from '../post/OtherPostItem';

interface ProfilePostsUploadedProps {
  profileId: string;
  getPostCounts: (post_id: number) => void;
}

function ProfilePostsUploaded({ profileId, getPostCounts }: ProfilePostsUploadedProps) {
  const dispatch = useDispatch();
  const { loading, error, otherPosts, isLast } = useSelector((state: RootState) => state.otherPosts);
  const observer = useObserver('user', isLast);

  useEffect(() => {
    return () => dispatch(resetOtherPost());
  }, [dispatch]);

  return (
    <>
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
      {!loading && !error && otherPosts.length === 0 && (
        <StyledNocontentDiv>
          아직 업로드하신 게시물이 없어요{' '}
          <span aria-label="아쉬운 표정" role="img">
            😂
          </span>
        </StyledNocontentDiv>
      )}
      <>
        <ul>
          {otherPosts.map(post => (
            <OtherPostItem key={post.id} postId={post.id} postOwnerId={post.user_id} getPostCounts={getPostCounts} imageThumbnail={post.image_path} />
          ))}
        </ul>
        <div style={{ position: 'relative', height: isLast ? '' : 80 }} ref={observer.lastItemRef}>
          {loading && (
            <StyledSpinnerDiv>
              <Spinner />
            </StyledSpinnerDiv>
          )}
          {isLast && otherPosts.length !== 0 && <StyledLastComment>마지막 게시물입니다.</StyledLastComment>}
        </div>
      </>
    </>
  );
}

export default ProfilePostsUploaded;
