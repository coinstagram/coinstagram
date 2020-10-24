import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editSagaActionCreator } from '../redux/modules/edit';

// import EditName from '../components/Edit/EditName';
import EditForm from '../components/Edit/EditForm';
import EditProfile from '../components/Edit/EditProfile';
import EditPassword from '../components/Edit/EditPassword';

export interface IEdit {
  user_name: string;
  user_introduce: string;
  user_phone: string;
  user_email: string;
  user_profile: string;
  user_gender: string;
}
function EditContainer() {
  // const [user_name, setName] = useState('');
  // const [user_introduce, setIntroduce] = useState('');
  // const [user_phone, setPhone] = useState('');
  // const [user_email, setEmail] = useState('');
  // const [user_profile, setProfile] = useState('');
  // const [user_password, setPassword] = useState('');

  // const onInputName = (text: string): void => {
  //   setName(text);
  // };
  // const onInputIntroduce = (text: string): void => {
  //   setIntroduce(text);
  // };
  // const onInputPhone = (text: string): void => {
  //   setPhone(text);
  // };
  // const onInputEmail = (text: string): void => {
  //   setEmail(text);
  // };
  // const onInputProfile = (text: string): void => {
  //   setProfile(text);
  // };
  // const onInputPassword = (text: string): void => {
  //   setPassword(text);
  // };
  const [edit, setEdit] = useState<IEdit>({
    user_name: '',
    user_introduce: '',
    user_phone: '',
    user_email: '',
    user_profile: '',
    user_gender: '',
  });

  const handleChange = (edit: IEdit): void => {
    setEdit(edit);
  };
  const { user_name, user_introduce, user_phone, user_email, user_profile, user_gender } = edit;
  const dispatch = useDispatch();
  const changeProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editSagaActionCreator(user_name, user_introduce, user_phone, user_email, user_profile, user_gender));
  };
  return (
    <section>
      <h3 className="a11y-hidden">profile edit</h3>
      <form onSubmit={changeProfile}>
        <EditForm edit={edit} handleChange={handleChange} />
        {/* <EditProfile userName={user_name} userIntroduce={user_introduce} userPhone={user_phone} userEmail={user_email} userProfile={user_profile} onInputName={onInputName} onInputIntroduce={onInputIntroduce} onInputPhone={onInputPhone} onInputEmail={onInputEmail} onInputProfile={onInputProfile} /> */}
        {/* <EditProfile edit={edit} setEdit={setEdit}/> */}
      </form>
    </section>
  );
}

export default React.memo(EditContainer);
