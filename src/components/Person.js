import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useLocation } from 'react-router-dom';

function Person() {
  const [person, setPerson] = useState(null);
  const [pCourses, setPCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseLoading, setCourseLoading] = useState(true);
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
        setPerson(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }

      try {
        const response = await axios.get(`http://localhost:5263/api/CoursePerson/GetPersonCourses?id=${id}`);

        const result = response.data;
        console.log(result);
        setPCourses(result);
        setCourseLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCourseLoading(false);
      }
    };

    fetchData(); // Call the async function within useEffect
  }, [id]); // Run the effect whenever 'id' changes

  return (
    <div>

      {loading ? (
        <p>Loading...</p>
      ) : person ? (

        <>
        <div className="card mb-3">
            <img src="..." className="card-img-top" alt={person.firstMidName + "'s photo"} />
            <div className="card-body">
              <h5 className="card-title">{person.firstMidName} {person.lastName}</h5>
              <p className="card-text">{person.firstMidName} is a {person.personType} from {person.country}, currently living in {person.city}, {person.street}, {person.province}</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
          </div><h2>View {person.firstMidName}'s courses</h2>
          {courseLoading ? (
            <p>Loading courses...</p>
          ) : pCourses ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Section</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Grade</th>
                </tr>
              </thead>
              <tbody>
                {pCourses.map((pc) => (
                  <tr key={pc.course.id}>
                    <td>{pc.course.id}</td>
                    <td><Link to={`/course?id=${pc.course.id}`}>{pc.course.title}</Link></td>
                    <td>{pc.course.section}</td>
                    <td>{pc.teacher.firstMidName + " " + pc.teacher.lastName}</td>
                    <td>{pc.gradeLetter}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          ) : (
            <p>Courses not found</p>
          )}
        </>
      ) : (
        <p>Person not found</p>
      )}
    </div>
  );
}

export default Person;
