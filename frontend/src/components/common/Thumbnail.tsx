import React from 'react';

// styles
import { StyledSpan } from './ThumbnailStyle';

export interface ThumbnailProps {
  imageUrl: string | null;
  size: number;
}

function Thumbnail({ imageUrl, size }: ThumbnailProps) {
  if (imageUrl !== null) {
    imageUrl = imageUrl.split('\\')[1];
  }

  return (
    <StyledSpan
      tabIndex={-1}
      imageUrl={imageUrl}
      size={size}
      className="thumbnail"
    />
  );
}

export default React.memo(Thumbnail);
