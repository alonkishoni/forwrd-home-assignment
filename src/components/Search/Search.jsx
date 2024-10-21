import { useState } from 'react';
import { Avatar, InputBase, Stack } from '@mui/material';

export const Search = ({ value, onChange, resultsLength }) => {
  const [focused, setFocused] = useState(false);

  return (
    <Stack
      style={{
        borderRadius: '50px',
        border: focused ? '2px #1876d2 solid' : '1px #cccccc solid',
        paddingInline: '4px',
      }}
      alignItems={'center'}
      direction={'row'}
    >
      <InputBase
        value={value}
        sx={{
          ml: 1,
          flex: 1,
          width: focused ? '200px' : '70px',
          transition: 'width 0.3s',
        }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
      />
      <Avatar
        style={{
          backgroundColor: focused ? '#1876d2' : '#bdbdbd',
          width: 24,
          height: 24,
          fontSize: 14,
        }}
      >
        {resultsLength}
      </Avatar>{' '}
    </Stack>
  );
};
