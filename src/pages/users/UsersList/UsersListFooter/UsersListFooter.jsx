import {
  Alert,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useUsersContext } from '../../../../context/usersContext.jsx';

export const UsersListFooter = ({
  errorCounts: { invalid: invalidCount, empty: emptyCount },
  handleSave,
}) => {
  const { isLoading } = useUsersContext();
  const hasSomeErrors = !!(invalidCount > 0 || emptyCount > 0);
  const hasBothErrors = invalidCount > 0 && emptyCount > 0;

  return (
    <Paper style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <Box display="flex" justifyContent={hasSomeErrors ? 'space-between' : 'end'}>
        <Box display="flex">
          {(invalidCount > 0 || emptyCount > 0) && (
            <Alert style={{ margin: '5px' }} variant="filled" severity="error">
              {invalidCount > 0 &&
                ` ${invalidCount} invalid field${invalidCount > 1 ? 's' : ''}`}

              {emptyCount > 0 &&
                `${hasBothErrors ? ',' : ''} ${emptyCount} empty field${
                  emptyCount > 1 ? 's' : ''
                }`}
            </Alert>
          )}
        </Box>

        <BottomNavigation>
          <BottomNavigationAction
            disabled={isLoading || hasSomeErrors}
            onClick={handleSave}
            label="Recents"
            icon={<SaveIcon color={hasSomeErrors ? 'disabled' : 'primary'} />}
          />
        </BottomNavigation>
      </Box>
    </Paper>
  );
};
