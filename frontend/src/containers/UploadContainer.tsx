import React from 'react';
import styled from 'styled-components';

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
