import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import { UsersContextProvider } from './context/usersContext';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <UsersContextProvider>
        <Routes>
          <Route path="users/statistics" exact element={<StatisticsPage />} />
          <Route path="users/list" element={<UsersPage />} />
        </Routes>
      </UsersContextProvider>
    </BrowserRouter>
  );
}

export default App;
