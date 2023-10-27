import {React, useState, useEffect} from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link  } from 'react-router-dom';

function Course(){
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stuIdToAdd, setStuIdToAdd] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const addStudent = async () => {
        try {
            axios.put(`http://localhost:5263/api/CoursePerson/AddCoursePerson?stuId=${stuIdToAdd}&courseId=${id}`);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const removePerson = async (pid) => {
        try {
            axios.delete(`http://localhost:5263/api/CoursePerson/DeletePersonCourse?pid=${pid}&cid=${course.id}`);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const deleteCourse = async () => {
        try {
            axios.delete(`http://localhost:5263/api/Course/DeleteCourse?id=${id}`).then(() => {
                window.location.href = '/courses';
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:5263/api/Course/GetCourse?id=${id}`).then((response) => {
            setCourse(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(false);
        })
    })

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : 
                course ? (
                    <><div>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                    </div>
                    <div className="col-auto">
                        <button type = "button" onClick={ ()=> navigate("/courseEdit?id=" + course.id) } className="btn btn-info mb-3 mx-2">Edit </button>
                        <button type = "button" onClick={deleteCourse  } className="btn btn-danger mb-3 mx-2">Delete {course.title}</button>
                    </div>
                    <h1>People in this course</h1>
                    <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Person Type</th>
                                    <th scope="col">Grade</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {course.coursePersons.map((cp) => (
                                    <tr key={cp.person.id}>
                                        <td>{cp.person.id}</td>
                                        <td><Link to ={`/person?id=${cp.person.id}`}>{cp.person.firstMidName} {cp.person.lastName}</Link></td>
                                        <td>{cp.person.personType}</td>
                                        <td>{cp.gradeLetter}</td>
                                        <td><button type = "button" className='btn btn-danger' onClick={() => removePerson(cp.person.id)}>Remove Person</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                        <div class="row g-2">
                            <div class="col-auto">
                            <input
                            className='form-control'
                            type="text"
                            placeholder="Student ID..."
                            value={stuIdToAdd}
                            onChange={(e) => setStuIdToAdd(e.target.value)}
                            />
                            </div>
                            <div class="col-auto">
                            <button type = "button" onClick={ addStudent} class="btn btn-primary mb-3">Add</button>
                            </div>
                        </div>
                        </div>
                        </>
            ):
             (
                <p>Course not found</p>
            )}
        </div>
    );
}
export default Course;