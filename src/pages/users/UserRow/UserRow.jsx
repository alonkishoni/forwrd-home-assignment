import { Grid, IconButton } from '@mui/material';
import { memo, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UserField from '../UserField/UserField.jsx';
import { useErrorsContext } from '../../../context/errorsContext.jsx';
import { countryOptions } from '../../../consts/consts.js';

const UserRow = ({
  style,
  handleDelete,
  handleInputChange,
  user,
  fields = ['name', 'country', 'email', 'phone'],
}) => {
  const { errors, handleFieldChange } = useErrorsContext();

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      handleInputChange(user.id, name, value);
      handleFieldChange(user.id, name, value);
    },
    [handleFieldChange, handleInputChange, user.id]
  );

  const handleDeleteClick = useCallback(() => {
    handleDelete(user.id);
  }, [handleDelete, user.id]);

  return (
    <div style={style}>
      <Grid container padding={0.5} spacing={1}>
        {fields.map((fieldName) => {
          const isCountryField = fieldName === 'country';
          const existingError = errors?.[user.id]?.[fieldName];

          return (
            <Grid key={fieldName} item xs={isCountryField ? 2 : 3}>
              <UserField
                key={fieldName}
                select={isCountryField}
                options={isCountryField ? countryOptions : null}
                name={fieldName}
                value={user?.[fieldName]}
                error={existingError?.invalid || existingError?.empty}
                handleChange={handleChange}
              />
            </Grid>
          );
        })}
        <Grid item xs={1}>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(UserRow, (prevProps, nextProps) => {
  return (
    prevProps.user === nextProps.user &&
    prevProps.handleDelete === nextProps.handleDelete &&
    prevProps.handleInputChange === nextProps.handleInputChange &&
    prevProps.style === nextProps.style
  );
});
