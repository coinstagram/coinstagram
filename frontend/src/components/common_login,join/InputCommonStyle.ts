import React from 'react';
import styled, { css } from 'styled-components';
import { passwordProps } from './InputPassword';

export interface inputProps extends passwordProps {
  type: string;
  name: string;
  value: string;
  onInput: (text: string) => void;
  placeholder: string;
  toggleIcon: boolean;
  display: string;
  children?: React.ReactNode;
}
export const StyledDiv = styled.div`
  width: 268px;
  height: 38px;
  display: flex;
  margin-bottom: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background: #fafafa;
  font-size: 0.9em;
  ${props =>
    props.width <= 750 &&
    css`
      width: 100%;
      max-width: 400px;
      height: 44px;
    `}

  label {
    width: 100%;
    input {
      background: #fafafa;
      color: #828282;
      padding: 10px;
      border: none;
      /* margin-top: 2px; */
      width: 100%;
      height: 36px;
      outline: none;
      ${props =>
        props.width <= 750 &&
        css`
          height: 40px;
          font-size: 1.1rem;
        `}
    }
  }
`;
export const IconWrapper = styled.div`
  transition: 1s;
  text-align: center;
  align-items: center;

  .icon {
    font-size: 22px;
    padding: 10px;
    &.close {
      color: #ef3f4f;
    }
    &.reload {
      color: #4794d9;
    }
    &.check {
      color: #0095f6;
    }
  }
`;
