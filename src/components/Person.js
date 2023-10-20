import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Person() {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to your API with the search value as a parameter
        const response = await axios.get(`http://localhost:5263/api/Person/GetPerson?id=${id}`);

        // Assuming your API returns the specific object based on the search value
        const result = response.data;
        console.log('Response:', result); // Add this line
        setPerson(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData(); // Call the async function within useEffect
  }, [id]); // Run the effect whenever 'id' changes

  return (
    <div>

      {loading ? (
        <p>Loading...</p>
      ) : person ? (

        <div className="card mb-3">
            <img src="..." className="card-img-top" alt={person.firstMidName + "'s photo" }/>
            <div className="card-body">
                <h5 className="card-title">{person.firstMidName} {person.lastName}</h5>
                <p className="card-text">{person.firstMidName} is a {person.personType} from {person.country}, currently living in {person.city}, {person.street}, {person.province}</p>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
        </div>

      ) : (
        <p>Person not found</p>
      )}
    </div>
  );
}

export default Person;
