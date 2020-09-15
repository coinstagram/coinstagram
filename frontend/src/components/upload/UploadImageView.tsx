import React from 'react';

type imagesProps = {
  images: Array<String>;
};

const UploadImageView: React.FC<imagesProps> = ({ images }) => {
  return <>{images}</>;
};

export default UploadImageView;
