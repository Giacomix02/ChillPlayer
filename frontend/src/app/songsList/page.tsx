'use client'

import s from './page.module.css';
import {open} from "@tauri-apps/plugin-dialog";
import { FaPlay} from "react-icons/fa";
import {useState} from "react";
import AudioRow from "$components/AudioRow/AudioRow";
import {usePlayContext} from "$/app/PlayContext";
import {addSource, getSourcesByType} from "$/Db/queries";
import {Source} from "$/Db/db";
import {useLiveQuery} from "dexie-react-hooks";


export default function SongListPage() {

    const {queueFilesPaths, setQueueFilesPaths} = usePlayContext()



    const songs = useLiveQuery(
        ()=> getSourcesByType('audio'),
    )

    async function loadFiles() {
        const file = await open({
            multiple: true,
            directory: false,
            filters: [
                { name: "Audio Files", extensions: ["mp3", "wav", "ogg"] }
            ]
        });
        if (!file) {
            console.error("No file selected");
            return;
        }

        if (Array.isArray(file)) {

            file.forEach((async path => {
                let success = await addSource(path, 'audio')
            }))

        } else {
            return
        }
    }

    function getSongName(path: string): string {
        const fileNameWithExt = path.split(/[\\/]/).pop() || "Unknown Title";
        return fileNameWithExt.replace(/\.[^/.]+$/, "") || "Unknown Title";
    }


    return (
        <div className={s.container}>
            <div className={s.header}>
                <h1>Songs</h1>
                <div className={s.addSourceContainer}>
                    <button type="button" onClick={loadFiles} className={s.addSourceButton}>
                        Load File
                    </button>
                </div>
            </div>
            <div className={s.songsList}>
                {

                    songs?.map(song =>
                        <AudioRow key={song.id} id={song.id} genre={undefined} title={getSongName(song.path)} artist={undefined} path={song.path}/>
                    )
                }
            </div>
        </div>
    );
}