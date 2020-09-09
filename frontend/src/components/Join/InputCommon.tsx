import React from 'react';
import { InputProps, StyledDiv, IconWrapper } from './InputCommon.style';
import { BiCheckCircle } from 'react-icons/bi';
import { RiCloseCircleLine } from 'react-icons/ri';
import { passwordProps } from './InputPassword';

export default function InputStyle({
  type,
  name,
  value,
  onChange,
  placeholder,
  toggleIcon,
  display,
  children,
  style,
}: InputProps) {
  function test(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <StyledDiv style={style}>
      <label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={test}
          // onChange={(e)=>onChange(e.target.value)}
          placeholder={placeholder}
          required
        />
      </label>
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
