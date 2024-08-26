import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);  // Adjust according to response structure
      })
      .catch((error) => {
        console.error('Error fetching book data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5555/books/${id}`, book)
      .then(() => {
        setSuccessMessage('Book updated successfully!');
        setTimeout(() => navigate('/'), 1500);  // Redirect with delay
      })
      .catch((error) => {
        console.error('Error updating book:', error);
        setSuccessMessage('Failed to update book.');
      });
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='max-w-md w-full p-4 bg-white shadow-md rounded'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Update Book</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-700'>Title:</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Author:</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Publish Year:</label>
            <input
              type="number"
              name="publishYear"
              value={book.publishYear}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          >
            Update Book
          </button>
        </form>
        {successMessage && (
          <div className='mt-4 text-center text-green-500'>
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditBook;
