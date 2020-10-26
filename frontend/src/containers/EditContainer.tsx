import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editSagaActionCreator } from '../redux/modules/edit';
import RootState from '../type';
import { useSelector } from 'react-redux';
import EditForm from '../components/Edit/EditForm';

export interface IEdit {
  user_profile: string;
  user_name: string;
  user_id: string;
  user_introduce: string;
  user_email: string;
  user_phone: string;
  user_gender: string;
}
function EditContainer() {
  const { user } = useSelector((state: RootState) => state.userInfo);
  const profile = user !== null ? user.user_profile : null;
  const name = user !== null ? user.user_name : null;
  const id = user !== null ? user.user_id : null;
  const introduce = user !== null ? user.user_introduce : null;
  const email = user !== null ? user.user_email : null;
  const phone = user !== null ? user.user_phone : null;
  const gender = user !== null ? user.user_gender : null;
  const [edit, setEdit] = useState<IEdit>({
    user_profile: profile,
    user_name: name,
    user_id: id,
    user_introduce: introduce,
    user_email: email,
    user_phone: phone,
    user_gender: gender,
  });
  // const [edit, setEdit] = useState<IEdit>({
  //   user_profile: '',
  //   user_name: '',
  //   user_id: '',
  //   user_introduce: '',
  //   user_email: '',
  //   user_phone: '',
  //   user_gender: '',
  // });

  // const profile = edit.user_profile ? edit.user_profile : user.user_profile;
  // const name = edit.user_name ? edit.user_name : user.user_name;
  // const id = edit.user_id ? edit.user_id : user.user_id;
  // const introduce = edit.user_introduce ? edit.user_introduce : user.user_introduce;
  // const email = edit.user_email ? edit.user_email : user.user_email;
  // const phone = edit.user_phone ? edit.user_phone : user.user_phone;
  // const gender = edit.user_gender ? edit.user_gender : user.user_gender;

  // const { user } = useSelector((state: RootState) => state.userInfo);
  // const profile = edit.user_profile;
  // const name = edit.user_name;
  // const id = edit.user_id;
  // const introduce = edit.user_introduce;
  // const email = edit.user_email;
  // const phone = edit.user_phone;
  // const gender = edit.user_gender;

  const handleChange = (edit: IEdit): void => {
    setEdit(edit);
  };

  // const { user_name, user_introduce, user_phone, user_email, user_profile, user_gender } = edit;
  const dispatch = useDispatch();
  const changeProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      editSagaActionCreator(edit.user_profile, edit.user_name, edit.user_id, edit.user_introduce, edit.user_email, edit.user_phone, edit.user_gender),
      // editSagaActionCreator(profile, name, id, introduce, email, phone, gender),
    );
  };
  return (
    <section>
      <h3 className="a11y-hidden">profile edit</h3>
      <form onSubmit={changeProfile}>
        <EditForm edit={edit} user={user} handleChange={handleChange} />
        {/* <EditProfile userName={user_name} userIntroduce={user_introduce} userPhone={user_phone} userEmail={user_email} userProfile={user_profile} onInputName={onInputName} onInputIntroduce={onInputIntroduce} onInputPhone={onInputPhone} onInputEmail={onInputEmail} onInputProfile={onInputProfile} /> */}
        {/* <EditProfile edit={edit} setEdit={setEdit}/> */}
      </form>
    </section>
  );
}

export default React.memo(EditContainer);
