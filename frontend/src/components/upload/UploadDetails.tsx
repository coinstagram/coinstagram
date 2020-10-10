import React, { useRef } from 'react';
import { StyledText } from './UploadDetails.style';
import { contextValue } from '../../containers/ChangePostContainer';
import HashTag from './HashTag';

interface UploadDetailsProps {
  change: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  data?: contextValue;
  hasTag: (hasTag: Array<string>) => void;
}

const UploadDetails: React.FC<UploadDetailsProps> = ({ change, data, hasTag }) => {
  const contextRef = useRef();
  const peopleRef = useRef();
  // const locationRef = useRef();
  return (
    <>
      <StyledText id="context" placeholder="문구를 입력해 주세요." onChange={change} value={!data ? '' : data.post_context} ref={contextRef} />{' '}
      <HashTag hasTag={hasTag} />
    </>
  );
};

export default UploadDetails;
