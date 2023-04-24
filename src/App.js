import { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';

export default function App() {
  let [search, setSearch] = useState('');
  let [message, setMessage] = useState('Search for music!');
  let [data, setData] = useState([]);

  const API_URL = 'https://itunes.apple.com/search?term=';

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        document.title = `${search} Music`;
        const response = await fetch(API_URL + search);
        const resData = await response.json();
        if (resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not found.')
        }
      }
      fetchData();
    }
  }, [search]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term)
  }

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      {message}
      <Gallery data={data} />
    </div>
  );
}