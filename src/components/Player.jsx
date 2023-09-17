import "./Player.css";

import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import Slider from "@mui/material/Slider";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

export default function Player({ player }) {
  const [paused, setPaused] = useState(true);
  const [active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);

  player.addListener("player_state_changed", (state) => {
    if (!state) {
      return;
    }

    setTrack(state.track_window.current_track);
    setPaused(state.paused);

    player.getCurrentState().then((state) => {
      !state ? setActive(false) : setActive(true);
    });
  });

  const theme = useTheme();
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#fff";

  return (
    <div className="player">
      <img src={current_track.album.images[0].url} alt="Song Cover" className="song-image" />
      <div className="controller">
        <div className="choose-song">
          <IconButton aria-label="previous song" onClick={() => player.previousTrack()}>
            <FastRewindRounded
              sx={{ fontSize: "3.5rem" }}
              htmlColor={mainIconColor}
            />
          </IconButton>
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={
                () => {
                    setPaused(!paused);
                    player.togglePlay();
                }
            }
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "4rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "4rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={() => player.nextTrack()}>
            <FastForwardRounded
              sx={{ fontSize: "3.5rem" }}
              htmlColor={mainIconColor}
            />
          </IconButton>
        </div>
        <div className="slider">
          <p>0:00</p>
          <Slider defaultValue={0} />
          <p>3:23</p>
        </div>
      </div>
    </div>
  );
}
