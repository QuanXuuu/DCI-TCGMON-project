import { useState } from 'react';
import SearchTermContext from './contexts/SearchTermContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyCollectionsPage from './pages/MyCollectionsPage/MyCollectionsPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import './App.scss';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('charizard');
  const value = { searchTerm, setSearchTerm };

  return (
    <SearchTermContext.Provider value={value}>
      <div className="App">
        <BrowserRouter>
          <div className="page">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/collections" element={<MyCollectionsPage />} />
              <Route path="/results" element={<SearchResultsPage />} />
              {/* <Route path="*" element={ <RegisterPage /> } />  */}
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </SearchTermContext.Provider>
  );
};

export default App;
