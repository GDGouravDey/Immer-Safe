import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Notification from './pages/Notification';
import Tips from './pages/Tips';
import About from './pages/About';
import Signin from './pages/Signin';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notifications' element={<Notification />} />
        <Route path='/tips' element={<Tips />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </>
  );
};

export default App;
