'use client'
import {useEffect, useRef, useState} from "react";
import {open} from "@tauri-apps/plugin-dialog";
import {readFile} from "@tauri-apps/plugin-fs";
import s from "./AudioPlayer.module.css";
import { FaPlay, FaPause, FaStepForward, FaStepBackward  } from "react-icons/fa";

export default function AudioPlayer() {

    //const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    const audioPlayer = useRef<HTMLAudioElement>(null)
    const [path, setPath] = useState<string|null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0); //expressed in seconds
    const [duration, setDuration] = useState<number>(0); //expressed in seconds
    const [play, setPlay] = useState<boolean>(true);
    const[name, setName] = useState<string>("Unknown Title");



    async function loadSong() {
        console.log("Load song clicked");
        setPlay(true)
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
        console.log("File URL:", fileUrl);
        setPath(fileUrl);

        const fileNameWithExt = file.split(/[\\/]/).pop() || "Unknown Title";
        const fileName = fileNameWithExt.replace(/\.[^/.]+$/, "") || "Unknown Title";
        setName(fileName);


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
            <div className={s.left}>
                <a>{name}</a>
            </div>

            <div className={s.center}>
                <input className={s.timeline} type="range" name="Timeline" min="0" max={duration*10000}
                       defaultValue={currentTime*10000}/>
            </div>


            <div className={s.right}>
                <div className={s.rightContainer}>
                    <button>
                        <FaStepBackward className={s.nextBackButton}/>
                    </button>
                    <button type="button" onClick={play ? playSong : stopSong}>
                        {play ? <FaPlay className={s.playButton}/> : <FaPause className={s.pauseButton}/>}
                    </button>
                    <button>
                        <FaStepForward className={s.nextBackButton}/>
                    </button>
                </div>
            </div>

            <button type="button" onClick={loadSong}>
                Load Song
            </button>
            {
                path ? <audio
                    ref={audioPlayer}
                    preload="auto" src={path}
                    onTimeUpdate={() => setCurrentTime(audioPlayer.current?.currentTime || 0)}
                    onLoadedMetadata={() => setDuration(audioPlayer.current?.duration || 0)}
                    onEnded={() => setPlay(true)}
                ></audio> : null
            }

        </div>
    );
}
