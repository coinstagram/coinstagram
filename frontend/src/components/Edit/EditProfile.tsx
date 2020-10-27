import React from 'react';
import Thumbnail from '../common/Thumbnail';
import { StyledArticle } from './EditProfileStyle';
import { EditFormProps } from './EditForm';

// interface EditProfileProps extends EditFormProps {
// userName: string;
// userIntroduce: string;
// userPhone: string;
// userEmail: string;
// userProfile: string;
// onInputName?: (text: string) => void;
// onInputIntroduce?: (text: string) => void;
// onInputPhone?: (text: string) => void;
// onInputEmail?: (text: string) => void;
// onInputProfile?: (text: string) => void;
// profile: string;
// userId: string;
// userName: string;
// userEmail: string;
// edit : {
//   user_name: string,
//   user_introduce: string,
//   user_phone: string,
//   user_email: string,
//   user_profile:string,
// }
// setEdit : (text: string) => void;
// }

// function EditProfile({ userName, userIntroduce, userPhone, userEmail, userProfile, onInputName, onInputIntroduce, onInputPhone, onInputEmail, onInputProfile}: EditProfileProps) {
function EditProfile({ user, edit, handleChange, changeProfile }: EditFormProps) {
  // const { user_profile, user_name, user_id, user_introduce, user_email, user_phone, user_gender } = edit;

  // const profile = user !== null ? user.user_profile : null;
  // const name = user !== null ? user.user_name : null;
  // const id = user !== null ? user.user_id : null;
  // const introduce = user !== null ? user.user_introduce : null;
  // const email = user !== null ? user.user_email : null;
  // const phone = user !== null ? user.user_phone : null;
  // const gender = user !== null ? user.user_gender : null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    handleChange({
      ...edit,
      [name]: value,
    });
  };

  return (
    <StyledArticle>
      <form onSubmit={changeProfile}>
        <div className="mainForm">
          {/* <form onSubmit={changeProfile}> */}
          <div className="nameWrapper">
            <div className="label">
              <label htmlFor="user_name">이름</label>
            </div>
            <div className="nameInput">
              <input type="text" id="user_name" name="user_name" placeholder="이름" onChange={onChange} value={edit.user_name} />
              <small>
                사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요. 이름은 14일안에
                두 번만 변경할 수 있습니다.
              </small>
            </div>
          </div>
          <div className="userIdWrapper">
            <div className="label">
              <label htmlFor="user_id">사용자 ID</label>
            </div>
            <div className="userIdInput">
              <input type="text" id="user_id" name="user_id" placeholder="사용자 ID" value={edit.user_id} onChange={onChange} />
              <small>대부분의 경우 14일 이내에 사용자 이름을 다시 {edit.user_id}(으)로 변경할 수 있습니다.</small>
            </div>
          </div>
          {/* <div className="websiteWrapper">
          <div className="label">
            <label htmlFor="website">웹사이트</label>
          </div>
          <input type="text" id="website" placeholder="웹사이트" />
        </div> */}
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
          {/* </form> */}
        </div>
      </form>
    </StyledArticle>
  );
}

export default EditProfile;
