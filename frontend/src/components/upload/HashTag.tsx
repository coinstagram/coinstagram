import React, { useState, useRef, useEffect } from 'react';
import { contextValue } from '../../containers/UploadContainer';
import StyledDiv from './HashTagStyle';

interface HashTagProps {
  hasTag: (tag: Array<string>) => void;
  data: contextValue;
}

export default function HashTag({ hasTag, data }: HashTagProps) {
  const [tags, setTags] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    hasTag(tags);
  }, [hasTag, tags]);

  useEffect(() => {
    if (data.tag.length === 0) return;
    setTags(data.tag);
  }, [data.tag]);

  return (
    <StyledDiv>
      <ul className="hashTagList">
        <label htmlFor="hashTag">태그하기</label>
        {tags.map((tag, i) => (
          <li key={tag} className="hashTagItem">
            {tag}
            <button type="button" onClick={() => removeTag(i)}>
              x
            </button>
          </li>
        ))}
        <li className="inputTag">
          <input type="text" id="hashTag" onKeyDown={inputKeyDown} ref={inputRef} placeholder="#hashTag" />
        </li>
      </ul>
    </StyledDiv>
  );

  function removeTag(i: number) {
    setTags(tags.filter((tag, index) => index !== i));
  }

  function inputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const val = (e.target as HTMLInputElement).value;
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag === `#${val}`) || val.length > 10) return;
      if (tags.length >= 5) return;
      setTags([...tags, `#${val}`]);
      inputRef.current.value = null;
    }
  }
}
