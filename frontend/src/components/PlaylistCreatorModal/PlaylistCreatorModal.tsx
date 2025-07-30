'use client';
import s from "./PlaylistCreatorModal.module.css";
import {usePlayContext} from "$/app/PlayContext";
import {useState} from "react";
import {addPlaylist} from "$/db/queries";


export default function PlaylistCreatorModal(){
    const {showPlaylistCreatorModal,setShowPlaylistCreatorModal} = usePlayContext();
    const [inputValue, setInputValue] = useState<string>("");


    return (
        <div className={s.overlay}>
            <div className={s.modalContainer}>
                <div className={s.modal}>
                    <input className={s.playlistInput} type="text" name="Playlist name" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                    <button className={s.saveButton} onClick={
                        async () => {
                            await addPlaylist(inputValue)
                            setInputValue("");
                        }
                    }>Save</button>
                    <button className={s.closeButton} onClick={() => setShowPlaylistCreatorModal(false)}>Close</button>
                </div>
            </div>
        </div>
    );
}