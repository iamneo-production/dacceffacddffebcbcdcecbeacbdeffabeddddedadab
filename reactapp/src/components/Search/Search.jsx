import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

const API_URL = 'https://en.wikipedia.org/w/api.php';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('Programming');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 0) {
        axios.get(`${API_URL}?action=opensearch&origin=*&search=${searchTerm}`)
          .then(response => {
            const data = response.data;
            const results = data[1].map((result, index) => {
              return { text: result, link: data[3][index] };
            });
            setSearchResults(results);
          })
          .catch(error => {
            console.error(error);
            setSearchResults([]);
          });
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input data-testid="searchterm" type="text" value={searchTerm} onChange={handleSearchTermChange} />
      {searchResults.length > 0 &&
        <table>
          {searchResults.map((result, index) => {
            return <tr><td key={index}><a data-testid="suggestion" href={result.link}>{result.text}</a></td></tr>;
          })}
        </table>
      }
      {searchResults.length === 0 &&
        <p>Learn React</p>
      }
    </div>
  );
};

export default Search;