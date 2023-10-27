import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
function PersonEdit() {
    const [person, setPerson] = useState(null);
    const [firstMidName, setFirstMidName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [personType, setPersonType] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [province, setProvince] = useState('');
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
                const response = await axios.get(`http://localhost:5263/api/Person/GetPerson?id=${id}`);
        
                // Assuming your API returns the specific object based on the search value
                const result = response.data;
                setPerson(result);
                setFirstMidName(result.firstMidName);
                setLastName(result.lastName);
                setCountry(result.country);
                setPersonType(result.personType);
                setCity(result.city);
                setStreet(result.street);
                setProvince(result.province);
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
        const response = await axios.put('http://localhost:5263/api/Person/UpdatePerson?id='+id, {
            firstMidName: firstMidName,
            lastName: lastName,
            country: country,
            personType: personType.toLowerCase() === 'student' ? 0 : 1,
            city: city,
            street: street,
            province: province
        });

        if (response.status === 200) {
            navigate('/person?id=' + id); // Redirect to the new updated person page
            setStatus('success');
        } else {
            navigate('students'); // Redirect to the student list
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
            ) : person ? (
                <form onSubmit={handleUpdate}>
                    <div className='mb-3'>
                        <label className='form-label'>First Name</label>
                        <input type="text" placeholder='First Name' className="form-control" value={firstMidName} onChange={(e) => setFirstMidName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Last Name</label>
                        <input type="text" placeholder='Last Name' className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Country</label>
                        <input type="text" placeholder='Country' className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Person Type</label>
                        <input type="text" className="form-control" value={personType} onChange={(e) => setPersonType(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>City</label>
                        <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Street</label>
                        <input type="text" className="form-control" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Province</label>
                        <input type="text" className="form-control" value={province} onChange={(e) => setProvince(e.target.value)} />
                    </div>
                    <div className='col-auto'>
                        <button type="submit" className="btn btn-primary">Update</button> 
                        <button type = "button" className="btn btn-primary" onClick={() => navigate(`/person?id=${person.id}`)}>Back</button>
                    </div>
                </form>
            ) : (
                <div>Person not found</div>
            )}
        </div>
    );
}

export default PersonEdit;