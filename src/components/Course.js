import {React, useState, useEffect} from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Course(){
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stuIdToAdd, setStuIdToAdd] = useState('');
    const [studIdGrade, setStudIdGrade] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [grade,setGrade] = useState('');
    const handleClose = () => {setShow(false); setStudIdGrade(''); setGrade('');};
    const handleShow = () => setShow(true);
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
    const modifyGrade = async () => {
        try {
            axios.put(`http://localhost:5263/api/CoursePerson/ChangeStudentGrade?sid=${studIdGrade}&cid=${course.id}&grade=${grade}`);
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
                            <Modal show={show} onHide={handleClose} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Grade Selection</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <DropdownButton id="dropdown-basic-button" title={"Grade : " + grade}  onSelect={(g)=>setGrade(g)}>
                                    <Dropdown.Item eventKey='A'>A</Dropdown.Item>
                                    <Dropdown.Item eventKey='B'>B</Dropdown.Item>
                                    <Dropdown.Item eventKey='C'>C</Dropdown.Item>
                                    <Dropdown.Item eventKey='D'>D</Dropdown.Item>
                                    <Dropdown.Item eventKey='E'>E</Dropdown.Item>
                                    <Dropdown.Item eventKey='F'>F</Dropdown.Item>
                                </DropdownButton>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                Close
                                </Button>
                                <Button variant="primary" onClick={() => {modifyGrade(); handleClose();}}>
                                Update Grade
                                </Button>
                            </Modal.Footer>
                            </Modal>
                            <tbody>
                                {course.coursePersons.map((cp) => (
                                    <tr key={cp.person.id}>
                                        <td>{cp.person.id}</td>
                                        <td><Link to ={`/person?id=${cp.person.id}`}>{cp.person.firstMidName} {cp.person.lastName}</Link></td>
                                        <td>{cp.person.personType}</td>
                                        <td>{cp.gradeLetter} <button type = "button" className='btn btn-info' onClick={() => {setStudIdGrade(cp.person.id); handleShow();}} >Edit</button></td>
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
                            <div className="col-auto">
                            <button type = "button" onClick={ addStudent} className="btn btn-primary mb-3">Add</button>
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