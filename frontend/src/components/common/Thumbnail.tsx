import React from 'react';

// styles
import { StyledSpan } from './ThumbnailStyle';

export interface ThumbnailProps {
  imageUrl: string | null;
  size: number;
}

function Thumbnail({ imageUrl, size }: ThumbnailProps) {
  return (
    <StyledSpan
      className="thumbnail thumbnail-click"
      tabIndex={-1}
      imageUrl={imageUrl}
      size={size}
    />
  );
}

export default React.memo(Thumbnail);
