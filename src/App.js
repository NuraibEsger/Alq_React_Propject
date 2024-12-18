import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import ListPage from './pages/ListPage/ListPage.jsx';


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list/:id" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default App;
