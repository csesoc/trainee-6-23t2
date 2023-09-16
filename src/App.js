import './App.css';

import { useEffect, useState } from 'react';

import Main from './components/main.jsx'

const LOGIN_URI = "http://localhost:5000/auth/login";

function App() {
  const [token, setToken] = useState("");
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }
    getToken();

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.connect();
    };
  },[]);

  return (
    <div className="App">
      {token === "" ? <a className="login-text" href={LOGIN_URI}> Login to Spotify </a> : <Main token={token} player={player} />}
    </div>
  );
}

export default App;
