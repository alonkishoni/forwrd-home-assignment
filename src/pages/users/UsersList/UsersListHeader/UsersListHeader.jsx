import Box from '@mui/material/Box';
import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '../../../../components/Search/Search.jsx';

export const UsersListHeader = ({
  searchTerm,
  numberOfResults,
  handleSearch,
  handleAdd,
}) => {
  return (
    <Box
      paddingBlock={2}
      direction={'row'}
      style={{
        width: '100%',
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Stack alignItems={'bottom'} direction="row" spacing={2}>
        <Typography variant="h4">Users List</Typography>
        <Search
          value={searchTerm}
          onChange={handleSearch}
          resultsLength={numberOfResults}
        />
      </Stack>
      <Stack alignItems={'center'} direction="row" spacing={2}>
        <Button onClick={handleAdd}>
          <AddIcon />
        </Button>
      </Stack>
    </Box>
  );
};
