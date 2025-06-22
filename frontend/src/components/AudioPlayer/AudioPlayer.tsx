'use client'
import {useEffect, useRef, useState} from "react";
import {open} from "@tauri-apps/plugin-dialog";
import {readFile} from "@tauri-apps/plugin-fs";
import s from "./AudioPlayer.module.css";
import { FaPlay, FaPause, FaStepForward, FaStepBackward  } from "react-icons/fa";
import {usePlayContext} from "$/app/PlayContext";

export default function AudioPlayer() {

    const audioPlayer = useRef<HTMLAudioElement>(null)
    const [path, setPath] = useState<string|null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0); //expressed in seconds
    const [duration, setDuration] = useState<number>(0); //expressed in seconds
    const [play, setPlay] = useState<boolean>(true);
    const[name, setName] = useState<string>("Unknown Title");
    const {currentSong, queueFilesPaths, setCurrentSong} = usePlayContext();

    useEffect( () => {

        if (!currentSong) return;

        async function handleSongChange() {
            if (!currentSong) return;
            console.log("Loading song in handleSongChange");
            await createfileUrl(currentSong);
        }

        handleSongChange();
        setCurrentSong("");

    }, [currentSong]);

     async function createfileUrl(filePath: string){
        console.log("inizio createfileUrl");
        const data = await readFile(filePath);
        console.log("1")
        const blob = new Blob([new Uint8Array(data)], { type: 'audio/mpeg' });
        console.log("2")
        const fileUrl = URL.createObjectURL(blob);
        console.log("3")

        setPath(fileUrl);
        console.log("4")
        const fileNameWithExt = filePath.split(/[\\/]/).pop() || "Unknown Title";
        const fileName = fileNameWithExt.replace(/\.[^/.]+$/, "") || "Unknown Title";
        console.log("5")
        setName(fileName);
    }


    function playSong() {
        setPlay(false);
        audioPlayer.current?.play();
        // Logic to play the loaded song
    }

    function stopSong() {
        setPlay(true);
        audioPlayer.current?.pause();
        // Logic to stop the currently playing song
    }
    function jumpToTime(time: number) {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = time;
            setCurrentTime(time);
        }
    }

    return (
        <div className={s.back}>
            <div className={s.left}>
                <a>{name}</a>
            </div>

            <div className={s.center}>
                <input
                    className={s.timeline}
                    type="range"
                    name="Timeline"
                    min="0"
                    max={duration*1000000}
                    value={currentTime*1000000}
                    onChange={(e) => jumpToTime(parseFloat(e.target.value)/1000000)}
                />
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

            {
                path ? <audio
                    ref={audioPlayer}
                    preload="auto" src={path}
                    onTimeUpdate={() => setCurrentTime(audioPlayer.current?.currentTime || 0)}
                    onLoadedMetadata={() =>{
                        setDuration(audioPlayer.current?.duration || 0)
                        playSong()
                        }
                    }
                    onEnded={() => setPlay(true)}
                ></audio> : null
            }

        </div>
    );
}
