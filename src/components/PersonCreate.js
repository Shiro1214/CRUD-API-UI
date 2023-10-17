import React from 'react';
import axios from 'axios';
import { useState } from 'react';
function PersonCreate() {
    const [firstMidName, setFirstMidName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [personType, setPersonType] = useState(0);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [province, setProvince] = useState('');
    const [status, setStatus] = useState('');
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
                    <input type="text"  className="form-control" value={firstMidName} onChange={(e) => setFirstMidName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Last Name</label>
                    <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Country</label>
                    <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    );
}

export default PersonCreate;