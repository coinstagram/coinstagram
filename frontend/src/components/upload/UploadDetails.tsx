import React, { useRef } from 'react';
import { StyledText } from './UploadDetails.style';
import { contextValue } from '../../containers/ChangePostContainer';
import HashTag from './HashTag';

interface UploadDetailsProps {
  hasTag: (tag: Array<string>) => void;
  change: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  data?: contextValue;
}

const UploadDetails: React.FC<UploadDetailsProps> = ({ hasTag, change, data }) => {
  const contextRef = useRef();
  return (
    <>
      <StyledText id="context" placeholder="문구를 입력해 주세요." onChange={change} value={!data ? '' : data.post_context} ref={contextRef} />{' '}
      <HashTag hasTag={hasTag} data={data} />
    </>
  );
};

export default UploadDetails;
