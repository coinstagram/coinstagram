import styled from 'styled-components';
import spriteImg from '../../resource/image/spriteImages.png';

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  padding: 12px 16px 8px 16px;

  button {
    display: flex;
  }
`;

export const UsernameDiv = styled.div`
  outline: none;
  font-weight: bold;
  margin-left: 47px;
  margin-top: 2px;

  position: absolute;

  dd {
    &:hover {
      color: rgb(142, 142, 142);
    }
  }
`;

export const LocationDiv = styled.div`
  outline: none;
  font-size: 12px;

  position: absolute;
  top: 33px;
  left: 63px;

  dd {
    &:hover {
      color: rgb(142, 142, 142);
    }
  }
`;

export const StyledBtn = styled.button`
  div {
    display: inline-block;
    box-sizing: border-box;
    padding: 12px;
    outline: none;
  }

  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url(${spriteImg});
    background-position: -212px -400px;
    background-repeat: no-repeat;
  }
`;
