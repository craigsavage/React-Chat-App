import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer' 

let socket;

// location prop from react-router
const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'https://react-realtime-chat-appi.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);    // Parse query info from url

        socket = io(ENDPOINT);  // Stores a unique conecction to server

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            // Executed on callback return
            if (error) console.log(error)
        });

        // Executes on unmounting (AKA - leaving the chat)
        return () => {
            socket.emit('disconnect');
            socket.off();   // Turns off user's socket instance
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });

        // Get list of all users in the room
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });
    }, []);

    // Function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    );
}

export default Chat;