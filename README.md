# coinstagram

![coinstagram_preview](https://user-images.githubusercontent.com/62285872/93996447-39ea4980-fdcd-11ea-8d23-0587d84a1286.gif)
<br/>
<a href="https://www.loom.com/share/9585f74b6b4d4c308a0dcbb78f1fc641">영상보기</a>

## 팀 소개

팀명: coinstagram

팀원: 이우성, 박해리, 태현

<br>

## 팀 주제

<a href="https://www.instagram.com/">instagram</a> clone coding

<br>

## 구현기능

<details>
    <summary>로그인</summary>
    <ol>
        <li>로그인</li>
        <li>회원가입</li>
    </ol>
</details>
<details>
    <summary>홈</summary>
    <ol>
        <li>내가 팔로우 한 계정들 슬라이드 기능</li>
        <li>게시물
            <div>A) 계정이름 (클릭 시 해당 계정페이지로 이동)</div>
            <div>B) 태그된 위치 (클릭 시 해당위치가 태그된 게시물 랜덤 뷰)</div>
            <div>
                <span>C) 더보기</span>
                <ul>
                    <li>팔로우취소</li>
                    <li>게시물로 이동</li>
                    <li>링크복사</li>
                    <li>취소</li>
                <ul>
            </div>
            <div>
                <span>D) 게시물 이미지</span>
                <ul>
                    <li>이미지 캐러셀</li>
                    <li>계정 태그 (클릭 시 해당 계정으로 이동)</li>
                </ul>
            </div>
            <div>E) 좋아요</div>
            <div>F) 댓글 말풍선 (클릭 시 게시물로 이동)</div>
            <div>G) 찜하기</div>
            <div>
                <span>H) 댓글</span>
                <ul>
                    <li>댓글 좋아요</li>
                    <li>댓글 모두보기 (클릭 시 모달 팝업)</li>
                    <li>다른 계정 @태그</li>
                </ul>
            </div>
        </li>
    </ol>
</details>


<details>
    <summary>게시물 업로드</summary>
    <ol>
        <li>이미지 업로드</li>
        <li>글 쓰기</li>
        <li>사람 태그</li>
        <li>위치 태그</li>
        <li>해쉬 태그</li>
    </ol>
</details>

<details>
    <summary>랜덤 뷰</summary>
    <ol>
        <li>레이지 로딩</li>
        <li>무한 로딩</li>
        <li>게시물 (클릭시 모달 팝업)</li>
    </ol>
</details>

<details>
    <summary>프로필</summary>
    <ol>
        <li>이미지 업로드</li>
        <li>프로필 편집 (클릭 시 설정 페이지로 이동)</li>
        <li>
        	<span>설정 버튼</span>
            <div>A) 비밀번호 변경</div>
            <div>B) 로그아웃</div>
            <div>C) 취소</div>
        </li>
        <li>
        	<span>하단 탭</span>
            <div>A) 게시물</div>
            <div>B) 저장됨</div>
            <div>C) 태그됨</div>
        </li>
        <li>
        	<span>설정</span>
            <div>A) 이름</div>
            <div>B) 사용자 이름</div>
            <div>C) 웹 사이트</div>
            <div>D) 웹 사이트</div>
            <div>E) 소개 코멘트</div>
            <div>F) 전화번호</div>
            <div>G) 성별</div>
            <div>
                <span>H) 비밀번호 변경 (클릭시 모달팝업)</span>
                <ul>
                    <li>이전 비밀번호 입력</li>
                    <li>새 비밀번호 입력</li>
                    <li>새 비밀번호 확인</li>
                    <li>비밀번호 최종 변경</li>
                    <li>비밀번호 찾기</li>
                </ul>
            </div>
        </li>
    </ol>
</details>
<details>
    <summary>검색</summary>
    <ol>
        <li>이름, 사용자 이름, (해쉬태그)로 검색</li>
        <li>자동완성</li>
    </ol>
</details>

<br>

## 사용기술

- 사용언어

  HTML5, CSS3, JS6+, TS v3.7.5

- 라이브러리

  React v16.13.1
  express v4.17.1

- API

  <details>
      <summary>목록</summary>
  	  <div>axios v0.2</div>
      <div>query-string v6.13.1</div>
      <div>redux-devtools-extension v2.13.8</div>
      <div>react-error-boundary v2.3.1</div>
      <div>react-icons v3.11</div>
      <div>react-redux v7.2.1</div>
      <div>react-router-dom v5.2</div>
      <div>connected-react-router v6.8</div>
      <div>redux v4.0.5</div>
      <div>redux-saga v1.1.3</div>
      <div>react-slick v0.27</div>
      <div>react-spinner</div>
      <div>styled-components v5.1.1</div>
      <div>@types/react v16.9.48</div>
      <div>@types/react-dom v16.9.8</div>
      <div>@types/reac-redux v7.1.9</div>
      <div>@types/react-router-dom v5.1.5</div>
      <div>@types/styled-components v5.1.2</div>
  </details>
  
- server & DB
  <details>
     <summary>목록</summary>
     <dif>jsonwebtoken v8.5.1</div>
     <div>multer v1.4.2</div>
     <div>nodemon v2.0.4</div>
     <div>bcrypt</div>
     <div>dotenv</div>
     <div>mysql2</div>
  </details>
<br>



## Design prototype

<a href="https://www.figma.com/file/8rmaBMo5bKoICpUrSlR34V/coinstagram-UI?node-id=0%3A1">![image](https://user-images.githubusercontent.com/62285872/91239936-9bda7380-e77b-11ea-8964-19df5bacddfb.png)</a>

<br>

## Flow Chart

![instargram_flowchart](https://user-images.githubusercontent.com/62285872/91688129-439cda80-eb9c-11ea-8c2b-0fa3f3d4f66c.png)
