import { React, useRef, useState } from 'react';
import { HiVolumeUp as VolumeOn, HiVolumeOff as VolumeOff } from 'react-icons/hi'
import './MusicPlayer.css'

function MusicPlayer({ trackData }) {
    const songCountRef = useRef(0);
    const audioPlayerRef = useRef();
    const [soundOn, setSoundOn] = useState(false);
    const getNextSong = () => {
        songCountRef.current++
        if (songCountRef.current >= trackData.length) {
            songCountRef.current = 0;
        }
        const audioPlayer = new Audio(trackData[songCountRef.current].preview_url)
        audioPlayerRef.current = audioPlayer;
        audioPlayer.play()
        setSoundOn(true);
        audioPlayer.addEventListener('ended', getNextSong)
    }
    return (
        <>
            {soundOn ?
                <VolumeOn className='volumeIcon' onClick={() => {
                    audioPlayerRef.current.pause()
                    setSoundOn(false);
                }} />
                :
                <VolumeOff className='volumeIcon' onClick={() => {
                    songCountRef.current -= 1;
                    getNextSong();
                }} />
            }
        </>)
}

export default MusicPlayer;