import axios from 'axios';
import React, { useState } from 'react';

function CreateBook() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State to hold success message

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const newBook = { title, author, publishYear };

    axios
      .post('http://localhost:5555/books', newBook)
      .then((response) => {
        console.log('Book added successfully:', response.data);
        setSuccessMessage('Book added successfully!'); // Set success message
        setTitle('');
        setAuthor('');
        setPublishYear('');
      })
      .catch((error) => {
        console.error('There was an error adding the book:', error);
        setSuccessMessage('Failed to add book.'); // Set error message
      });
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='max-w-md w-full p-4 bg-white shadow-md rounded'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Add New Book</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-700'>Title:</label>
            <input
              type="text"
              placeholder='Add title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Author:</label>
            <input
              type="text"
              placeholder='Add author'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Publish Year:</label>
            <input
              type="number"
              placeholder='Publish year'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          >
            Add Book
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

export default CreateBook;
