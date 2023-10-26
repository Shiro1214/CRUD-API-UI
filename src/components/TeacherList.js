import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TeacherList() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5263/api/Person/GetAllTeachers') // Replace with your API endpoint
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
                  <th scope="col">Name</th>
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
                  <td><Link to={`/person?id=${person.id}`}> {person.firstMidName} {person.lastName} </Link> </td>
                  <td>{person.personType}</td>
                  <td>{person.country}</td>
                  <td>{person.city}</td>
                  <td>{person.street}</td>
                  <td>{person.province}</td>
                </tr>
                
              ))}
            </tbody>
        </table>
      <button className='btn btn-primary' onClick={() => window.location.href = '/create'}>Add Person</button>
    </div>
  );
}

export default TeacherList;
