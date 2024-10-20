import UsersList from './usersList/UsersList';
import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useUsersContext } from '../../context/usersContext.jsx';
import { ErrorsContextProvider } from '../../context/errorsContext.jsx';

function UsersPage() {
  const { users } = useUsersContext();

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('users', JSON.stringify(users));
    });
    return () => {
      window.removeEventListener('beforeunload', () => {
        localStorage.setItem('users', JSON.stringify(users));
      });
    };
  }, [users]);

  return (
    <Container style={{ paddingTop: '60px' }}>
      <ErrorsContextProvider>
        <UsersList />
      </ErrorsContextProvider>
    </Container>
  );
}

export default UsersPage;
