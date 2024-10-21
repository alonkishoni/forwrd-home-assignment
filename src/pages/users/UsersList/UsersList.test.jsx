// UsersList.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsersList from './UsersList';
import { UsersContextProvider } from '../../../context/usersContext.jsx';

describe('UsersList Component', () => {
  beforeEach(() => {
    render(
      <UsersContextProvider>
        <UsersList />
      </UsersContextProvider>
    );
  });

  it('displays a loading screen and then the user list', async () => {
    expect(screen.getByTestId('loader')).to.exist;

    await waitFor(
      () => {
        expect(screen.queryByTestId('loader')).to.not.exist;
      },
      { timeout: 5000 }
    );

    await waitFor(() => {
      expect(screen.getByTestId('users-list')).to.exist;
      const userItems = screen.getAllByTestId('user-item');
      expect(userItems).length.to.be.greaterThan(0);
    });
  });
});
