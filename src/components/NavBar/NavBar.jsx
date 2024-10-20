import { AppBar, Toolbar, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button component={RouterLink} to="/users/list" color="inherit">
          Users
        </Button>
        <Button component={RouterLink} to="/users/statistics" color="inherit">
          Statistics
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
