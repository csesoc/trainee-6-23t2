import "./currentplaylist.css";

import { fetchAlbum, fetchPlaylist } from "../api/api";
import { useEffect, useState } from "react";

export default function CurrentPlaylist({
  token,
  selectedPlaylistId,
  selectedType,
}) {
  const [relevantInformation, setRelevantInformation] = useState({});
  const [playListSelected, setPlayListSelected] = useState(false);

  useEffect(() => {
    async function getPlaylistData() {
      const res = await fetchPlaylist(token, selectedPlaylistId);
      setRelevantInformation({
        name: res.name,
        public: res.public,
        playlistOwner: res.owner.display_name,
        playlistNumberSongs: res.tracks.total,
        playlistTimeLength: res.tracks.items
          .map((item) => item.track.duration_ms)
          .reduce((a, b) => a + b, 0),
        playlistCoverUrl: res.images[0].url,
      });
      setPlayListSelected(true);
    }

    async function getAlbumData() {
      const res = await fetchAlbum(token, selectedPlaylistId);

      setRelevantInformation({
        name: res.name,
        public: null,
        playlistOwner: res.artists.map(a => a.name).join(', '),
        playlistNumberSongs: res.tracks.total,
        playlistTimeLength: res.tracks.items
          .map((item) => item.duration_ms)
          .reduce((a, b) => a + b, 0),
        playlistCoverUrl: res.images[0].url,
      });
      setPlayListSelected(true);
    }

    if (selectedPlaylistId !== "" && selectedType === "playlist") {
      getPlaylistData();
    } else if (selectedPlaylistId !== "" && selectedType === "album") {
      getAlbumData();
    }
  }, [selectedPlaylistId, selectedType]);

  return (
    <div>
      {playListSelected ? (
        <ShowCurrentPlaylist information={relevantInformation} />
      ) : null}
    </div>
  );
}

function ShowCurrentPlaylist({ information }) {
  const time = convertMsToTime(information["playlistTimeLength"]);
  const url = information.playlistCoverUrl;

  return (
    <div className="current-playlist-container">
      <img className="image" src={url} alt="playlist cover" />
      <div className="information">
        <div>
          <h3 className="public">
            {information.public !== null ? `${information.public === true ? "Public" : "Private"} playlist` : "Album"}
          </h3>
        </div>
        <div>
          <h1 className="playlist-name">{information.name}</h1>
        </div>
        <div>
          <h2 className="other">
            {information["playlistOwner"]} ⋅ {information["playlistNumberSongs"]} song{information["playlistNumberSongs"] === 1 ? '' : 's'} ⋅ {time}
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
