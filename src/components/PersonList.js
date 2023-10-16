import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PersonList() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5263/api/Person/GetAllStudents') // Replace with your API endpoint
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Person List</h2>
     
        {persons.map((person) => (
        
        <ul key={person.id}>
            {person.firstMidName} {person.lastName}   
          <li>Country: {person.country}</li>
        </ul>
        ))}
      
    </div>
  );
}

export default PersonList;
