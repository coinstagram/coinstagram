import React from 'react';
import styled from 'styled-components';
import appStoreDownload from '../../../src/resource/image/appStoreDownload.png';
import googleStoreDownload from '../../../src/resource/image/googleStoreDownload.png';

export default function JoinAppDownload() {
  const appStoreUrl = 'https://apps.apple.com/app/instagram/id389801252?vt=lo';
  const googleStoreUrl =
    'https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3DFCBD9B4D-5CBC-47AA-9CAF-3B50CC3BE3C0%26utm_content%3Dlo%26utm_medium%3Dbadge';

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
  );
}
