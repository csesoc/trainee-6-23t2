import "./main.css";

import { useEffect, useState } from "react";

export default function MainContent({
  selectedItemData,
  setPlaybackItem,
  selectedType,
}) {
  return (
    <div className="main-list-wrap">
      {selectedItemData.items ? (
        <table className="main-list" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              {selectedType === "playlist" ? <th>Album</th> : null}
              {selectedType === "playlist" ? <th>Date Added</th> : null}
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            {selectedType === "playlist"
              ? selectedItemData.items.map((item, index) => (
                  <PlaylistItem key={index} index={index} item={item} />
                ))
              : selectedItemData.items.map((item, index) => (
                  <AlbumItem key={index} index={index} item={item} />
                ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

function AlbumItem({ item, index }) {
  return (
    <tr>
      <td colSpan="5">
        <button className="main-list-button" >
          <table className="main-list" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td width="5%">{index + 1}</td>
                <td className="main-list-title">
                  <div className="main-list-album-text">
                    <div>
                      <b>{item.name}</b>
                    </div>
                    <div style={{ color: "silver" }}>
                      {item.artists[0].name}
                    </div>
                  </div>
                </td>
                <td width="15%">{ms_to_display(item.duration_ms)}</td>
              </tr>
            </tbody>
          </table>
        </button>
      </td>
    </tr>
  );
}

function PlaylistItem({ item, index }) {
  return (
    <tr>
      <td colSpan="5">
        <button className="main-list-button">
          <table className="main-list" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td width="5%">{index + 1}</td>
                <td className="main-list-title">
                  <img
                    src={
                      item.track.album.images[
                        item.track.album.images.length - 1
                      ].url
                    }
                    alt=":("
                    width="50"
                    height="50"
                  ></img>
                  <div className="main-list-text">
                    <div>
                      <b>{item.track.name}</b>
                    </div>
                    <div style={{ color: "silver" }}>
                      {item.track.artists[0].name}
                    </div>
                  </div>
                </td>
                <td width="20%" className="main-list-name">
                  {item.track.album.name}
                </td>
                <td width="15%">{date_to_display(item.added_at)}</td>
                <td width="15%">{ms_to_display(item.track.duration_ms)}</td>
              </tr>
            </tbody>
          </table>
        </button>
      </td>
    </tr>
  );
}

function date_to_display(date) {
  // Convert date to Month /dd/yyyy
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return `${month} ${day}, ${year}`;
}

function ms_to_display(milliseconds) {
  // Convert ms to minutes and seconds
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
