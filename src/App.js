import React from 'react';
import { Route } from 'react-router-dom';

import Join from './pages/Join/Join';
import Chat from './pages/Chat/Chat';

const App = () => {
  return (
    <div>
      <Route path='/' exact component={Join} />
      <Route path='/chat' exact component={Chat} />
    </div>
  );
};

export default App;
