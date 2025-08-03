import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:movieId' element={<MoviePage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
