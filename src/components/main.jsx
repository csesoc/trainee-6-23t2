import { useState, useEffect } from 'react'
import './main.css'
import Sidebar from './sidebar'
import MainHeader from './mainheader.jsx'
import MainContent from './maincontent.jsx'
import { fetchPlaylistItems, fetchAlbumItems} from '../api/api'

export default function Main({token}) {

  const [selectedPlaylistID, setSelectedPlaylistID] = useState('');
  const [selectedAlbumID, setSelectedAlbumID] = useState(''); 
  const [selectedItemData, setSelectedItemData] = useState({}); 

  useEffect(() => {
    async function getData() {
      const res = await fetchPlaylistItems(token, selectedPlaylistID);
      setSelectedItemData(res);
      console.log(selectedItemData);
    }
    getData();
  }, [selectedPlaylistID])

  useEffect(() => {
    async function getData() {
      const res = await fetchAlbumItems(token, selectedAlbumID);
      setSelectedItemData(res);
      console.log(res);
    }
    getData();
  }, [selectedAlbumID])

  return (
    <div className='main'>
        <Sidebar token={token} setSelectedPlaylist={setSelectedPlaylistID}
                               setSelectedAlbum={setSelectedAlbumID}/>
        <div className='main-content'>
            <MainHeader />
            <MainContent selectedItemData={selectedItemData}/>
        </div>
    </div>
  )
}
