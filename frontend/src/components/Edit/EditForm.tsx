import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StyledDiv } from './EditFormStyle';
import Thumbnail from '../common/Thumbnail';
// import RootState from '../../type';
// import { useSelector } from 'react-redux';
import EditPassword from './EditPassword';
import EditProfile from './EditProfile';
import DeleteAccount from './DeleteAccount';
import uploadService from '../../redux/services/uploadService';
import { changeUserProfile } from '../../redux/modules/userInfo';
import { IEdit } from '../../containers/EditContainer';

export interface EditFormProps {
  edit: {
    user_profile?: string;
    user_name?: string;
    user_id?: string;
    user_introduce?: string;
    user_email?: string;
    user_phone?: string;
    user_gender?: string;
  };
  user: {
    user_profile?: string;
    user_name?: string;
    user_id?: string;
    user_introduce?: string;
    user_email?: string;
    user_phone?: string;
    user_gender?: string;
  };
  handleChange: (edit: IEdit) => void;
  changeProfile: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteAccount?: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function EditForm({ edit, user, handleChange, changeProfile, deleteAccount }: EditFormProps) {
  // const { user } = useSelector((state: RootState) => state.userInfo);
  // const profile = user !== null ? user.user_profile : null;
  const pageName = useLocation().pathname;

  // 프로필 사진 변경
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState<string | null>(null);
  useEffect(() => {
    if (!imageURL) return;
    dispatch(changeUserProfile(imageURL));
  }, [dispatch, imageURL]);
  const isSelectedImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const res = await uploadService.UserProFile(event.target.files.item(0), localStorage.getItem('access_token'));
    setImageURL(res);
  };
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
            <Thumbnail size={40} imageUrl={user.user_profile} />
          </div>

          <div className="changeProfile" tabIndex={-1}>
            <dt className="a11y-hidden">user_id</dt>
            <dd className="thumbnail-click">{user.user_id}</dd>
            {pageName === '/edit/profile' && (
              <>
                <label htmlFor="fileupload">프로필 사진 바꾸기</label>
                <input
                  type="file"
                  id="fileupload"
                  name="fildupload"
                  className="a11y-hidden"
                  tabIndex={-1}
                  onChange={isSelectedImg}
                  accept="image/png, image/jpeg"
                />
              </>
            )}
            {/* {img && <Thumbnail />} */}
          </div>
        </header>
        {pageName === '/edit/password' && <EditPassword />}
        {pageName === '/edit/profile' && (
          <EditProfile
            // profile={edit.user_profile}
            user={user}
            changeProfile={changeProfile}
            // userId={edit.user_id}
            // userName={edit.user_name}
            // userEmail={edit.user_email}
            edit={edit}
            handleChange={handleChange}
          />
        )}
        {pageName === '/edit/account' && <DeleteAccount deleteAccount={deleteAccount} />}
      </div>
    </StyledDiv>
  );
}
