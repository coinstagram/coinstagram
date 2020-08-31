import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../lib/api/users';

const test = async () => {
  const a = await login();
  console.log(a.data);
};

function Logo() {
  return (
    <Link to="/">
      <h1>coInstagram</h1>
      <button onClick={test}>test</button>
    </Link>
  );
}

export default Logo;
