<<<<<<< HEAD
import react from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    like?: boolean;
    width?: number;
    count?: number;
    clicked?: boolean;
    size?: number;
    isAnother?: boolean;
    hasLocation?: string | null;
    comment?: string | null;
    contextLength?: number;
    marginLeft?: boolean;
    thumbnail?: boolean;
    createdTime?: string;
    viewTime?: boolean;
    header?: boolean;
    page?: string;
    modal?: boolean;
    isRecommend?: boolean;
    top?: number;
    right?: number;
  }
}
=======
import react from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    like?: boolean;
    width?: number;
    count?: number;
    clicked?: boolean;
    size?: number;
    isAnother?: boolean;
    hasLocation?: string | null;
    comment?: string | null;
    contextLength?: number;
    marginLeft?: boolean;
    thumbnail?: boolean;
    createdTime?: string;
    viewTime?: boolean;
    header?: boolean;
    page?: string;
    modal?: boolean;
    isRecommend?: boolean;
    top?: number;
    right?: number;
    isList?: boolean;
  }
}
>>>>>>> ee0a8d6c7c6ed3fd63259fed9dca80470ea47776
