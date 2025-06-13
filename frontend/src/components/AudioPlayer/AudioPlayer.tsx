'use client'
import {useRef, useState} from "react";
import {open} from "@tauri-apps/plugin-dialog";
import {readFile} from "@tauri-apps/plugin-fs";

export default function AudioPlayer() {

    //const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    const audioPlayer = useRef<HTMLAudioElement>(null)
    const [path, setPath] = useState('');

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
        audioPlayer.current?.play();
        // Logic to play the loaded song
    }
    function stopSong() {
        console.log("Stop song clicked");
        audioPlayer.current?.pause();
        // Logic to stop the currently playing song
    }

    return (
        <div>
            <button type="button" onClick={loadSong}>
                Load Song
            </button>
            <button type="button" onClick={playSong}>
                Play Song
            </button>
            <button type="button" onClick={stopSong}>
                Stop Song
            </button>
            <a>{path}</a>
            {
                path != '' &&
                <audio ref={audioPlayer} preload="auto" src={path}></audio>
            }
        </div>
    );
}
