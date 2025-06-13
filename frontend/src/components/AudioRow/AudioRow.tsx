import styles from "./AudioRow.module.css";
import Link from "next/link";

type Music = {genre: string; title: string; artist: string};

export default function Test({genre, artist, title}:Music) {
    return (
        <div>
            <div className={styles.test}>{title}</div>
            <div className={styles.test}>{artist}</div>
        </div>
    );
}
