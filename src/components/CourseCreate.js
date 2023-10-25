import {React, useEffect, useState} from 'react'
import axios from 'axios'

function CourseCreate(){
    const [title, setTitle] = useState('');
    const [section, setSection] = useState('');
    const [status, setStatus] = useState('');
    const handleSubmit = async (event) => {
        axios.post('http://localhost:5263/api/Course/CreateCourse', {
            title: title,
            section: section
        }).then((response) => {
            console.log(response);
            setStatus = "success";
        })
        .catch((error) => {
            console.log(error);
            setStatus = "error";
        })

    }
    return (
        //if there's an error or success message, display it then the form
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label className='form-label'>Title</label>
                <input type="text" placeholder='Title' className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Section</label>
                <input type="text" placeholder='Section' className="form-control" value={section} onChange={(e) => setSection(e.target.value)} />
            </div>
            <div className='mb-3'>
                <button type="submit" className="btn btn-primary">Create Course</button>
            </div>

        </form>


    )
}
export default CourseCreate;