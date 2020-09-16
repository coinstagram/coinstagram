import React from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledDiv } from './ProfileNameAndIntroduceStyle';

interface ProfileNameAndIntrouduceProps {
  profileName: string;
  profileIntro: string;
}

function ProfileNameAndIntroduce({
  profileName,
  profileIntro,
}: ProfileNameAndIntrouduceProps) {
  const width = useWindowWidth();

  return (
    <StyledDiv width={width}>
      <div>
        <dt className="a11y-hidden">user name</dt>
        <dd>{profileName}</dd>
      </div>
      <p>{profileIntro}소개</p>
    </StyledDiv>
  );
}

export default ProfileNameAndIntroduce;
