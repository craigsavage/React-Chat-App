import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
    const [ name, setName ] = useState('');
    const [ room, setRoom ] = useState('');
 
    const handleName = (event) => setName( event.target.value );
    const handleRoom = (event) => setRoom( event.target.value );
    const isNotEmpty = (event) => ((!name || !room) && event.preventDefault());

    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <div><input placeholder='Name' className='joinInput' type='text' onChange={handleName} required/></div>
                <div><input placeholder='Room' className='joinInput mt-20' type='text' onChange={handleRoom} required/></div>
                <Link to={`/chat?name=${name}&room=${room}`} onClick={isNotEmpty} >
                    <button className='button mt-20' type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;