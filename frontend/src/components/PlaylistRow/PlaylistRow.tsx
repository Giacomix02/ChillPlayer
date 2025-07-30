import styles from "./PlaylistRow.module.css";
import Link from "next/link";
import s from "./PlaylistRow.module.css";
import {FaPlay, FaTimes, FaIndent } from "react-icons/fa";
import {usePlayContext} from "$/app/PlayContext";
import {deletePlaylist, deleteSource, updateSourcePlayTimeById} from "$/db/queries";
import PlaylistSelectorModal from "$components/PlaylistSelectorModal/PlaylistSelectorModal";

type Infos = {name: string; id: number};

export default function PlaylistRow({name, id}:Infos) {

    async function handleDelete() {
        await deletePlaylist(id);
    }

    return (
        <div className={s.container}>

            <div className={styles.infosContainer}>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.buttonsContainer}>
                <button title="Remove">
                    <FaTimes className={s.buttonDelete} onClick={handleDelete}/>
                </button>
            </div>
        </div>
    );
}
