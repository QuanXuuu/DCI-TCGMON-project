import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchQueryContext from './contexts/SearchQueryContext';
import SuccessModalTextContext from './contexts/SuccessModalTextContext.jsx';
import UserDataContext from './contexts/UserDataContext';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyCollectionsPage from './pages/MyCollectionsPage/MyCollectionsPage';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import CollectionDetailsPage from './pages/CollectionDetailsPage/CollectionDetailsPage';
import './App.scss';

const App = () => {
  const [searchQuery, setSearchQuery] = useState({});
  const [successModalText, setSuccessModalText] = useState(null);
  const [userData, setUserData] = useState(null);
  const search = { searchQuery, setSearchQuery };
  const modalText = { successModalText, setSuccessModalText };
  const user = { userData, setUserData };

  return (
    <UserDataContext.Provider value={user}>
      <SuccessModalTextContext.Provider value={modalText}>
        <SearchQueryContext.Provider value={search}>
          <div className="App">
            <BrowserRouter>
              <div className="page">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/collections" element={<MyCollectionsPage />} />
                  <Route
                    path="/collections/:id"
                    element={<CollectionDetailsPage />}
                  />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/results" element={<SearchResultsPage />} />
                </Routes>
              </div>
            </BrowserRouter>
          </div>
        </SearchQueryContext.Provider>
      </SuccessModalTextContext.Provider>
    </UserDataContext.Provider>
  );
};

export default App;
