import axios from 'axios'
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
                        <th scope='col'>Title</th>
                        <th scope='col'>Section</th>
                        <th scope='col'>Teacher</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.title}</td>
                            <td>{course.section}</td>
                            <td>TBD</td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <button className='btn btn-primary'>Add Course</button>
        </div>

    );
}

export default CoursesList;