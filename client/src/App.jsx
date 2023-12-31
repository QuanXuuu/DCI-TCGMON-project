import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardDataContext from './contexts/CardDataContext.jsx';
import ProductDataContext from './contexts/ProductDataContext.jsx';
import SearchQueryContext from './contexts/SearchQueryContext';
import SuccessModalTextContext from './contexts/SuccessModalTextContext.jsx';
import TriggerSuccessModalContext from './contexts/TriggerSuccessModal.jsx';
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
  const [cardContentData, setCardContentData] = useState({});
  const [productContentData, setProductContentData] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [successModalText, setSuccessModalText] = useState();
  const [userData, setUserData] = useState(null);
  const [isMyCollectionsSuccessModalOpen, setIsMyCollectionsSuccessModalOpen] =
    useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const [isNotSamePassword, setIsNotSamePassword] = useState(false);

  const triggerSuccessModal = () => {
    setIsMyCollectionsSuccessModalOpen((prev) => !prev);

    setTimeout(() => {
      setIsMyCollectionsSuccessModalOpen((prev) => !prev);
    }, 4000);
  };

  const cardData = { cardContentData, setCardContentData };
  const productData = { productContentData, setProductContentData };
  const search = { searchQuery, setSearchQuery };
  const modalText = { successModalText, setSuccessModalText };
  const triggerModal = {
    isMyCollectionsSuccessModalOpen,
    setIsMyCollectionsSuccessModalOpen,
    triggerSuccessModal,
  };
  const user = { userData, setUserData };

  return (
    <UserDataContext.Provider value={user}>
      <SuccessModalTextContext.Provider value={modalText}>
        <SearchQueryContext.Provider value={search}>
          <TriggerSuccessModalContext.Provider value={triggerModal}>
            <CardDataContext.Provider value={cardData}>
              <ProductDataContext.Provider value={productData}>
                <div className="App">
                  <BrowserRouter>
                    <div className="page">
                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                          path="/register"
                          element={
                            <RegisterPage
                              isRegisterSuccess={isRegisterSuccess}
                              setIsRegisterSuccess={setIsRegisterSuccess}
                              isNotSamePassword={isNotSamePassword}
                              setIsNotSamePassword={setIsNotSamePassword}
                            />
                          }
                        />
                        <Route
                          path="/login"
                          element={
                            <LoginPage
                              isRegisterSuccess={isRegisterSuccess}
                              setIsRegisterSuccess={setIsRegisterSuccess}
                            />
                          }
                        />
                        <Route
                          path="/collections"
                          element={<MyCollectionsPage />}
                        />
                        <Route
                          path="/collections/:id"
                          element={<CollectionDetailsPage />}
                        />

                        <Route path="/search" element={<SearchPage />} />
                        <Route
                          path="/results"
                          element={<SearchResultsPage />}
                        />
                        <Route
                          path="/results/:id"
                          element={<SearchResultsPage />}
                        />
                      </Routes>
                    </div>
                  </BrowserRouter>
                </div>
              </ProductDataContext.Provider>
            </CardDataContext.Provider>
          </TriggerSuccessModalContext.Provider>
        </SearchQueryContext.Provider>
      </SuccessModalTextContext.Provider>
    </UserDataContext.Provider>
  );
};

export default App;
