import React from 'react';

// styles
import { StyledDiv } from './FooterStyle';

// icons
import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <StyledDiv>
      <span>
        DEVELOPER.{' '}
        <a href="https://github.com/LEE-WOO-SEONG" target="_blank" rel="noopener noreferrer">
          이우성
        </a>{' '}
        <a href="https://github.com/nomadhailey" target="_blank" rel="noopener noreferrer">
          박해리
        </a>{' '}
        <a href="https://github.com/clowns123" target="_blank" rel="noopener noreferrer">
          김태현
        </a>
      </span>
      <small>Copyright since &copy; 2020 by COINSTAGRAM CORPORATION ALL RIGHTS RESERVED.</small>
      <a className="github-logo" href="https://github.com/coinstagram/coinstagram" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </a>
    </StyledDiv>
  );
}

export default Footer;
