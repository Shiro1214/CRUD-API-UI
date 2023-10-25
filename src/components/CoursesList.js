import axios from 'axios'
import { Link } from 'react-router-dom';

import {useState, useEffect,React} from 'react'

function CoursesList(){
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5263/api/Course/GetCourses') // Replace with your API endpoint
          .then((response) => {
            setCourses(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
    return (
        <div>
            <h2>Courses</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col' >Title</th>
                        <th scope='col'>Section</th>
                        <th scope='col'>Teacher</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td><Link to={`/course?id=${course.id}`}>{course.title}</Link></td>
                            <td>{course.section}</td>
                            <td>{course.coursePersons ? <Link to ={`/person?id=${course.coursePersons[0].person.id}`}>{course.coursePersons[0].person.firstMidName + " " + course.coursePersons[0].person.lastName}</Link> : "TBD"}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <button className='btn btn-primary' onClick={() => window.location.href = '/courseCreate'}>Add Course</button>
        </div>

    );
}

export default CoursesList;