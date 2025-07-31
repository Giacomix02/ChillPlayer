'use client';

import s from './page.module.css';
import {useState} from "react";
import {usePlayContext} from "$/app/PlayContext";
import PlaylistCreatorModal from "$components/PlaylistCreatorModal/PlaylistCreatorModal";
import AudioRow from "$components/AudioRow/AudioRow";
import {getFileName} from "$/services/services";
import {useLiveQuery} from "dexie-react-hooks";
import {getAllPlaylists, getSourcesByType} from "$/db/queries";
import PlaylistRow from "$components/PlaylistRow/PlaylistRow";

export default function playlistsListPage() {

    const {showPlaylistCreatorModal,setShowPlaylistCreatorModal} = usePlayContext();

    const playlists = useLiveQuery(
        ()=> getAllPlaylists(),
    )


    return (
        <div className={s.container}>
            {
                showPlaylistCreatorModal &&
                <PlaylistCreatorModal/>
            }
            <div className={s.header}>
                <h1>Playlists</h1>
                <div className={s.addPlaylistContainer}>
                    <button type="button" onClick={() => setShowPlaylistCreatorModal(true)}
                            className={s.addPlaylistButton}>
                        New Playlist
                    </button>
                </div>
            </div>
            <div className={s.playlistsList}>
                {
                    playlists?.map(playlist =>
                        <PlaylistRow key={playlist.id} name={playlist.name} id={playlist.id}/>
                    )
                }
            </div>
        </div>
    );
}