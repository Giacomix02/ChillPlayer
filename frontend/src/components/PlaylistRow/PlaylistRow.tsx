import styles from "./PlaylistRow.module.css";
import Link from "next/link";
import s from "./PlaylistRow.module.css";
import {FaPlay, FaTimes, FaIndent } from "react-icons/fa";
import {usePlayContext} from "$/app/PlayContext";
import {deletePlaylist, deleteSource, updateSourcePlayTimeById} from "$/db/queries";
import PlaylistSelectorModal from "$components/PlaylistSelectorModal/PlaylistSelectorModal";
import {APP_ROUTES} from "$/routerMap";

type Infos = {name: string; id: number};

export default function PlaylistRow({name, id}:Infos) {

    async function handleRemove() {
        await deletePlaylist(id);
    }

    return (
        <div className={s.container}>

            <div className={styles.infosContainer}>
                <Link href={{
                    pathname: APP_ROUTES.playlistSources,
                    query: { id: id }
                }} className={styles.name}>{name}</Link>
            </div>
            <div className={styles.buttonsContainer}>
                <button title="Remove">
                    <FaTimes className={s.buttonDelete} onClick={handleRemove}/>
                </button>
            </div>
        </div>
    );
}
