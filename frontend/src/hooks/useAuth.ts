import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import RootState from '../type';

function useAuth() {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  if (token === null) {
    dispatch(push('/login'));
  }

  // if (token !== null) {
  //   dispatch(push('/'));
  // }
}

export default useAuth;
