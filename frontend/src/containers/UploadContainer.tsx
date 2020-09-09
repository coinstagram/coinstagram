import React from 'react';

// components;
import UploadHeader from '../components/upload/UploadHeader';
import UploadInput from '../components/upload/UploadInput';
import UploadDetails from '../components/upload/UploadDetails';

function UploadContainer() {
  return (
    <>
      <UploadHeader />
      <UploadInput />
      <UploadDetails />
    </>
  );
}

export default UploadContainer;
