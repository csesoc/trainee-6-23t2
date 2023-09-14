import { fetchPlaylist, fetchPlaylistCoverImage} from '../api/api'
import './currentplaylist.css'
import { useState, useEffect } from 'react'

export default function CurrentPlaylist({token, selectedPlaylistId}) {

  const [relevantInformation, setRelevantInformation] = useState({});
  const [playListSelected, setPlayListSelected] = useState(false);

  useEffect(() => {
    async function getData() {
      const res = await fetchPlaylist(token, selectedPlaylistId);
      console.log(res);
      setRelevantInformation({name: res.name, 
                              public: res.public, 
                              playlistOwner: res.owner.display_name, 
                              playlistNumberSongs: res.tracks.total, 
                              playlistTimeLength: res.tracks.items.map((item) => item.track.duration_ms).reduce((a, b) => a + b, 0), 
                              playlistCoverUrl: res.images[0].url});
      setPlayListSelected(true);
    }
    if (selectedPlaylistId !== '') {
      getData();
    }
  }, [selectedPlaylistId])


  return (
    <div>
      {playListSelected ? <ShowCurrentPlaylist information={relevantInformation} /> : null}
    </div>
  )
}

function ShowCurrentPlaylist({information}) {
    const time = convertMsToTime(information["playlistTimeLength"]);
    const url = information.playlistCoverUrl;
  
    return (
        <div className="current-playlist-container"> 
            <img className="image" src={url} alt="playlist cover"/>
            <div className="information">
                <div>
                    <h3 className="public">{information.public === true ? 'Public' : 'Private'} playlist</h3>
                </div>
                <div>
                    <h1 className="playlist-name">{information.name}</h1>
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
    const hoursDisplay = hours > 1 ? hours + " hours " : hours + "hour ";
    const minutesDisplay = minutes > 1 ? minutes + " minutes " : minutes + "minute ";
  
    return hoursDisplay + minutesDisplay;
  }