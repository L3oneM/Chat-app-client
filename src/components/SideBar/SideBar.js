import React from 'react';

import './sideBar.css';

const SideBar = ({ users, room }) => {
  console.log(users);
  return (
    <div className='sideBar'>
      <h2 className='list-title'>Users currently in {room}</h2>
      <ul className='users'>
        {users ? users.map(user => <li key={user.name}>{user.name}</li>) : null}
      </ul>
    </div>
  );
};

export default SideBar;
