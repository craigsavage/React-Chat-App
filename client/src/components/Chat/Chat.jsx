import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

let socket;

// location prop from react-router
const Chat = ({ location }) => {
    const [ name, setName ] = useState('');
    const [ room, setRoom ] = useState('');

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);    // Parse query info from url

        socket = io(ENDPOINT);  // Stores a unique conecction to server

        setName( name );
        setRoom( room );

        socket.emit('join', { name, room });
    }, [ENDPOINT, location.search]);

    return (
        <div>
            Yo
        </div>
    )
}

export default Chat;