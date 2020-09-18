import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 0 16px;
`;

export const StyledPassedTimeDiv = styled.div`
  margin-bottom: 5px;
  margin-left: ${props => props.marginLeft && 16};

  &[class$='createdTime'] {
    font-size: 10px;
    color: rgb(142, 142, 142);
  }
`;
