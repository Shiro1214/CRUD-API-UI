import {React, useState, useEffect} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

function Course(){
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    
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
                    <h1>People in this course</h1>
                    <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Person Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {course.people.map((person) => (
                                    <tr key={person.id}>
                                        <td>{person.id}</td>
                                        <td>{person.firstMidName} {person.lastName}</td>
                                        <td>{person.personType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table></>
            ):
             (
                <p>Course not found</p>
            )}
        </div>
    );
}
export default Course;