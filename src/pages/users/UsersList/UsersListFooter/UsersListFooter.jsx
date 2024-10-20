import { Alert, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import { useMemo } from 'react';
import { useUsersContext } from '../../../../context/usersContext.jsx';

export const UsersListFooter = ({ errorCounter, handleSave }) => {
  const { isLoading } = useUsersContext();
  const hasSomeErrors = useMemo(
    () => !!(errorCounter.empty > 0 || errorCounter.invalid > 0),
    [errorCounter.empty, errorCounter.invalid]
  );
  return (
    <Paper style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <Box display="flex" justifyContent={hasSomeErrors ? 'space-between' : 'end'}>
        <Box display="flex">
          {!!errorCounter.invalid && (
            <Alert style={{ margin: '5px' }} variant="filled" severity="error">
              {errorCounter.invalid > 0 && ` ${errorCounter.invalid} invalid fields`}
            </Alert>
          )}
          {!!errorCounter.empty && (
            <Alert style={{ margin: '5px' }} variant="filled" severity="error">
              {errorCounter.empty > 0 && ` ${errorCounter.empty} empty fields`}
            </Alert>
          )}
        </Box>

        <BottomNavigation>
          <BottomNavigationAction
            disabled={isLoading || hasSomeErrors}
            onClick={handleSave}
            label="Recents"
            icon={
              <SaveIcon
                color={
                  !!errorCounter?.empty || !!errorCounter?.invalid
                    ? 'disabled'
                    : 'primary'
                }
              />
            }
          />
        </BottomNavigation>
      </Box>
    </Paper>
  );
};
