import React from 'react';
import styled, { css } from 'styled-components';
import appStoreDownload from '../resource/image/appStoreDownload.png';
import googleStoreDownload from '../resource/image/googleStoreDownload.png';
import { StyledH1 } from '../components/Logo';

function Join() {
  const appStoreUrl = 'https://apps.apple.com/app/instagram/id389801252?vt=lo';
  const googleStoreUrl =
    'https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3DFCBD9B4D-5CBC-47AA-9CAF-3B50CC3BE3C0%26utm_content%3Dlo%26utm_medium%3Dbadge';

  const Wrapper = styled.div`
    width: 350px;
    margin: 0 auto;
  `;
  const JoinWrapper = styled.div`
    width: 100%;
    height: 542px;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    margin: 30px 0 10px 0;
    padding: 0 40px;
    box-sizing: border-box;

    .policy {
      color: #828282;
      padding: 20px 10px 10px;
      display: block;
      text-align: center;
    }
  `;
  const Header = styled.div`
    height: 150px;
  `;
  const MainLogo = styled(StyledH1)`
    font-size: 50px;
    text-align: center;
    margin-top: 30px;
    font-weight: 600;
  `;
  const StyledH2 = styled.h2`
    color: #828282;
    font-size: 1.2rem;
    text-align: center;
    margin: 10px 0;
  `;
  const OrBorder = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0 20px;

    .leftLine,
    .rightLine {
      height: 1px;
      background: #dbdbdb;

      width: 100%;
      position: relative;
      top: 0.65em;
    }

    .or {
      margin: 0 18px;
      color: #828282;
      font-weight: bold;
      white-space: nowrap;
      font-size: 0.9em;
    }
  `;

  const Join = styled.form`
    input {
      background: #fafafa;
      color: #828282;
      border: 1px solid #dbdbdb;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 3px;
    }
  `;
  const JoinButton = styled.button`
    display: block;
    background: #b2dffc;
    color: white;
    font-weight: bold;
    text-align: center;
    width: 100%;
    height: 30px;
    border-radius: 3px;
  `;

  const AskLoginWrapper = styled.div`
    height: 70px;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    text-align: center;
    padding: 10px 0;
    margin: 0 0 10px;
    box-sizing: border-box;

    .login {
      color: #0095f6;
    }
  `;
  const AppDownloadWrapper = styled.div`
    height: 102px;
    margin: 10px auto;

    p {
      text-align: center;
    }
  `;
  const AppDownload = styled.div`
    width: 100%;
    text-align: center;
    img {
      width: 136px;
      height: 40px;
      margin: 5px;
    }
  `;
  return (
    <Wrapper>
      <JoinWrapper>
        <Header>
          <MainLogo>coInstagram</MainLogo>

          <StyledH2>친구들의 사진과 동영상을 보려면 가입하세요.</StyledH2>
        </Header>
        <OrBorder>
          <div className="leftLine"></div>
          <div className="or">또는</div>
          <div className="rightLine"></div>
        </OrBorder>
        <Join>
          <input
            type="text"
            name="phoneNumber"
            placeholder="휴대폰 또는 이메일 주소"
            size={34}
          />
          <input type="text" name="userName" placeholder="성명" size={34} />
          <input
            type="text"
            name="userId"
            placeholder="사용자 이름"
            size={34}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            size={34}
          />
        </Join>
        <JoinButton type="submit">가입</JoinButton>
        <small className="policy">
          가입하면 Instagram의 <b>약관, 데이터 정책</b> 및 <b>쿠키 정책</b>에
          동의하게 됩니다.
        </small>
      </JoinWrapper>
      <AskLoginWrapper>
        {/* 로그인 페이지 라우팅 구현 필요 */}
        <p>
          계정이 있으신가요? <b className="login">로그인</b>
        </p>
      </AskLoginWrapper>
      <AppDownloadWrapper>
        <p>앱을 다운로드하세요.</p>
        <AppDownload>
          <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
            <img src={appStoreDownload} alt="appStoreDownload" />
          </a>
          <a href={googleStoreUrl} target="_blank" rel="noopener noreferrer">
            <img src={googleStoreDownload} alt="googleStoreDownload" />
          </a>
        </AppDownload>
      </AppDownloadWrapper>
    </Wrapper>
  );
}

export default Join;
