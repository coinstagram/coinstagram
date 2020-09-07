import React from 'react';
import styled from 'styled-components';
import { BiCheckCircle } from 'react-icons/bi';
import { RiCloseCircleLine } from 'react-icons/ri';

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: () => void;
  placeholder: string;
  toggleIcon: boolean;
  display: string;
  children?: React.ReactNode;
}
export default function InputStyle({
  type,
  name,
  value,
  onChange,
  placeholder,
  toggleIcon,
  display,
  children,
}: InputProps) {
  const StyledDiv = styled.div`
    width: 268px;
    height: 38px;
    display: flex;
    margin-bottom: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    background: #fafafa;
    font-size: 0.9em;

    label {
      width: 100%;
      input {
        background: #fafafa;
        color: #828282;
        padding: 10px;
        margin-top: 2px;
        border: none;
        width: 100%;
        height: 36px;
        outline: none;
      }
    }
  `;
  const IconWrapper = styled.div`
    transition: 1s;
    text-align: center;
    align-items: center;
    display: ${value ? display : 'none'};

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
        color: #d5d6d7;
      }
    }
    div {
      white-space: nowrap;
      .toggleBtn {
        font-weight: bold;
        font-size: 1rem;
        outline: none;
      }
    }
  `;

  return (
    <StyledDiv>
      <label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        ></input>
      </label>
      <IconWrapper
      // display={display}
      // value={value}
      // style={{
      //   display: { value } ? { display } : 'none',
      // }}
      >
        {{ toggleIcon } ? (
          <BiCheckCircle className="icon check" />
        ) : (
          <RiCloseCircleLine className="icon close" />
        )}
      </IconWrapper>
    </StyledDiv>
  );
}
