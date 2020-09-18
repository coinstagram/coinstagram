import React from 'react';

// styles
import { StyledSpan } from './ThumbnailStyle';

export interface ThumbnailProps {
  imageUrl: string | null;
  size: number;
}

function Thumbnail({ imageUrl, size }: ThumbnailProps) {
  if (imageUrl !== null) {
    if (imageUrl.split('\\')[1] !== undefined) {
      imageUrl = imageUrl.split('\\')[1];
    } else if (imageUrl.split('/')[1] !== undefined) {
      imageUrl = imageUrl.split('/')[1];
    }
  }

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
