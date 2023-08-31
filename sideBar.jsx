import { useState, useEffect } from 'react'
import './sideBar.css'

function PlaylistButton({ playlist, playlistImage, width, height }) {
    return (
      <button>
        <img src={playlistImage} alt='' width={width ? width : '60'} height={height ? height : '60'}/>
        <b>{playlist.name}</b>
      </button>
    );
}

export default function SideBar({playLists}) {

    const [renderedPlaylists, setrenderedPlaylists] = useState()
    useEffect(() => {
        setrenderedPlaylists(playLists);
    },[])

    const handlePlaylists = () => {
        setrenderedPlaylists(playLists.filter((playlist) => playlist.type === 'playlist'));
    }

    const handleAlbums = () => {
        setrenderedPlaylists(playLists.filter((playlist) => playlist.type === 'album'));
    }

    const handlenofilter = () => {
        setrenderedPlaylists(playLists);
    }

    if (!renderedPlaylists) {
        return null;
    }

    return (
        <div className='sideBar'>
            <div className='typeButtons'>
                <button onClick={handlenofilter}>
                    X
                </button>
                <button onClick={handlePlaylists}>
                    Playlists
                </button>
                <button onClick={handleAlbums}>
                    Albums
                </button>
            </div>
            <div className="playlistList">
                {renderedPlaylists.map((playlist) => (
                <PlaylistButton key={playlist.id}
                                playlistImage={playlist.images[playlist.images.length - 1].url}
                                playlist={playlist}
                                width={playlist.images[playlist.images.length - 1].width}
                                height={playlist.images[playlist.images.length - 1].height}/> 
                ))}
            </div>
            
        </div>
    )
}