'use client'

import s from './page.module.css';
import {open} from "@tauri-apps/plugin-dialog";
import { FaPlay} from "react-icons/fa";
import {useEffect, useState} from "react";
import AudioRow from "$components/AudioRow/AudioRow";
import {usePlayContext} from "$/app/PlayContext";
import {addSource, getPlaylistById, getSourcesByPlaylistId, getSourcesByType} from "$/db/queries";
import {Source} from "$/db/db";
import {useLiveQuery} from "dexie-react-hooks";
import {getFileName} from "$/services/services";
import PlaylistSelectorModal from "$components/PlaylistSelectorModal/PlaylistSelectorModal";
import {useParams, useSearchParams} from 'next/navigation';



export default function PlaylistSources() {

    const [playlistName, setPlaylistName] = useState<string>();
    const {queueFilesPaths, setQueueFilesPaths} = usePlayContext()
    const {showPlaylistSelectorModal,setShowPlaylistSelectorModal } = usePlayContext();

    const searchParams = useSearchParams();
    const playlistId = searchParams.get('id');


    const songs = useLiveQuery(
        () => {
            if (!playlistId) return [];
            return getSourcesByPlaylistId(parseInt(playlistId as string));
        },
        [],
    )

    useEffect(() => {
        const fetchPlaylistName = async () => {
            if (playlistId) {
                const playlist = await getPlaylistById(parseInt(playlistId as string));
                setPlaylistName(playlist?.name || 'Unknown Playlist');
            }
        };

        fetchPlaylistName();
    }, [playlistId]);


    return (
        <div className={s.container}>
            {
                showPlaylistSelectorModal?.show &&
                <PlaylistSelectorModal/>
            }
            <div className={s.header}>
                <h1>{playlistName}</h1>
            </div>
            <div className={s.sourcesList}>
                {
                    songs?.map(song =>
                        <AudioRow key={song.id} id={song.id} genre={undefined} title={getFileName(song.path)} artist={undefined} path={song.path}/>
                    )
                }
            </div>
        </div>
    );
}