import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { StyledDiv } from './EditFormStyle';
import Thumbnail from '../common/Thumbnail';
import RootState from '../../type';
import { useSelector } from 'react-redux';
import EditPassword from './EditPassword';
import EditProfile from './EditProfile';
import Secession from './Secession';

export default function EditForm() {
  const { user } = useSelector((state: RootState) => state.userInfo);
  const profile = user !== null ? user.user_profile : null;
  const user_id = user !== null ? user.user_id : null;
  const user_name = user !== null ? user.user_name : null;
  const user_email = user !== null ? user.user_email : null;

  const pageName = useLocation().pathname;
  return (
    <StyledDiv>
      <nav>
        <ul>
          <li>
            <NavLink to={'/edit/profile'}>프로필 편집</NavLink>
          </li>
          <li>
            <NavLink to={'/edit/password'}>비밀번호 변경</NavLink>
          </li>
          <li>
            <NavLink to={'/edit/account'}>계정 관리</NavLink>
          </li>
        </ul>
      </nav>
      <div className="wrapper">
        <header>
          <div className="profileImg">
            <Thumbnail size={40} imageUrl={profile} />
          </div>

          <div className="changeProfile" tabIndex={-1}>
            <dt className="a11y-hidden">user_id</dt>
            <dd className="thumbnail-click">{user_id}</dd>
            {pageName === '/edit/profile' && (
              <>
                <label htmlFor="fileupload">프로필 사진 바꾸기</label>
                <input
                  type="file"
                  id="fileupload"
                  name="fildupload"
                  className="a11y-hidden"
                  tabIndex={-1}
                  // onChange={isSelectedImg}
                  accept="image/png, image/jpeg"
                />
              </>
            )}
          </div>
        </header>
        {pageName === '/edit/password' && <EditPassword />}
        {pageName === '/edit/profile' && <EditProfile profile={profile} userId={user_id} userName={user_name} userEmail={user_email} />}
        {pageName === '/edit/account' && <Secession />}
      </div>
    </StyledDiv>
  );
}
