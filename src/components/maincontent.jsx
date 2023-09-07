import React from 'react'
import './main.css'

export default function Maincontent({selectedItemData}) {
  
    return (
    <div className='main-list-wrap'>
        <table className='main-list' style={{width:"100%"}}>
            <thead >
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Date Added</th>
                    <th>Length</th>
                </tr>
            </thead>
            <tbody>
                {selectedItemData.items ? selectedItemData.items.map((item, index) => 
                <Mainlistitem key={index} index={index} item={item} />) : null}
            </tbody>
        </table>
    </div>
  )
}


function Mainlistitem({item, index}) {
    return (
        <tr>
            <td width="5%">{index + 1}</td>
            <td className='main-list-title'>
                <img src={item.track.album.images[item.track.album.images.length - 1].url} alt=":(" width="50" height="50"></img>
                <div className='main-list-text'>
                    <div>
                        {item.track.name}
                    </div>
                    <div>
                        {item.track.artists[0].name}
                    </div>
                </div>
            </td>
            <td width="20%" className='main-list-name'>{item.track.album.name}</td>
            <td width="15%">{date_to_display(item.added_at)}</td>
            <td width="15%">{ms_to_display(item.track.duration_ms)}</td>
        </tr>
    )
}

function date_to_display(date) {
    // Convert date to Month /dd/yyyy
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${month} ${day}, ${year}`;
}

function ms_to_display(milliseconds) {
    // Convert ms to minutes and seconds
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
