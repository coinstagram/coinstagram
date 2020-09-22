import react from 'react';
import { EachPostState } from './type';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    like?: boolean;
    width?: number;
    height?: number;
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
    imageUrl?: string;
    isMain?: boolean;
    image?: string[];
    feedPosts?: EachPostState[];
  }
}
