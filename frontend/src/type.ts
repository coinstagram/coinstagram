import { AxiosError } from 'axios';
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    width?: number;
    count?: number;
    clicked?: boolean;
    size?: number;
    isAnother?: boolean;
  }
}

export interface AuthState {
  loading: boolean;
  id: null | string;
  error: null | AxiosError;
}

export interface UserState {
  loading: boolean;
  error: null | AxiosError;
  id: null | number;
  user_email: null | string;
  user_gender: null | string;
  user_id: null | number;
  user_introduce: null | string;
  user_name: null | string;
  user_password: null | string;
  user_phone: null | number;
  user_profile: null | string;
}

interface RootState {
  auth: {
    loading: boolean;
    id: null | string;
    error: null | AxiosError;
  };
  // 다른 reducer의 상태 추가 필요
}

// style
export interface WidthProps {
  width?: number;
}

export default RootState;
