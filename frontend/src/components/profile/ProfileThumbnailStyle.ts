import styled from 'styled-components';

export const StyledDiv = styled.div`
  width: ${props => props.width >= 750 && 300};
  text-align: center;

  label {
    cursor: pointer;
  }
`;
