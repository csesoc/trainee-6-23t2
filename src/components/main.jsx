import { useState, useEffect } from 'react'
import './main.css'
import Sidebar from './sidebar'
import CurrentPlaylist from './currentplaylist.jsx' 
import MainContent from './maincontent.jsx'
import { fetchPlaylistItems, fetchAlbumItems} from '../api/api'

export default function Main({token}) {

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
  }, [selectedPlaylistID])

  useEffect(() => {
    async function getData() {
      const res = await fetchAlbumItems(token, selectedAlbumID);
      setSelectedItemData(res);
      setSelectedType('album');
    }
    if (selectedAlbumID !== '') {
      getData();
    }
  }, [selectedAlbumID])

  return (
    <div className='main'>
        <Sidebar token={token} setSelectedPlaylist={setSelectedPlaylistID}
                               setSelectedAlbum={setSelectedAlbumID}/>
        <div className='main-content'>
            <CurrentPlaylist token={token} selectedPlaylistId={selectedPlaylistID} selectedType={selectedType}/>
            <MainContent selectedItemData={selectedItemData} setPlaybackItem={setPlaybackItem} selectedType={selectedType}/>
        </div>
    </div>
  )
}
