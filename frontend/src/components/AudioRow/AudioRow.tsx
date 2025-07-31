import styles from "./AudioRow.module.css";
import Link from "next/link";
import s from "./AudioRow.module.css";
import {FaPlay, FaTimes, FaIndent } from "react-icons/fa";
import {usePlayContext} from "$/app/PlayContext";
import {deleteSource, updateSourcePlayTimeById} from "$/db/queries";
import PlaylistSelectorModal from "$components/PlaylistSelectorModal/PlaylistSelectorModal";

type Source = {genre: string|undefined; title: string; artist: string|undefined, path: string, id: number};

export default function AudioRow({genre, artist, title, path, id}:Source) {

    const {currentSong, setCurrentSong } = usePlayContext()
    const {showPlaylistSelectorModal,setShowPlaylistSelectorModal } = usePlayContext();

    async function handlePlay() {
        setCurrentSong(path);
        await updateSourcePlayTimeById(id);
    }

    function handlePause() {

    }

    async function handleDelete() {
        await deleteSource(id);
    }

    return (
        <div className={s.container}>

            <div className={styles.infosContainer}>
                <div className={styles.title}>{title}</div>
                <div>{artist}</div>
            </div>
            <div className={styles.buttonsContainer}>
                <button title="Remove">
                    <FaTimes className={s.buttonDelete} onClick={handleDelete}/>
                </button>
                <button title="Add to Playlist">
                    <FaIndent className={s.buttonAddToPlaylist} onClick={()=> setShowPlaylistSelectorModal({show: true, id:id})}/>
                </button>
                <button title="Play">
                    <FaPlay className={s.buttonPlay} onClick={handlePlay}/>
                </button>
            </div>

        </div>
    );
}
