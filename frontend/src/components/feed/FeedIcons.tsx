import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// icons
import {
  BsHeartFill,
  BsHeart,
  BsBookmarks,
  BsBookmarksFill,
  BsChat,
} from 'react-icons/bs';
import RootState from '../../type';
import { useSelector } from 'react-redux';

// styles
import { StyledDiv, IconDiv } from './FeedIconsStyle';
import LikeService from '../../redux/services/likeService';

interface State {
  like: boolean;
  favorite: boolean;
}

interface FeedIconsProps {
  postId: number;
  getPostLikes: (post_id: number) => void;
  addPostLikes: (post_id: number) => void;
}

function FeedIcons({ postId, getPostLikes, addPostLikes }: FeedIconsProps) {
  // const { userLikes } = useSelector(
  // (state: RootState) => state.likes.postLikes,
  // );
  const { token } = useSelector((state: RootState) => state.auth);
  const likeUsersRef = useRef<string[]>([]);
  const [state, setState] = useState<State>({
    like: false,
    favorite: false,
  });

  async function getLikes() {
    const usersArray = await LikeService.getLikesPost(token, postId);
    likeUsersRef.current = usersArray;
    console.log(likeUsersRef.current);
  }

  getLikes();

  useEffect(() => {
    getPostLikes(postId);
  }, [getPostLikes, postId]);

  return (
    <StyledDiv>
      <IconDiv like={state.like}>
        <div>
          <button onClick={toggleLike} className={`like-${postId}`}>
            <span tabIndex={-1}>
              {state.like ? <BsHeartFill /> : <BsHeart />}
            </span>
          </button>
          <Link to={`/post/${postId}`}>
            <span tabIndex={-1}>
              <BsChat />
            </span>
          </Link>
        </div>
        <button onClick={togleBookmark}>
          <span tabIndex={-1}>
            {state.favorite ? <BsBookmarksFill /> : <BsBookmarks />}
          </span>
        </button>
      </IconDiv>
      <div>
        {likeUsersRef.current.length === 0 && <p>지금 좋아요를 눌러보세요</p>}
        {likeUsersRef.current.length !== 0 && (
          <p>{likeUsersRef.current.length}명이 좋아합니다.</p>
        )}
      </div>
    </StyledDiv>
  );

  function togleBookmark() {
    setState({
      ...state,
      favorite: !state.favorite,
    });
  }

  function toggleLike() {
    setState({
      ...state,
      like: !state.like,
    });

    addPostLikes(postId);
  }
}

export default FeedIcons;
