import React, { useContext, useEffect } from 'react';
import { computePassedTime } from '../feed/FeedComment';
import RootState from '../../type';
import { useSelector } from 'react-redux';
import { ModalContext } from '../../App';
import useWindowWidth from '../../hooks/useWindowWidth';

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
import PostModal from '../common/PostModal';

interface SelectedPostProps {
  selectedUserId: string;
  selectedUserProfile: string;
  selectedPostId: number;
  getSelectedPostInfo: () => void;
  addCommentPost: (post_id: number, comment_text: string, myProfile: string) => void;
  addPostLikes: (post_id: number) => void;
  deletePostLike: (post_id: number) => void;
  follow: () => void;
  deletePost: (post_id: number) => void;
  addBookmark: (post_id: number) => void;
  deleteBookmark: (post_id: number) => void;
}

function SelectedPost({
  selectedUserId,
  selectedUserProfile,
  selectedPostId,
  getSelectedPostInfo,
  addCommentPost,
  addPostLikes,
  deletePostLike,
  follow,
  deletePost,
  addBookmark,
  deleteBookmark,
}: SelectedPostProps) {
  const { selectedPost } = useSelector((state: RootState) => state.posts);
  const { users } = useSelector((state: RootState) => state.userInfo.followers);
  const { user } = useSelector((state: RootState) => state.userInfo);
  const user_id = user && user.user_id;

  const selectedPostInfo = selectedPost.selectedPost;
  const selectedPostImages = selectedPost.selectedPost !== null ? selectedPost.selectedPost.image_path : [];
  const { postModal, popPostModal, popFollowModal } = useContext(ModalContext);
  const width = useWindowWidth();

  useEffect(() => {
    getSelectedPostInfo();
  }, [getSelectedPostInfo]);

  return (
    <>
      <StyledArticle width={width} imageUrl={selectedPostImages[selectedPostImages.length - 1]}>
        <h2 className="a11y-hidden">
          {selectedUserId}님의 게시물 {selectedPostId}
        </h2>
        <div>
          {width < 1500 && (
            <FeedHeader
              userId={selectedUserId}
              userProfile={selectedUserProfile}
              postId={selectedPostId}
              location={selectedPostInfo && selectedPostInfo.post_location}
            />
          )}
          <div>
            <FeedBody imageUrl={selectedPostImages} />
          </div>
        </div>
        <div>
          {width > 1500 && (
            <FeedHeader
              userId={selectedUserId}
              userProfile={selectedUserProfile}
              postId={selectedPostId}
              location={selectedPostInfo && selectedPostInfo.post_location}
            />
          )}
          <StyledDiv width={width}>
            <FeedCommentOwner
              userId={selectedUserId}
              userProfile={selectedUserProfile}
              hashTags={selectedPostInfo === null ? [] : selectedPostInfo.hastag}
              context={selectedPostInfo && selectedPostInfo.post_context}
              createdTime={selectedPostInfo && selectedPostInfo.created_at}
              thumbnail={true}
            />
            <FeedCommentList postId={selectedPostId} visual={true} viewTime={true} thumbnail={true} />
          </StyledDiv>
          <FeedIcons
            myId={user_id}
            postId={selectedPostId}
            addPostLikes={addPostLikes}
            deletePostLike={deletePostLike}
            addBookmark={addBookmark}
            deleteBookmark={deleteBookmark}
          />
          <StyledPassedTimeDiv className={`${selectedPostId}-createdTime`} marginLeft={true}>
            {computePassedTime(selectedPostInfo && selectedPostInfo.created_at)}
          </StyledPassedTimeDiv>
          <FeedAddComment userId={selectedUserId} postId={selectedPostId} addCommentPost={addCommentPost} />
        </div>
      </StyledArticle>
      {postModal && (
        <PostModal
          popPostModal={popPostModal}
          popFollowModal={popFollowModal}
          postId={selectedPostId}
          userId={selectedUserId}
          userProfile={selectedUserProfile}
          followers={users}
          follow={follow}
          deletePost={deletePost}
          deleteBookmark={deleteBookmark}
        />
      )}
    </>
  );
}

export default SelectedPost;
