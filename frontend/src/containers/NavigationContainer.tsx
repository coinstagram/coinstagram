import React from 'react';
import RootState from '../type';
import { useSelector } from 'react-redux';

// components
import Navigation from '../components/header/Navigation';

function NavigationContainer() {
  const { user } = useSelector((state: RootState) => state.userInfo);
  const profile = user !== null ? user.user_profile : null;
  const userId = user !== null ? user.user_id : null;

  return <Navigation imageUrl={profile} userId={userId} />;
}

export default NavigationContainer;
