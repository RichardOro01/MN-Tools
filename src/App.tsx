import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Jacobi from './components/pages/Jacobi';
import Interpolacion from './components/pages/Interpolacion';
import RootsSeparations from './components/pages/RootsSeparations';

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='jacobi' element={<Jacobi/>}/>
            <Route path='interpolation' element={<Interpolacion/>}/>
            <Route path='roots_separation' element={<RootsSeparations/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
