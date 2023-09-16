import "./sidebar.css";

import { fetchUserPlaylists, fetchUsersSavedAlbums } from "../api/api";
import { useEffect, useState } from "react";

export default function Sidebar({
  token,
  setSelectedPlaylist,
  setSelectedAlbum,
}) {
  const [renderedList, setRenderedList] = useState([]);
  const [playlists, setPlaylists] = useState({});
  const [albums, setAlbums] = useState({});

  useEffect(() => {
    async function getData() {
      const playlist_res = await fetchUserPlaylists(token);
      const albumres = await fetchUsersSavedAlbums(token);

      setPlaylists(playlist_res);
      setAlbums(albumres);
      setRenderedList([...playlist_res.items, ...albumres.items]);
    }
    getData();
  }, [token]);

  const handlePlaylistFilter = () => setRenderedList(playlists.items);
  const handleAlbumFilter = () => setRenderedList(albums.items);
  const handleNoFilter = () =>
    setRenderedList([...playlists.items, ...albums.items]);

  return (
    <div className="sidebar-container">
      <div className="type-button">
        <button onClick={handleNoFilter}>X</button>
        <button onClick={handlePlaylistFilter}>Playlists</button>
        <button onClick={handleAlbumFilter}>Albums</button>
      </div>
      <div className="display-list">
        {renderedList?.map((item) =>
          item.type === "playlist" ? (
            <PlaylistButton
              onClickHandler={() => {
                setSelectedPlaylist(item.id);
              }}
              key={item.id}
              playlist={item}
              width={60}
              height={60}
            />
          ) : (
            <AlbumButton
              onClickHandler={() => {
                setSelectedAlbum(item.album.id);
              }}
              key={item.album.id}
              album={item.album}
              width={60}
              height={60}
            />
          )
        )}
      </div>
    </div>
  );
}

function PlaylistButton({ onClickHandler, playlist, width, height }) {
  return (
    <button className="sidebar-list-item" onClick={onClickHandler}>
      <img
        src={playlist.images[playlist.images.length - 1].url}
        alt=""
        width="60"
        height="60"
        className="playlist-image"
      />
      <div className="playlist-text">
        <b>{playlist.name}</b>
        <b>
          {playlist.type.charAt(0).toUpperCase() + playlist.type.slice(1)} •{" "}
          {playlist.owner.display_name}
        </b>
      </div>
    </button>
  );
}

function AlbumButton({ onClickHandler, album, width, height }) {
  return (
    <button className="sidebar-list-item" onClick={onClickHandler}>
      <img
        src={album.images[album.images.length - 1].url}
        alt=""
        width="60"
        height="60"
        className="playlist-image"
      />
      <div className="playlist-text">
        <b>{album.name}</b>
        <b>
          {album.type.charAt(0).toUpperCase() + album.type.slice(1)} •{" "}
          {album.artists[0].name}
        </b>
      </div>
    </button>
  );
}
