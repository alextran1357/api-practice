import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Protectedcontent from './components/ProtectedContent';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <h1>Authentication App</h1>
      {!token ? (
        <>
          <Register/>
          <Login setToken={setToken} />
        </>
      ) : (
        <Protectedcontent token={token}/>
      )
    }
    </div>
  )
}

export default App;
