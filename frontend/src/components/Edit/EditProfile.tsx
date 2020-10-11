import React from 'react';
import Thumbnail from '../common/Thumbnail';
import { StyledArticle } from './EditProfileStyle';

interface EditProfileProps {
  profile: string;
  userId: string;
  userName: string;
  userEmail: string;
}
function EditProfile({ profile, userId, userName, userEmail }: EditProfileProps) {
  return (
    <StyledArticle>
      <div className="mainForm">
        <form>
          <div className="nameWrapper">
            <div className="label">
              <label htmlFor="name">이름</label>
            </div>
            <div className="nameInput">
              <input type="text" id="name" placeholder="이름" value={userName} />
              <small>
                사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요. 이름은 14일안에
                두 번만 변경할 수 있습니다.
              </small>
            </div>
          </div>
          <div className="userIdWrapper">
            <div className="label">
              <label htmlFor="userId">사용자 이름</label>
            </div>
            <div className="userIdInput">
              <input type="text" id="userId" placeholder="사용자 이름" value={userId} />
              <small>대부분의 경우 14일 이내에 사용자 이름을 다시 hello_test88(으)로 변경할 수 있습니다.</small>
            </div>
          </div>
          <div className="websiteWrapper">
            <div className="label">
              <label htmlFor="website">웹사이트</label>
            </div>
            <input type="text" id="website" placeholder="웹사이트" />
          </div>
          <div className="introductionWrapper">
            <div className="label">
              <label htmlFor="introduction">소개</label>
            </div>
            <textarea id="introduction" />
          </div>
          <div className="emailWrapper">
            <div className="label">
              <label htmlFor="email">이메일</label>
            </div>
            <input type="email" id="email" placeholder="이메일" value={userEmail} />
          </div>
          <div className="phoneWrapper">
            <div className="label">
              <label htmlFor="phone">전화번호</label>
            </div>
            <input type="phone" id="phone" placeholder="전화번호" />
          </div>
          <div className="sexWrapper">
            <div className="label">성별</div>
            <input type="text" id="sex" placeholder="성별" />
          </div>
          <div className="btnWrapper">
            <div className="label" />
            <button type="submit">제출</button>
          </div>
        </form>
      </div>
    </StyledArticle>
  );
}

export default EditProfile;
