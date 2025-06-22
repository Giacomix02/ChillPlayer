import styles from "./AudioRow.module.css";
import Link from "next/link";
import s from "./AudioRow.module.css";
import {FaPlay, FaTimes} from "react-icons/fa";
import {usePlayContext} from "$/app/PlayContext";
import {deleteSource} from "$/Db/queries";

type Source = {genre: string|undefined; title: string; artist: string|undefined, path: string, id: number};

export default function AudioRow({genre, artist, title, path, id}:Source) {

    const {currentSong, setCurrentSong } = usePlayContext()

    function handlePlay() {
        setCurrentSong(path);
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
                <button title="Play">
                    <FaPlay className={s.buttonPlay} onClick={handlePlay}/>
                </button>
            </div>

        </div>
    );
}
