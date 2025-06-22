'use client'

import s from "$/app/page.module.css";
import HomeRowSource from "$components/HomeRowSource/HomeRowSource";
import {useLiveQuery} from "dexie-react-hooks";
import {getMorePlayedSources, getSourcesByType} from "$/db/queries";
import {getFileName} from "$/services/services";


export default function Home() {

    const songs = useLiveQuery(
        ()=>getMorePlayedSources(5, 'audio')
    )

    return (
        <div className={s.container}>
            <h1>Home</h1>
            <div className={s.mostPlayedContainer}>
                <div className={s.audioContainer}>
                    {
                        songs?.map(song =>
                            <HomeRowSource key={song.id} id={song.id} path={song.path} title={getFileName(song.path)}/>
                        )
                    }
                </div>
                <div className={s.videoContainer}></div>
            </div>

        </div>
    )
}
