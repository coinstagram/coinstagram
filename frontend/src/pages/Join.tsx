import React from 'react';
import styled, { css } from 'styled-components';
import appStoreDownload from '../resource/image/appStoreDownload.png';
import googleStoreDownload from '../resource/image/googleStoreDownload.png';
import Logo from '../components/Logo';

function Join() {
  const appStoreUrl = 'https://apps.apple.com/app/instagram/id389801252?vt=lo';
  const googleStoreUrl =
    'https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3DFCBD9B4D-5CBC-47AA-9CAF-3B50CC3BE3C0%26utm_content%3Dlo%26utm_medium%3Dbadge';

  const Wrapper = styled.div`
    width: 350px;
    margin: 0 auto;
  `;
  const JoinWrapper = styled.div`
    height: 542px;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    margin: 30px 0 10px 0;

    Logo {
    }
  `;
  const coinstagramLogo = styled.h1``;
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
        <Logo />
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
