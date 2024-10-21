import { AppBar, Toolbar, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button component={RouterLink} to="/" color="inherit">
          Users
        </Button>
        <Button component={RouterLink} to="charts" color="inherit">
          Statistics
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
