import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editSagaActionCreator, deleteSagaActionCreator } from '../redux/modules/userInfo';
import RootState from '../type';
import { useSelector } from 'react-redux';
import EditForm from '../components/Edit/EditForm';
import uploadService from '../redux/services/uploadService';
import TokenService from '../redux/services/tokenService';
import { logout } from '../redux/modules/auth';

export interface IEdit {
  // user_profile: string;
  user_name?: string;
  user_introduce?: string;
  user_email?: string;
  user_phone?: string;
  user_gender?: string;
}
function EditContainer() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userInfo);
  const profile = user !== null ? user.user_profile : null;
  const name = user !== null ? user.user_name : null;
  const id = user !== null ? user.user_id : null;
  const introduce = user !== null ? user.user_introduce : null;
  const email = user !== null ? user.user_email : null;
  const phone = user !== null ? user.user_phone : null;
  const gender = user !== null ? user.user_gender : null;

  const [edit, setEdit] = useState<IEdit>({
    user_name: name,
    user_introduce: introduce,
    user_email: email,
    user_phone: phone,
    user_gender: gender,
  });
  const [imageURL, setImageURL] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };

  useEffect(() => {
    setEdit({
      user_name: name,
      user_introduce: introduce,
      user_email: email,
      user_phone: phone,
      user_gender: gender,
    });
    setImageURL(profile);
  }, [email, gender, introduce, name, phone, profile, user]);

  const isSelectedImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const res = await uploadService.UserProFile(event.target.files.item(0), localStorage.getItem('access_token'));
    setImageURL(res);
  };

  const changeProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editSagaActionCreator(imageURL, edit.user_name, id, edit.user_introduce, edit.user_email, edit.user_phone, edit.user_gender));
  };
  const deleteAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteSagaActionCreator(id));
    dispatch(logout());
    TokenService.remove();
  };
  return (
    <section>
      <h3 className="a11y-hidden">profile edit</h3>
      <EditForm
        edit={edit}
        user={user}
        imageURL={imageURL}
        onChange={onChange}
        changeProfile={changeProfile}
        isSelectedImg={isSelectedImg}
        deleteAccount={deleteAccount}
      />
    </section>
  );
}

export default React.memo(EditContainer);
