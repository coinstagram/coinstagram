import styled, { css } from 'styled-components';
import { StyledBg, StyledModal } from '../common/PostModalStyle';

export const StyledBackground = styled(StyledBg)`
  display: ${props => (props.modal ? 'block' : 'none')};
`;

export const StyledDiv = styled(StyledModal)`
  position: absolute;
  width: ${props => (props.width < 400 ? 350 : 400)};
  left: ${props => (props.width < 400 ? 'calc(50% - 175px)' : 'calc(50% - 200px)')};
  ${props =>
    props.isList ?
    css`
      height: 300px;
      box-sizing: border-box;
    `: 
    css`
    top: calc(50% - 108px);
    `}
  .list-header {
    padding: 15px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid rgb(219, 219, 219);
  }
  .list-body {
    padding: 8px 15px 0;
    height: 230px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 12px;
    }
    &::-webkit-scrollbar-button:end {
      width: 0px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
      background-color: rgb(219, 219, 219);
      border-radius: 12px;
    }
    & > div {
      padding: 8px 0;
    }
  }
`;

export const StyledBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 3px;
  
  span {
    outline: none;
    font-size: 20px;
  }
`;
