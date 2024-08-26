import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

function ShowBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold text-gray-800 mb-8'>{book.title}</h1>
      <div className='bg-white shadow-md rounded-lg p-6'>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Publish Year:</strong> {book.publishYear}</p>
        {/* Add more fields as necessary */}
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>Language:</strong> {book.language}</p>
        {/* Add cover image */}
        {book.coverImage && (
          <div className='mt-4'>
            <img src={book.coverImage} alt={`${book.title} cover`} className='w-full h-auto rounded-md' />
          </div>
        )}
      </div>
      <div className='flex justify-end gap-4 mt-8'>
        <Link to={`/books/edit/${book._id}`} className='text-blue-500 hover:text-blue-700 transition duration-300'>
          <AiOutlineEdit /> Edit
        </Link>
        <button onClick={handleDelete} className='text-red-500 hover:text-red-700 transition duration-300'>
          <MdOutlineDelete /> Delete
        </button>
      </div>
    </div>
  );
}

export default ShowBook;
