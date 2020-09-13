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
  }
}
