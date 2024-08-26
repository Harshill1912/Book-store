import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import { MdOutlineDelete, MdOutlineAdd } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data || response.data);  // Adjust based on response structure
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5555/books/${id}`)  // Fixed the typo here
      .then(() => {
        setBooks(books.filter((book) => book._id !== id));
      })
      .catch((error) => {
        console.log('Error deleting book:', error);
      });
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold my-8 text-gray-800'>Book List</h1>
        <Link to="/books/create">
          <MdOutlineAdd className='text-sky-800 text-4xl hover:text-sky-600 transition duration-300' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden'>
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='p-4 text-left border border-gray-700'>Sr No</th>
              <th className='p-4 text-left border border-gray-700'>Title</th>
              <th className='p-4 text-left border border-gray-700 max-md:hidden'>Author</th>
              <th className='p-4 text-left border border-gray-700 max-md:hidden'>Publish Year</th>
              <th className='p-4 text-left border border-gray-700'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className='hover:bg-gray-100 transition duration-200'>
                <td className='p-4 border border-gray-700 text-center'>{index + 1}</td>
                <td className='p-4 border border-gray-700 text-center'>{book.title}</td>
                <td className='p-4 border border-gray-700 text-center max-md:hidden'>{book.author}</td>
                <td className='p-4 border border-gray-700 text-center max-md:hidden'>{book.publishYear}</td>
                <td className='p-4 border border-gray-700 text-center flex justify-center gap-x-4'>
                  <Link to={`/books/showBook/${book._id}`} className='text-green-500 hover:text-green-700 transition duration-300'>
                    <BsInfoCircle />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className='text-blue-500 hover:text-blue-700 transition duration-300'>
                    <AiOutlineEdit />
                  </Link>
                  <button onClick={() => handleDelete(book._id)} className='text-red-500 hover:text-red-700 transition duration-300'>
                    <MdOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
