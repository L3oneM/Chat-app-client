import React from 'react';
import moment from 'moment';

import './message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, createdAt }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  const time = moment(createdAt).format('h:mm a');

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-10'>
        {time} {trimmedName}
      </p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>
          {text.startsWith('https') ? (
            <a
              href={text}
              target='_blank'
              rel='noopener noreferrer'
              className='location-link'
            >
              My current location
            </a>
          ) : (
            ReactEmoji.emojify(text)
          )}
        </p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>
          {text.startsWith('https') ? (
            <a
              href={text}
              target='_blank'
              rel='noopener noreferrer'
              className='location-link-2'
            >
              My current location
            </a>
          ) : (
            ReactEmoji.emojify(text)
          )}
        </p>
      </div>
      <p className='sentText pl-10 '>
        {user} {time}
      </p>
    </div>
  );
};

export default Message;
