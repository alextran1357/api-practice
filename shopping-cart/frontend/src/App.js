import React, { useEffect, useState } from 'react'
import './App.css';
import Input from './components/input';

function App() {
  const [message, setMessage] = useState("hajdfa")

  useEffect(() => {
    fetch('/get_shopping_cart')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
  }, [])
  

  return (
    <div>
      <h1>React & Node.js Integration</h1>
      <p>{message.id}</p>
      <div>
        {Input}
      </div>
    </div>
  );
}

export default App;
