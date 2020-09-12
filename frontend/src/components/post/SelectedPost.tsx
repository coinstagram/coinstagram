import React, { useContext } from 'react';
import { computePassedTime } from '../feed/FeedComment';
import RootState from '../../type';
import { useSelector } from 'react-redux';
import { ModalContext } from '../../App';

// styles
import { StyledPassedTimeDiv } from '../feed/FeedCommentStyle';
import { StyledArticle, StyledDiv } from './SelectedPostStyle';

// components
import FeedBody from '../feed/FeedBody';
import FeedHeader from '../feed/FeedHeader';
import FeedIcons from '../feed/FeedIcons';
import FeedCommentOwner from '../feed/FeedCommentOwner';
import FeedCommentList from '../feed/FeedCommentList';
import FeedAddComment from '../feed/FeedAddComment';
import FollowCancelModal from '../common/FollowCancelModal';
import PostModal from '../common/PostModal';
import useWindowWidth from '../../hooks/useWindowWidth';

interface SelectedPostProps {
  userId: string;
  userProfile: string;
  postId: number;
  getUserPosts: () => void;
  getCommentsPost: () => void;
  addCommentPost: (post_id: number, comment_text: string) => void;
  follow: () => void;
  cancelFollow: () => void;
}

function SelectedPost({
  userId,
  userProfile,
  postId,
  getUserPosts,
  getCommentsPost,
  addCommentPost,
  follow,
  cancelFollow,
}: SelectedPostProps) {
  const { selectedPost } = useSelector((state: RootState) => state.posts);
  const selectedPostInfo = selectedPost.post;
  const { postModal, followModal, popPostModal, popFollowModal } = useContext(
    ModalContext,
  );

  const width = useWindowWidth();

  return (
    <>
      <StyledArticle width={width}>
        <div>
          {width < 1030 && (
            <FeedHeader
              userId={userId}
              postId={postId}
              location={selectedPostInfo && selectedPostInfo.post_location}
              userProfile={userProfile}
            />
          )}
          <FeedBody />
        </div>
        <div>
          {width > 1029 && (
            <FeedHeader
              userId={userId}
              postId={postId}
              location={selectedPostInfo && selectedPostInfo.post_location}
              userProfile={userProfile}
            />
          )}
          <StyledDiv width={width}>
            <FeedCommentOwner
              userId={userId}
              userProfile={userProfile}
              context={selectedPostInfo && selectedPostInfo.post_context}
              createdTime={selectedPostInfo && selectedPostInfo.created_at}
              thumbnail={true}
            />
            <FeedCommentList
              postId={postId}
              getCommentsPost={getCommentsPost}
              visual={true}
              viewTime={true}
              thumbnail={true}
            />
          </StyledDiv>
          <FeedIcons postId={postId} />
          <StyledPassedTimeDiv
            className={`${postId}-createdTime`}
            marginLeft={true}
          >
            {computePassedTime(selectedPostInfo && selectedPostInfo.created_at)}
          </StyledPassedTimeDiv>
          <FeedAddComment
            userId={userId}
            postId={postId}
            addCommentPost={addCommentPost}
          />
        </div>
      </StyledArticle>
      {followModal && (
        <FollowCancelModal
          user_id={userId}
          user_profile={userProfile}
          cancelFollow={cancelFollow}
          popFollowModal={popFollowModal}
        />
      )}
      {postModal && (
        <PostModal
          popPostModal={popPostModal}
          popFollowModal={popFollowModal}
          postId={postId}
          userId={userId}
        />
      )}
    </>
  );
}

export default SelectedPost;
