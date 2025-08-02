//main.jsx
import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Souvenir from "./pages/Souvenir.jsx";
import AdmissionsPage from "./pages/AdmissionsPage.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/souvenir" element={<Souvenir />} />
                <Route path={"/tuyen-sinh"} element={<AdmissionsPage />}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
