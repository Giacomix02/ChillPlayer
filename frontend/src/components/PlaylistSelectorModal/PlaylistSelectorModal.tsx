'use client';
import s from "./PlaylistSelectorModal.module.css";
import {usePlayContext} from "$/app/PlayContext";


export default function PlaylistSelectorModal(){
    const {showPlaylistSelectorModal,setShowPlaylistSelectorModal } = usePlayContext();


    return (
        <div className={s.overlay}>
            <div className={s.modalContainer}>
                <div className={s.modal}>
                    aa
                </div>
                <h2>Playlist Selector Modal</h2>
                <button onClick={() => setShowPlaylistSelectorModal({show: false, id: undefined})}>Close</button>
            </div>
        </div>
    );
}