import React from 'react';

import './input.css';

const Input = ({ message, setMessage, sendMessage, getGeolocation }) => (
  <form className='form'>
    <input
      className='input'
      type='text'
      placeholder='Type a message...'
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <button className='sendButton' onClick={event => sendMessage(event)}>
      Send
    </button>
    <button
      className='sendButton sendLocationButton'
      onClick={event => getGeolocation(event)}
    >
      Send Location
    </button>
  </form>
);

export default Input;
