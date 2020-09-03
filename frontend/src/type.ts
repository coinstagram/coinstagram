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
