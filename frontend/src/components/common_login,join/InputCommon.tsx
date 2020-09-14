import React from 'react';
import { inputProps, StyledDiv, IconWrapper } from './InputCommonStyle';
import { BiCheckCircle } from 'react-icons/bi';
import { RiCloseCircleLine } from 'react-icons/ri';

export default function InputCommon({
  type,
  name,
  value,
  onInput,
  placeholder,
  toggleIcon,
  display,
  children,
  style,
}: // toggleShowPassword,
// isPasswordShown,
inputProps) {
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    onInput(e.target.value);
  }

  return (
    <StyledDiv style={style}>
      <label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          // toggleShowPassword={toggleShowPassword}
          // isPasswordShown={isPasswordShown}
          required
        />
      </label>
      {children}
      <IconWrapper style={{ display: value ? display : 'none' }}>
        {toggleIcon ? (
          <BiCheckCircle className="icon check" />
        ) : (
          <RiCloseCircleLine className="icon close" />
        )}
      </IconWrapper>
    </StyledDiv>
  );
}
