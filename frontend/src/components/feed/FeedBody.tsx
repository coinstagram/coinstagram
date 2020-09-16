import React from 'react';

// components
import FeedImgSlider from './FeedImgSlider';

interface FeedBodyProps {
  imageUrl?: string[];
}

function FeedBody({ imageUrl }: FeedBodyProps) {
  return (
    <div>
      <FeedImgSlider imageUrl={imageUrl} />
    </div>
  );
}

FeedBody.defaultProps = {
  imageUrl: [],
};

export default FeedBody;
