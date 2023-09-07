import './App.css';
import { useState, useEffect, createContext } from 'react';
import Main from './components/main.jsx'

const LOGIN_URI = "http://localhost:5000/auth/login";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }
    getToken();
  },[]);

  return (
    <div className="App">
      {token === "" ? <a href={LOGIN_URI}> Login to Spotify </a> : <Main token={token} />}
    </div>
  );
}

export default App;
