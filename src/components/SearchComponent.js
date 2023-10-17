import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchComponent() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      // Make a GET request to your API with the search value as a parameter
      const response = await axios.get(`http://localhost:5263/api/Person/GetPerson?id=${searchValue}`);

      // Assuming your API returns the specific object based on the search value
      const result = response.data;
      setSearchResult(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

/* useEffect(() => {
    if (searchValue) {
      handleSearch();
    } else {
      setSearchResult(null);
    }
  }, [searchValue]);*/  

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {searchResult && (
        <div>
          <h2>Search Result</h2>
          {/* Render the specific object's data here */}
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
