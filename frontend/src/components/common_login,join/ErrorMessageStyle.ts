import styled from 'styled-components';

export const StyledDiv = styled.div`
  background: #f7003f;
  display: flex;
  position: relative;
  border-radius: 5px;
  padding: 3px 0;
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    bottom: 100%;
    left: 1.5em;
    border: 0.75rem solid transparent;
    border-top: none;
    background: white;
    border-bottom-color: #f7003f;
  }
`;
export const IconWrapper = styled.div`
  margin: 0 20px;
  padding: 10px 0;
  .errorIcon {
    color: white;
    font-size: 2rem;
  }
`;
export const StyledP = styled.p`
  border-radius: 5px;
  color: white;
  font-size: 0.9rem;
  margin: auto;
  margin-left: 0;
  p {
    margin: 0;
  }
`;
