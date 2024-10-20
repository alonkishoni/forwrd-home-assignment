import { MenuItem, TextField } from '@mui/material';
import { memo, useCallback } from 'react';

const TextSelect = ({
  name,
  value,
  error,
  handleChange,
  select = false,
  options = [],
  ...props
}) => {
  const onChangeHandler = useCallback(
    (e) => {
      handleChange(e);
    },
    [handleChange]
  );

  return (
    <TextField
      variant="outlined"
      select={select}
      options={options}
      name={name}
      size={'small'}
      fullWidth
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent',
          },
        },
      }}
      value={value}
      label={value === '' ? name.charAt(0).toUpperCase() + name.slice(1) : ''}
      error={error}
      onChange={onChangeHandler}
      {...props}
    >
      {select && options
        ? options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        : null}
    </TextField>
  );
};

export default memo(TextSelect);
