import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import { UsersContextProvider } from './context/usersContext';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <UsersContextProvider>
        <Routes>
          <Route path="charts" exact element={<StatisticsPage />} />
          <Route path="/" element={<UsersPage />} />
        </Routes>
      </UsersContextProvider>
    </BrowserRouter>
  );
}

export default App;
