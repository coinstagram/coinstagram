import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editSagaActionCreator, deleteSagaActionCreator } from '../redux/modules/userInfo';
import RootState from '../type';
import { useSelector } from 'react-redux';
import EditForm from '../components/Edit/EditForm';
import uploadService from '../redux/services/uploadService';
import TokenService from '../redux/services/tokenService';
import { logout } from '../redux/modules/auth';
import { changeUserProfile } from '../redux/modules/userInfo';

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
  // const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.userInfo);
  console.log(user);
  // useEffect(() => {
  //   if (token === null) return;
  //   dispatch(getUserInfoSaga());
  // }, [dispatch, token]);
  // const [edit, setEdit] = useState<IEdit>({
  //   user_name: '',
  //   user_introduce: '',
  //   user_email: '',
  //   user_phone: '',
  //   user_gender: '',
  // });
  // const name = user !== null ? user.user_name : edit.user_name;
  // const id = user !== null ? user.user_id : null;
  // const introduce = user !== null ? user.user_introduce : edit.user_introduce;
  // const email = user !== null ? user.user_email : edit.user_email;
  // const phone = user !== null ? user.user_phone : edit.user_phone;
  // const gender = user !== null ? user.user_gender : edit.user_gender;
  const profile = user !== null ? user.user_profile : null;
  const name = user !== null ? user.user_name : null;
  const id = user !== null ? user.user_id : null;
  const introduce = user !== null ? user.user_introduce : null;
  const email = user !== null ? user.user_email : null;
  const phone = user !== null ? user.user_phone : null;
  const gender = user !== null ? user.user_gender : null;

  const [edit, setEdit] = useState<IEdit>({
    // user_profile: profile,
    user_name: name,
    user_introduce: introduce,
    user_email: email,
    user_phone: phone,
    user_gender: gender,
  });
  // const handleChange = (edit: IEdit): void => {
  //   setEdit(edit);
  // };
  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
    console.log('check');
  };

  useEffect(() => {
    setEdit({
      // user_profile: profile,
      user_name: name,
      user_introduce: introduce,
      user_email: email,
      user_phone: phone,
      user_gender: gender,
    });
  }, [email, gender, introduce, name, phone, user]);

  const [imageURL, setImageURL] = useState<string | null>(null);
  // useEffect(() => {
  //   if (!imageURL) return;
  //   dispatch(changeUserProfile(imageURL));
  // }, [dispatch, imageURL]);

  const isSelectedImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const res = await uploadService.UserProFile(event.target.files.item(0), localStorage.getItem('access_token'));
    setImageURL(res);
  };

  const changeProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editSagaActionCreator(imageURL, edit.user_name, id, edit.user_introduce, edit.user_email, edit.user_phone, edit.user_gender));
    // dispatch(editSagaActionCreator(imageURL, edit.user_name, id, edit.user_introduce, edit.user_email, edit.user_phone, edit.user_gender));
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
        // handleChange={handleChange}
        onChange={onChange}
        changeProfile={changeProfile}
        isSelectedImg={isSelectedImg}
        deleteAccount={deleteAccount}
      />
    </section>
  );
}

export default React.memo(EditContainer);
