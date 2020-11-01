import React from 'react';
import { StyledArticle } from './EditProfileStyle';
import { EditFormProps } from './EditForm';

function EditProfile({ user, edit, onChange, changeProfile }: EditFormProps) {
  // function EditProfile({ user, edit, handleChange, changeProfile }: EditFormProps) {
  // const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value, name } = e.target;
  //   handleChange({
  //     ...edit,
  //     [name]: value,
  //   });
  // };

  return (
    <StyledArticle>
      <form onSubmit={changeProfile}>
        <div className="mainForm">
          <div className="nameWrapper">
            <div className="label">
              <label htmlFor="user_name">이름</label>
            </div>
            <div className="nameInput">
              <input type="text" id="user_name" name="user_name" placeholder="이름" onChange={onChange} value={edit.user_name} />
              <small>사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.</small>
            </div>
          </div>
          <div className="introductionWrapper">
            <div className="label">
              <label htmlFor="user_introduce">소개</label>
            </div>
            <textarea id="user_introduce" name="user_introduce" value={edit.user_introduce} onChange={onChange} />
          </div>
          <div className="emailWrapper">
            <div className="label">
              <label htmlFor="user_email">이메일</label>
            </div>
            <input type="email" id="user_email" name="user_email" placeholder="이메일" value={edit.user_email} onChange={onChange} />
          </div>
          <div className="phoneWrapper">
            <div className="label">
              <label htmlFor="user_phone">전화번호</label>
            </div>
            <input type="phone" id="user_phone" name="user_phone" placeholder="전화번호" value={edit.user_phone} onChange={onChange} />
          </div>
          <div className="genderWrapper">
            <div className="label">
              <label htmlFor="user_gender">성별</label>
            </div>
            <select name="user_gender" id="user_gender" value={edit.user_gender} onChange={onChange}>
              <option>--- 성별 선택 ---</option>
              <option value="male">남자</option>
              <option value="female">여자</option>
            </select>
          </div>
          <div className="btnWrapper">
            <div className="label" />
            <button type="submit">제출</button>
          </div>
        </div>
      </form>
    </StyledArticle>
  );
}

export default EditProfile;
