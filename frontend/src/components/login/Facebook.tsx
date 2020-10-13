import React, { useCallback } from 'react';
import FacebookLogin from 'react-facebook-login';

function Facebook() {
  const responseFacebook = (response: object) => {
    console.log(response);
  };

  const handleFBLogin = useCallback(({ email, name: username, id: password, picture, phone_number }) => {
    dispatch(
      startSocialSDKLogin({
        email,
        username,
        password,
        profile_img: picture && picture.data.url,
        phone_number,
      }),
    );
  }, []);

  return (
    <FacebookLogin appId="1462774423925554" autoLoad={true} scope="public_profile,email" fields="name,email,picture" callback={responseFacebook} />
  );
}

export default Facebook;
