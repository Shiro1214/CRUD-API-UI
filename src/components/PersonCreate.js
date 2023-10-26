import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function PersonCreate() {
    const [firstMidName, setFirstMidName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [personType, setPersonType] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [province, setProvince] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        axios.post('http://localhost:5263/api/Person/CreatePerson', {
            firstMidName: firstMidName,
            lastName: lastName,
            country: country,
            personType: personType,
            city: city,
            street: street,
            province: province
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
        <div>
            <p>{status}</p>
            <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary">Submit</button> 
                    <button type = "button" className="btn btn-primary" onClick={() => window.location.href = '/list'}>Back</button>
                </div>
            </form>

            
        </div>
    );
}

export default PersonCreate;