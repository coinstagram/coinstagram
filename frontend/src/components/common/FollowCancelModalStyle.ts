import { StyledModal } from './PostModalStyle';
import styled from 'styled-components';

export const StyledFollowModal = styled(StyledModal)`
  padding-top: 20px;

  ul > li:nth-child(1) {
    border-top: 1px solid rgb(219, 219, 219);
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
