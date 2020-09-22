import React from 'react';
import Header from '../components/header/Header';
import styled from 'styled-components';
import useWindowWidth from '../hooks/useWindowWidth';
import useAuth from '../hooks/useAuth';

// styles
import StyledMain from '../components/common/StyledMain';

// containers
import UploadContainer from '../containers/UploadContainer';
import ChangePostContainer from '../containers/ChangePostContainer';

const UploadMain = styled(StyledMain)`
  max-width: 600px;
  padding: ${props => props.width < 655 && '55px 0 0'};
`;
const StyledSection = styled.section`
  border: 1px solid rgb(219, 219, 219);
`;

function ChangePost() {
  const width = useWindowWidth();
  useAuth();

  return (
    <>
      <Header />
      <UploadMain width={width}>
        <StyledSection>
          <h3 className="a11y-hidden">게시물 업로드</h3>
          <ChangePostContainer />
        </StyledSection>
      </UploadMain>
    </>
  );
}

export default React.memo(ChangePost);
