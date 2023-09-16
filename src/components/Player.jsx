import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import './Player.css';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';


export default function Player(props) {
    const theme = useTheme();
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const [paused, setPaused] = React.useState(false);

  return (
    <div className='player'>
        <img src='https://i.redd.it/taylor-swift-midnights-spring-edition-fanmade-by-me-v0-a2utwxmzbpv91.jpg?width=2160&format=pjpg&auto=webp&s=98ccb7cd79d9a354e58678ecc5c406953c2c6f0a' alt='Song Cover' className='song-image' />
        <div className='controller'>
            <div className='choose-song'>
                <IconButton aria-label="previous song">
                    <FastRewindRounded sx={{ fontSize: '3.5rem' }} htmlColor={mainIconColor} />
                </IconButton>
                <IconButton
                    aria-label={paused ? 'play' : 'pause'}
                    onClick={() => setPaused(!paused)}
                >
                    {paused ? (
                    <PlayArrowRounded
                        sx={{ fontSize: '4rem' }}
                        htmlColor={mainIconColor}
                    />
                    ) : (
                    <PauseRounded sx={{ fontSize: '4rem' }} htmlColor={mainIconColor} />
                    )}
                </IconButton>
                <IconButton aria-label="next song">
                    <FastForwardRounded sx={{ fontSize: '3.5rem' }} htmlColor={mainIconColor} />
                </IconButton>
            </div>
            <div className='slider'>
                <p>0:00</p>
                <Slider defaultValue={0}/>
                <p>3:23</p>
            </div>
        </div>
    </div>
  );
}