import React from 'react';
import { StyledArticle } from './EditPasswordStyle';

export default function EditPassword() {
  return (
    <StyledArticle>
      <form>
        <div className="previousWrapper">
          <div className="label">
            <label htmlFor="previous">이전 비밀번호</label>
          </div>
          <input type="password" id="previous" />
        </div>
        <div className="newWrapper">
          <div className="label">
            <label htmlFor="new">새 비밀번호</label>
          </div>
          <input type="password" id="new" />
        </div>
        <div className="checkWrapper">
          <div className="label">
            <label htmlFor="check">새 비밀번호 확인</label>
          </div>
          <input type="password" id="check" />
        </div>
        <div className="btnWrapper">
          <div className="label"></div>
          <button type="submit">비밀번호 변경</button>
        </div>
      </form>
    </StyledArticle>
  );
}
