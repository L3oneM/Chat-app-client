import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../../components/InfoBar/InfoBar';
import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import Sidebar from '../../components/SideBar/SideBar';

import './chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'https://chat-app-apo.herokuapp.com/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();

    if (message && message !== '') {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  const getGeolocation = event => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(position => {
      socket.emit(
        'sendLocation',
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        error => {
          if (error) {
            return console.log(error);
          }
        }
      );
    });
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} socket={socket} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          getGeolocation={getGeolocation}
        />
      </div>
      <Sidebar users={users} room={room} />
    </div>
  );
};

export default Chat;
