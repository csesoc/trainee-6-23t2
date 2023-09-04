import express from 'express';
import cors from 'cors';
import { generateRandomString } from './helper.js';
import request from 'request';

import 'dotenv/config'

const port = 5000;

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const app = express();  
app.use(cors());


global.access_token = ''

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get('/auth/login', (req, res) => {
    let scope = "streaming \
                 user-read-email \
                 user-read-private \
                 ugc-image-upload \
                 user-read-playback-state \
                 user-modify-playback-state \
                 user-read-currently-playing \
                 app-remote-control \
                 streaming \
                 playlist-read-private \
                 playlist-read-collaborative \
                 playlist-modify-private \
                 playlist-modify-public \
                 user-follow-modify \
                 user-follow-read \
                 user-read-playback-position \
                 user-top-read \
                 user-read-recently-played \
                 user-library-modify \
                 user-library-read \
                 playlist-read-private";

    const state = generateRandomString(16);

    let auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: "http://localhost:5000/auth/callback",
        state: state
    })
    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/auth/callback', (req, res) => {
    let code = req.query.code || null;
    let state = req.query.state || null;
    
    if (state === null) {
        res.redirect('/#' +
        new URLSearchParams({
            error: 'state_mismatch'
        }).toString());
    } else {
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: "http://localhost:5000/auth/callback",
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            json: true
        }

        request.post(authOptions, function(error, response, body) {
            if (!error && (response.statusCode === 200)) {
              access_token = body.access_token;
              res.redirect('http://localhost:3000');
            }
        });
    }
});


app.get('/auth/token', (req, res) => {
    res.json(
       {
          access_token: access_token
       })
})