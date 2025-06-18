import styles from "./AudioRow.module.css";
import Link from "next/link";
import s from "./AudioRow.module.css";
import {FaPlay} from "react-icons/fa";
import {usePlayContext} from "$/app/PlayContext";

type Music = {genre: string|undefined; title: string; artist: string|undefined, path: string};

export default function AudioRow({genre, artist, title, path}:Music) {

    const {currentSong, setCurrentSong } = usePlayContext()

    function handlePlay() {
        setCurrentSong(path);
    }

    return (
        <div className={s.container}>
            <div className={styles.test}>{title}</div>
            <div className={styles.test}>{artist}</div>
            <button>
                <FaPlay className={s.playButton} onClick={handlePlay}/>
            </button>
        </div>
    );
}
