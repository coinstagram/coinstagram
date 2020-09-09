import React from 'react';
import {
  appStoreUrl,
  googleStoreUrl,
  AppDownload,
  AppDownloadWrapper,
} from './JoinAppDownload.style';
import appStoreDownload from '../../../src/resource/image/appStoreDownload.png';
import googleStoreDownload from '../../../src/resource/image/googleStoreDownload.png';

export default function JoinAppDownload() {
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
