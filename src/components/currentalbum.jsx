import "./currentalbum.css";

import { useEffect, useState } from "react";

import { fetchAlbum } from "../api/api";

export default function CurrentAlbum({
  token,
  selectedPlaylistId,
  selectedType,
}) {
  const [relevantInformation, setRelevantInformation] = useState({});
  const [playListSelected, setPlayListSelected] = useState(false);

  useEffect(() => {
    async function getAlbumData() {
      const res = await fetchAlbum(token, selectedPlaylistId);

      console.log(res);
//       setRelevantInformation({
//         name: res.name,
//         public: res.public,
//         playlistOwner: res.owner.display_name,
//         playlistNumberSongs: res.tracks.total,
//         playlistTimeLength: res.tracks.items
//           .map((item) => item.track.duration_ms)
//           .reduce((a, b) => a + b, 0),
//         playlistCoverUrl: res.images[0].url,
//       });
//       setPlayListSelected(true);
    }
//     if (selectedPlaylistId !== "" && selectedType === "playlist") {
//       getAlbumData();
//     } else if (selectedPlaylistId !== "" && selectedType === "album") {
//       setPlayListSelected(false);
//       // couldnt figure it out so temporary solution
//     }
  }, [selectedPlaylistId, selectedType]);

  return (
    <div>
      {playListSelected ? (
        <ShowCurrentAlbum information={{
            playlistTimeLength: 5000,
            playlistCoverUrl: "https://i.scdn.co/image/ab67616d000048514b331ff7bf0ee6cbe4a90395",
            public: false,
            name: "test",
            playlistOwner: "test1",
            playlistNumberSongs: 2
        }} />
      ) : null}
    </div>
  );
}

function ShowCurrentAlbum({ information }) {
  const time = convertMsToTime(information["playlistTimeLength"]);
  const url = information.playlistCoverUrl;

  return (
    <div className="current-album-container">
      <img className="image" src={url} alt="playlist cover" />
      <div className="information">
        <div>
          <h3 className="public">
            {information.public === true ? "Public" : "Private"} playlist
          </h3>
        </div>
        <div>
          <h1 className="album-name">{information.name}</h1>
        </div>
        <div>
          <h2 className="other">
            {information["playlistOwner"]} ⋅{" "}
            {information["playlistNumberSongs"]} songs ⋅ {time}
          </h2>
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
  const hoursDisplay = hours !== 1 ? hours + " hours " : hours + " hour ";
  const minutesDisplay =
    minutes !== 1 ? minutes + " minutes " : minutes + " minute ";

  return hoursDisplay + minutesDisplay;
}
