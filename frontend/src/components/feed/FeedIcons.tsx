import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RootState from '../../type';
import { useSelector } from 'react-redux';

// icons
import { BsHeartFill, BsHeart, BsBookmarks, BsBookmarksFill, BsChat } from 'react-icons/bs';

// styles
import { StyledDiv, IconDiv } from './FeedIconsStyle';

interface State {
  like: boolean;
  favorite: boolean;
}

interface FeedIconsProps {
  myId: string;
  postId: number;
  addPostLikes: (post_id: number) => void;
  deletePostLike: (post_id: number) => void;
  addBookmark: (post_id: number) => void;
  deleteBookmark: (post_id: number) => void;
}

function FeedIcons({ myId, postId, addPostLikes, deletePostLike, addBookmark, deleteBookmark }: FeedIconsProps) {
  const feedLikes = useSelector((state: RootState) => state.likes.feedPostLikes.userLikes);
  const selectedLikes = useSelector((state: RootState) => state.likes.selectedPostLikes.userLikes);
  const { bookmarks } = useSelector((state: RootState) => state.bookmarks);
  const feedLikesInfo = feedLikes.find(like => +like.post_id === postId);
  const selectedLikesInfo = selectedLikes.find(like => +like.post_id === postId);
  const feedlikesCount = feedLikesInfo && feedLikesInfo.user_id.length;
  const selectedlikesCount = selectedLikesInfo === undefined ? 0 : selectedLikesInfo.user_id.length;
  const likesCount = feedLikesInfo === undefined ? selectedlikesCount : feedlikesCount;
  const [state, setState] = useState<State>({
    like: false,
    favorite: false,
  });

  useEffect(() => {
    const isBookmarked = bookmarks.some(post => post === postId);

    setState(st => ({
      ...st,
      favorite: isBookmarked,
    }));
  }, [bookmarks, postId]);

  useEffect(() => {
    const isLiked =
      feedLikesInfo !== undefined
        ? feedLikesInfo.user_id.some(userId => userId === myId)
        : selectedLikesInfo && selectedLikesInfo.user_id.some(userId => userId === myId);

    setState(st => ({
      ...st,
      like: isLiked,
    }));
  }, [feedLikesInfo, selectedLikesInfo, myId]);

  return (
    <StyledDiv>
      <IconDiv like={state.like}>
        <div>
          <button onClick={toggleLike} className={`like-${postId}`}>
            <span tabIndex={-1}>{state.like ? <BsHeartFill /> : <BsHeart />}</span>
          </button>
          <Link to={`/post/${postId}`}>
            <span tabIndex={-1}>
              <BsChat />
            </span>
          </Link>
        </div>
        <button onClick={togleBookmark}>
          <span tabIndex={-1}>{state.favorite ? <BsBookmarksFill /> : <BsBookmarks />}</span>
        </button>
      </IconDiv>
      <div>
        {likesCount === 0 && <p>지금 좋아요를 눌러보세요</p>}
        {likesCount !== 0 && <p>{likesCount}명이 좋아합니다.</p>}
      </div>
    </StyledDiv>
  );

  function togleBookmark() {
    setState({
      ...state,
      favorite: !state.favorite,
    });

    if (!state.favorite) {
      addBookmark(postId);
    } else {
      deleteBookmark(postId);
    }
  }

  function toggleLike() {
    setState({
      ...state,
      like: !state.like,
    });

    if (!state.like) {
      addPostLikes(postId);
    } else {
      deletePostLike(postId);
    }
  }
}

export default FeedIcons;
