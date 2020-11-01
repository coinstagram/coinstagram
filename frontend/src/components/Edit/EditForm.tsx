import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { StyledDiv } from './EditFormStyle';
import Thumbnail from '../common/Thumbnail';
import EditPassword from './EditPassword';
import EditProfile from './EditProfile';
import DeleteAccount from './DeleteAccount';
import { IEdit } from '../../containers/EditContainer';

export interface EditFormProps {
  edit: IEdit;
  user: {
    user_profile?: string;
    user_name?: string;
    user_id?: string;
    user_introduce?: string;
    user_email?: string;
    user_phone?: string;
    user_gender?: string;
  };
  isSelectedImg?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  // handleChange: (edit: IEdit) => void;
  changeProfile: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteAccount?: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function EditForm({ edit, user, onChange, isSelectedImg, changeProfile, deleteAccount }: EditFormProps) {
  const pageName = useLocation().pathname;

  // const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value, name } = e.target;
  //   handleChange({
  //     ...edit,
  //     [name]: value,
  //   });
  // };

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
            <Thumbnail size={40} imageUrl={user && user.user_profile} />
          </div>
          <div className="changeProfile" tabIndex={-1}>
            <dt className="a11y-hidden">{user && user.user_id}</dt>
            <dd className="thumbnail-click">{user && user.user_id}</dd>
            {pageName === '/edit/profile' && (
              <>
                <label htmlFor="fileupload">프로필 사진 바꾸기</label>
                <input
                  type="file"
                  id="fileupload"
                  name="user_profile"
                  className="a11y-hidden"
                  tabIndex={-1}
                  // value={edit.user_profile}
                  onChange={isSelectedImg}
                  accept="image/png, image/jpeg"
                />
              </>
            )}
          </div>
        </header>
        {pageName === '/edit/profile' && <EditProfile user={user} changeProfile={changeProfile} edit={edit} onChange={onChange} />}
        {pageName === '/edit/password' && <EditPassword />}
        {pageName === '/edit/account' && <DeleteAccount deleteAccount={deleteAccount} />}
      </div>
    </StyledDiv>
  );
}
