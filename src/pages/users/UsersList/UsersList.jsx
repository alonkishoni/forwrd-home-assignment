import { Box, CircularProgress, Container, Paper } from '@mui/material';
import { useUsersContext } from '../../../context/usersContext';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { UsersListFooter } from './UsersListFooter/UsersListFooter.jsx';
import { UsersListHeader } from './UsersListHeader/UsersListHeader.jsx';
import { useDebounce } from '../../../hooks/useDebounce.hook.jsx';
import { useErrorsContext } from '../../../context/errorsContext.jsx';
import { VirtualizedRowWrapper } from '../UserRow/VirtualizedRowWrapper/VirtualizedRowWrapper.jsx';
import { filterUsers } from '../../../utils/filterUsers.utils.js';

function UsersList() {
  const { isLoading, users, setUsers } = useUsersContext();
  const { errorCounts, deleteErrorById } = useErrorsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [tempUsers, setTempUsers] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredTempUsers = useMemo(
    () => filterUsers(tempUsers, debouncedSearchTerm),
    [tempUsers, debouncedSearchTerm]
  );

  const handleInputChange = useCallback((userId, field, value) => {
    setTempUsers((prevUsers) => {
      const userIndex = prevUsers.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        const updatedUsers = [...prevUsers];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], [field]: value };
        return updatedUsers;
      }
      return prevUsers;
    });
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    const newUser = {
      id: new Date().getTime(),
      name: '',
      country: '',
      email: '',
      phone: '',
      isNew: true,
    };
    setTempUsers((prevUsers) => [newUser, ...prevUsers]);
  }, []);

  const handleDelete = useCallback(
    (userId) => {
      setTempUsers((prevUsers) => {
        const userIndex = prevUsers.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
          const updatedUsers = [...prevUsers];
          updatedUsers.splice(userIndex, 1);
          return updatedUsers;
        }
        return prevUsers;
      });

      deleteErrorById(userId);
    },
    [deleteErrorById]
  );

  const handleSave = useCallback(() => {
    setUsers(tempUsers);
  }, [setUsers, tempUsers]);

  const itemData = useMemo(
    () => ({
      filteredTempUsers,
      handleDelete,
      handleInputChange,
    }),
    [filteredTempUsers, handleDelete, handleInputChange]
  );

  useEffect(() => {
    !tempUsers.length && setTempUsers(users);
  }, [tempUsers.length, users]);

  return (
    <>
      <Container style={{ paddingInline: '0px' }}>
        <UsersListHeader
          handleAdd={handleAdd}
          handleSearch={handleSearchChange}
          numberOfResults={filteredTempUsers.length}
          searchTerm={searchTerm}
        />

        <Container
          style={{
            height: 'calc(100vh - 200px)',
            position: 'absolute',
            bottom: '58px',
            left: 0,
            right: 0,
          }}
        >
          {filteredTempUsers.length && !isLoading ? (
            <FixedSizeList
              height={780}
              itemSize={48}
              itemCount={filteredTempUsers.length}
              itemData={itemData}
              itemKey={(index, data) => data.filteredTempUsers?.[index]?.id}
            >
              {VirtualizedRowWrapper}
            </FixedSizeList>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100%"
            >
              {!filteredTempUsers.length && !isLoading ? (
                <Paper style={{ padding: '20px' }}>Oops! no results found...</Paper>
              ) : (
                <Paper style={{ padding: '20px' }}>
                  <CircularProgress color="inherit" />.
                </Paper>
              )}
            </Box>
          )}
        </Container>
      </Container>

      <UsersListFooter errorCounts={errorCounts} handleSave={handleSave} />
    </>
  );
}

export default memo(UsersList);
