import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import './App.scss';

const App = () => {
    return (
    <div className="App">

        <BrowserRouter>
            <div className="page">
                <Routes>
                    <Route path="/" element={ <LandingPage /> } />
                    <Route path="/register" element={ <RegisterPage /> } />
                    {/* <Route path="/login" element={ <Login /> } />
                    <Route path="/collections" element={ <MyCollections /> } /> */}
                    {/* <Route path="*" element={ <RegisterPage /> } /> */}
                </Routes>
            </div>
        </BrowserRouter>

    </div>
    )
};

export default App;
