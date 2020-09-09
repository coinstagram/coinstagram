import react from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    like?: boolean;
    width?: number;
    count?: number;
    clicked?: boolean;
    size?: number;
    isAnother?: boolean;
  }
}
