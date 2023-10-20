import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <div class="row g-2">
        <div class="col-auto">
          <input
          className='form-control'
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        </div>
        <div class="col-auto">
          <button type = "button" onClick={ handleSearch} class="btn btn-primary mb-3">Search</button>
        </div>
    </div>


      {/*() => window.location.href = '/person?id='+searchValue} className={'btn btn-primary'*/}

          <h2>Search Result</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Person Type</th>
                <th scope="col">Country</th>
                <th scope="col">City</th>
                <th scope="col">Street</th>
                <th scope="col">Province</th>
              </tr>
            </thead>
            {searchResult && (
            <tbody>

              <tr> 
                <td>{searchResult.id}</td>
                <td><Link to={`/person?id=${searchResult.id}`}>{searchResult.firstMidName} {searchResult.lastName}</Link></td>
                <td>{searchResult.personType}</td>
                <td>{searchResult.country}</td>
                <td>{searchResult.city}</td>
                <td>{searchResult.street}</td>
                <td>{searchResult.province}</td>
              </tr>
            </tbody>
            )}
          </table>
          {/* Render the specific object's data here */}
          

      
      
    </div>
  );
}

export default SearchComponent;
