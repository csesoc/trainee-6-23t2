{/* here is is the section that should be in ../api/api (not sure how it works tho)
    export async function fetchPlaylist(token, playlistId) {
        const result = await fetch('https://api.spotify.com/v1/me/playlists/' + playlistId {
            method: "GET", headers : {'Authorization': 'Bearer ' + token}
        })
        return await result.json();
    }
*/}

import { fetchPlaylist } from '../api/api'
import './currentplaylist.css'

export default function CurrentPlaylist({token, playlistId}) {
  async function getInformation() {
    const information = await fetchPlaylist(token, playlistId);
    return information;
  }

  const playlistInformation = getInformation();

  const relevantInformation = {
    playlistCoverURL : '',
    isPublicPlaylist : 'private',
    playlistName : 'No Playlist',
    playlistOwner : 'user',
    playlistNumberSongs : 0,
    playlistTimeLength : 0
  }

  if (!playlistInformation.hasOwnProperty("error")) {
    if (playlistInformation.images.length != 0) {
        relevantInformation.playlistCoverURL = playlistInformation.images[0];
    }
    
    if (playlistInformation.public == true) {
        isPublicPlaylist = 'public';
    }
    
  }

  return (
    <div>
        <ShowCurrentPlaylist information={relevantInformation}/>
    </div>
  )
}

function ShowCurrentPlaylist({information}) {
    const time = convertMsToTime(information["playlistTimeLength"]);
    const url = information.playlistCoverUrl;
  
    return (
        <div className="current-playlist-container"> 
            <img className="image" src={url} alt="playlist cover" style={{float:'left', width:'300px', height:'300px'}}/>
            <div className="information">
                <div>
                    <h3 className="public">{information["isPublicPlaylist"]} playlist</h3>
                </div>
                <div>
                    <h1 className="playlist-name">{information["playlistName"]}</h1>
                </div>
                <div>
                    <h2 className="other">{information["playlistOwner"]} ⋅ {information["playlistNumberSongs"]} songs ⋅ {time}</h2>
                </div>
            </div>
        </div>
    );
  }  

function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    
    minutes = minutes % 60;
  
    return hours + "hours" + minutes + "minutes" + seconds + "seconds";
  }