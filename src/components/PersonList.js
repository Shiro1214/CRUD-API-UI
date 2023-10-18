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
      <table className="table"> 
            <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Person Type</th>
                  <th scope="col">Country</th>
                  <th scope="col">City</th>
                  <th scope="col">Street</th>
                  <th scope="col">Province</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => (
                <tr key={person.id}>
                  <td>{person.id}</td>
                  <td>{person.firstMidName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.personType}</td>
                  <td>{person.country}</td>
                  <td>{person.city}</td>
                  <td>{person.street}</td>
                  <td>{person.province}</td>
                </tr>
              ))}
            </tbody>
        </table>

    </div>
  );
}

export default PersonList;
