import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../App';

// components
import Thumbnail from '../Thumbnail';

// styles
import spriteImg from '../../resource/image/spriteImages.png';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  padding: 12px 16px 8px 16px;

  button {
    display: flex;
  }
`;

const UsernameDiv = styled.div`
  outline: none;
  font-weight: bold;
  margin-left: 47px;
  margin-top: 2px;

  position: absolute;
`;

const LocationDiv = styled.div`
  outline: none;
  font-size: 12px;

  position: absolute;
  top: 33px;
  left: 63px;
`;

const StyledBtn = styled.button`
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

function PostListHeader() {
  const { popPostModal } = useContext(ModalContext);

  return (
    <>
      <StyledDiv>
        <button>
          <Thumbnail size={35} imageUrl={null} />
          <UsernameDiv tabIndex={-1}>
            <dt className="a11y-hidden">user name</dt>
            <dd>user id</dd>
          </UsernameDiv>
        </button>
        <Link to="/explore/tags/12345">
          <LocationDiv tabIndex={-1}>
            <dt className="a11y-hidden">location</dt>
            <dd>location</dd>
          </LocationDiv>
        </Link>
        <StyledBtn onClick={setModal}>
          <div tabIndex={-1}>
            <span></span>
          </div>
        </StyledBtn>
      </StyledDiv>
    </>
  );

  function setModal() {
    popPostModal();
  }
}

export default PostListHeader;
