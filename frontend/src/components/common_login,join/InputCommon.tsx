import React from 'react';
import { inputProps, StyledDiv, IconWrapper } from './InputCommonStyle';
import { BiCheckCircle } from 'react-icons/bi';
import { RiCloseCircleLine } from 'react-icons/ri';
import useWindowWidth from '../../hooks/useWindowWidth';

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
}: inputProps) {
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    onInput(e.target.value);
  }
  const width = useWindowWidth();
  return (
    <StyledDiv style={style} width={width}>
      <label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
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
