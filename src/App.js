import './App.css';
import { useState, useEffect } from 'react';
import { fetchProfile } from './api/api.js';

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

  useEffect(() => {
    async function getProfile() {
      const response = await fetchProfile(token);
      console.log(response);
    }
    getProfile();
  },[token]);

  return (
    <div className="App">
      {token === "" ? <a href={LOGIN_URI}> Login to Spotify </a> : <p>Welcome</p>}
    </div>
  );
}

export default App;
