import styled from 'styled-components';

const StyledMain = styled.main`
  max-width: 1500px;
  margin: 0 auto;
  padding: 84px 20px 0;

  padding: ${props => props.width < 655 && '54px 0 0'};

  max-width: ${props => props.width < 1500 && props.isMain && '1000px'};
`;

export default StyledMain;
