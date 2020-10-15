import React from 'react';
import { useLocation } from 'react-router-dom';

function TagedPosts() {
  const tag = useLocation().pathname.split('/')[3];
  return <div>{tag}</div>;
}

export default TagedPosts;
