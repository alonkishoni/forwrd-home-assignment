import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import data from '../data/initialUsersData.json';

const UsersContext = createContext({
  users: [],
  setUsers: () => {},
  isLoading: false,
});

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const parsedStoredUsers = JSON.parse(storedUsers);

    try {
      if (parsedStoredUsers?.length) {
        setIsLoading(true);
        setUsers(parsedStoredUsers);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        const t = setTimeout(() => {
          setUsers(data);
          setIsLoading(false);
        }, 2000);

        return () => {
          clearTimeout(t);
        };
      }
    } catch (error) {
      console.error('Error loading users data', error);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      users,
      setUsers,
      isLoading,
    }),
    [users, isLoading]
  );

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
