import './main.css'

import { fetchAlbumItems, fetchPlaylistItems } from '../api/api'
import { useEffect, useState } from 'react'

import CurrentPlaylist from './currentplaylist.jsx'
import MainContent from './maincontent.jsx'
import Player from './Player'
import Sidebar from './sidebar'

export default function Main({token, player}) {

  const [selectedPlaylistID, setSelectedPlaylistID] = useState('');
  const [selectedAlbumID, setSelectedAlbumID] = useState(''); 
  const [selectedItemData, setSelectedItemData] = useState({}); 
  const [playbackItem, setPlaybackItem] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    async function getData() {
      const res = await fetchPlaylistItems(token, selectedPlaylistID);
      setSelectedItemData(res);
      setSelectedType('playlist');
    }
    if (selectedPlaylistID !== '') {
      getData();
    }
  }, [selectedPlaylistID, token])

  useEffect(() => {
    async function getData() {
      const res = await fetchAlbumItems(token, selectedAlbumID);
      setSelectedItemData(res);
      setSelectedType('album');
    }
    if (selectedAlbumID !== '') {
      getData();
    }
  }, [selectedAlbumID, token])

  return (
    <div className='main'>
        <Sidebar token={token} setSelectedPlaylist={setSelectedPlaylistID}
                               setSelectedAlbum={setSelectedAlbumID}/>
        <div className='main-content'>
            <CurrentPlaylist token={token} selectedPlaylistId={selectedType === 'playlist' ? selectedPlaylistID : selectedAlbumID} selectedType={selectedType}/>
            <MainContent selectedItemData={selectedItemData} setPlaybackItem={setPlaybackItem} selectedType={selectedType}/>
            <Player player={player} />
        </div>
    </div>
  )
}
