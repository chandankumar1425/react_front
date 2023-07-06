import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('Fiction');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      Title: title,
      Author: author,
      Genre: genre,
      Description: description,
      Price: price,
    };
    try {
      await axios.post('https://backendbook.onrender.com/book/add', newBook);
      setTitle('');
      setAuthor('');
      setGenre('Fiction');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className='maindiv'>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text" placeholder='Enter your Book Name'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author: </label>
          <input
            type="text" placeholder='Enter your Author Name'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genre: </label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Comic">Comic</option>
          </select>
        </div>
        <div>
          <textarea placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number" placeholder='Enter Book price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button className='btn' type="submit">Add Book</button>
      </form>
    </div>
  );
};


const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://backendbook.onrender.com/book/allbook');
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`https://backendbook.onrender.com/book/delete/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error(error);
    }
  };

  const filterBooks = async () => {
    try {
      const response = await axios.get('https://backendbook.onrender.com/book/Genre', {
        params: { Genre: genreFilter },
      });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sortBooks = async () => {
    try {
      const response = await axios.get('https://backendbook.onrender.com/book/sort', {
      });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='midsec'>
      <h2>My Books</h2>

      <div >
        <label>Filter by Genre:</label>
        <input
          type="text"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        />
        <button className='btn'  onClick={filterBooks}>Filter</button>
        <button className='btn one' onClick={sortBooks}>Sort Descending Wise</button>
      </div>



      <ul className='ull'>
        {books.map((book) => (
          <li className='lii' key={book._id}>
            <strong>Title:</strong> {book.Title}, <strong>Author:</strong>{' '}
            {book.Author}, <strong>Genre:</strong> {book.Genre},{' '}
            <strong>Price:</strong> ${book.Price}
            <button className='btn' onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

//main
const App = () => {
  return (
    <div>
      <AddBook />
      <MyBooks />
    </div>
  );
};

export default App;