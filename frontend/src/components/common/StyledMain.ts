import styled from 'styled-components';

const StyledMain = styled.main`
  max-width: 975px;
  margin: 0 auto;
  padding: 84px 20px 0;

  padding: ${props => props.width < 655 && '56px 0 0'};

  max-width: ${props => props.width < 1000 && '600px'};
`;

export default StyledMain;
