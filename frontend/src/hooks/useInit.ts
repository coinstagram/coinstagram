import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarksSaga } from '../redux/modules/bookmark';
import { getUserInfoSaga } from '../redux/modules/userInfo';
import RootState from '../type';

function useInit() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.userInfo);
  const userId = user && user.user_id;

  useEffect(() => {
    if (token === null) return;
    dispatch(getUserInfoSaga());
  }, [dispatch, token]);

  useEffect(() => {
    if (token === null) return;
    dispatch(getBookmarksSaga(userId));
  }, [dispatch, userId, token]);
}

export default useInit;
