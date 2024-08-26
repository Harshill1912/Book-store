import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateBook from './page/createBook';
import DeleteBook from './page/deleteBook';
import ShowBook from './page/showBook';
import EditBook from './page/editBook';
import Home from './page/home';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/books/showBook/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} /> {/* Update this line */}
    </Routes>
  );
}

export default App;
