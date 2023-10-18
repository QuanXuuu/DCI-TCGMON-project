import { useState } from 'react';
import SearchQueryContext from './contexts/SearchQueryContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyCollectionsPage from './pages/MyCollectionsPage/MyCollectionsPage';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import './App.scss';

const App = () => {
  const [searchQuery, setSearchQuery] = useState({
    searchTerm: 'umbreon',
    searchMethod: 'name',
  });
  const value = { searchQuery, setSearchQuery };

  return (
    <SearchQueryContext.Provider value={value}>
      <div className="App">
        <BrowserRouter>
          <div className="page">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/collections" element={<MyCollectionsPage />} />
              <Route path="/search" element={ <SearchPage /> } /> 
              <Route path="/results" element={<SearchResultsPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </SearchQueryContext.Provider>
  );
};

export default App;
