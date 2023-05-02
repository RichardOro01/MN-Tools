import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Jacobi from './components/pages/Jacobi';
import Interpolacion from './components/pages/Interpolacion';
import RootsSeparations from './components/pages/RootsSeparations';
import NumericIntegration from './components/pages/NumericIntegration';
import NumericOptimization from './components/pages/NumericOptimization';
import { Result } from 'antd';

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/MN-Tools' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/MN-Tools/jacobi' element={<Jacobi/>}/>
            <Route path='/MN-Tools/interpolation' element={<Interpolacion/>}/>
            <Route path='/MN-Tools/roots_separation' element={<RootsSeparations/>}/>
            <Route path='/MN-Tools/numeric_integration' element={<NumericIntegration/>}/>
            <Route path='/MN-Tools/numeric_optimization' element={<NumericOptimization/>}/>
            <Route path='*' element={<Result status={'404'} title='404 Not Found'/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
