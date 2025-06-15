'use client'
import {useRef, useState} from "react";
import {open} from "@tauri-apps/plugin-dialog";
import {readFile} from "@tauri-apps/plugin-fs";
import s from "./AudioPlayer.module.css";
import { FaPlay, FaPause  } from "react-icons/fa";

export default function AudioPlayer() {

    //const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    const audioPlayer = useRef<HTMLAudioElement>(null)
    const [path, setPath] = useState('');

    const [play, setPlay] = useState(true);

    async function loadSong() {
        console.log("Load song clicked");
        const file = await open({
            multiple: false,
            directory: false,
        });
        if (!file) {
            console.error("No file selected");
            return;
        }
        const data = await readFile(file);
        const blob = new Blob([new Uint8Array(data)], { type: 'audio/mpeg' });
        const fileUrl = URL.createObjectURL(blob);
        setPath(fileUrl);
    }
    function playSong() {
        console.log("Play song clicked");
        setPlay(!play);
        audioPlayer.current?.play();
        // Logic to play the loaded song
    }
    function stopSong() {
        console.log("Stop song clicked");
        setPlay(!play);
        audioPlayer.current?.pause();
        // Logic to stop the currently playing song
    }

    return (
        <div className={s.back}>
            <button type="button" onClick={loadSong}>
                Load Song
            </button>
            <button type="button" onClick={play? playSong : stopSong}>
                {play ? <FaPlay className={s.playButton} /> : <FaPause className={s.pauseButton} />}
            </button>
            <a>{path}</a>
            {
                path != '' &&
                <audio ref={audioPlayer} preload="auto" src={path}></audio>
            }
        </div>
    );
}
