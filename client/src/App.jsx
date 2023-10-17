import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import MyCollectionsPage from './pages/MyCollectionsPage/MyCollectionsPage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="page">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/collections" element={<MyCollectionsPage />} />
            <Route path="/search" element={ <SearchPage /> } /> 
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
