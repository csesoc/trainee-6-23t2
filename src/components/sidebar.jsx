import { useState, useEffect } from 'react'
import { fetchUserPlaylists, fetchUsersSavedAlbums } from '../api/api'
import './sidebar.css'

export default function Sidebar({token}) {
  const [renderedList, setRenderedList] = useState([])
  const [playlists, setPlaylists] = useState({})
  const [albums, setAlbums] = useState({})

  useEffect(() => {
    async function getData() {
      const playlist_res = await fetchUserPlaylists(token);
      const albumres = await fetchUsersSavedAlbums(token);
      setPlaylists(playlist_res);
      setAlbums(albumres);
      console.log(playlist_res);
      console.log(albumres);
      setRenderedList([...playlist_res.items, ...albumres.items]);
    }
    getData()
  }, [token])


  const handlePlaylistFilter = () => {
    setRenderedList(playlists.items);
  } 

  const handleAlbumFilter = () => {
    setRenderedList(albums.items);
  }

  const handleNoFilter = () => {
    setRenderedList([...playlists.items, ...albums.items]);
  }

  return (
    <div className='sidebar-container'>
        <div className='type-button'>
            <button onClick={handleNoFilter}>
                X
            </button>
            <button onClick={handlePlaylistFilter}>
                Playlists
            </button>
            <button onClick={handleAlbumFilter}>
                Albums
            </button>
        </div>
        <div className="display-list">
            {renderedList?.map((item) => (
              item.type === 'playlist' ? 
              <PlaylistButton key={item.id}
                              playlistImage={item.images[item.images.length - 1].url}
                              playlist={item}
                              width={item.images[item.images.length - 1].width}
                              height={item.images[item.images.length - 1].height}/>
                              :
              <AlbumButton  key={item.album.id}
                            albumImage={item.album.images[item.album.images.length - 1].url}
                            album={item.album}
                            width={60}
                            height={60}/>
            ))}
        </div>
        
    </div>
  )
}




function PlaylistButton({ playlist, playlistImage, width, height }) {
  return (
    <button>
      <img src={playlistImage} alt='' 
           width={width ? width : '60'} height={height ? height : '60'}
           className='playlist-image'/>
      <div className='playlist-text'>
        <b>{playlist.name}</b>
        <b>{playlist.type.charAt(0).toUpperCase() + playlist.type.slice(1)} . {playlist.owner.display_name}</b>
      </div>
    </button>
  );
}

function AlbumButton({albumImage, album, width, height}) {
  return (
    <button>
      <img src={albumImage} alt='' 
           width={width ? width : '60'} height={height ? height : '60'}
           className='playlist-image'/>
      <div className='playlist-text'>
        <b>{album.name}</b>
        <b>{album.type.charAt(0).toUpperCase() + album.type.slice(1)} . {album.artists[0].name}</b>
      </div>
    </button>
  );
}
