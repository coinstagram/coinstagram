import styled from 'styled-components';

export const StyledDiv = styled.div`
  width: ${props => props.width >= 750 && 300};
  text-align: center;

  label {
    cursor: pointer;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: fadeIn 1s;
`;
