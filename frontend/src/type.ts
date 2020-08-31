import { AxiosError } from 'axios';

export interface AuthState {
  loading: boolean;
  id: null | string;
  error: null | AxiosError;
}

interface RootState {
  auth: {
    loading: boolean;
    id: null | string;
    error: null | AxiosError;
  };
  // 다른 reducer의 상태 추가 필요
}

export default RootState;
