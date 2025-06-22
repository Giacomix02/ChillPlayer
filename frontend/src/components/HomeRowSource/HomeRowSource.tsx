import styles from "./HomeRowSource.module.css";
import Link from "next/link";
import s from "./HomeRowSource.module.css";
import {FaPlay, FaTimes} from "react-icons/fa";
import {usePlayContext} from "$/app/PlayContext";
import {deleteSource, updateSourcePlayTimeById} from "$/db/queries";

type HomeSource = {title: string, path: string, id: number};

export default function HomeRowSource({title, path, id}:HomeSource) {

    const {currentSong, setCurrentSong } = usePlayContext()

    async function handlePlay() {
        setCurrentSong(path);
        await updateSourcePlayTimeById(id);
    }

    async function handleDelete() {
        await deleteSource(id);
    }

    return (
        <div className={s.container}>
            <div className={styles.infosContainer}>
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.buttonsContainer}>
                <button title="Play">
                    <FaPlay className={s.buttonPlay} onClick={handlePlay}/>
                </button>
            </div>

        </div>
    );
}
