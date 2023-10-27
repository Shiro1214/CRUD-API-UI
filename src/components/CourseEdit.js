import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
function CourseEdit() {
    const [course, setCourse] = useState(null);
    const [title, setTitle] = useState('');
    const [section, setSection] = useState('');
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to your API with the search value as a parameter
                const response = await axios.get(`http://localhost:5263/api/Course/GetCourse?id=${id}`);
        
                // Assuming your API returns the specific object based on the search value
                const result = response.data;
                setCourse(result);
                setTitle(result.title);
                setSection(result.section);
                setLoading(false);
              } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
              }
        
        };
        fetchData();
    },[id]);
    const handleUpdate = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.put('http://localhost:5263/api/Course/UpdateCourse?id='+id, {
            title: title,
            section: section
        });

        if (response.status === 200) {
            navigate('/course?id=' + id); // Redirect to the new updated course page
            setStatus('success');
        } else {
            navigate('courses'); // Redirect to the course list
            setStatus('error');
        }
    } catch (error) {
        console.log(error);
        setStatus('error');
    }
}
    return (
        //if there's an error or success message, display it then the form
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : course ? (
                <form onSubmit={handleUpdate}>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input type="text" placeholder='Title' className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Section</label>
                        <input type="text" placeholder='Section' className="form-control" value={section} onChange={(e) => setSection(e.target.value)} />
                    </div>
                    <div className='col-auto'>
                        <button type="submit" className="btn btn-primary ">Update</button> 
                        <button type = "button" className="btn btn-primary mx-2" onClick={() => navigate(`/course?id=${course.id}`)}>Back</button>
                    </div>
                </form>
            ) : (
                <div>Person not found</div>
            )}
        </div>
    );
}

export default CourseEdit;