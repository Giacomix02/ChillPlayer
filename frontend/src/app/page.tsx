'use client'
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import {useState} from "react";
import s from "@/app/page.module.css";

export default function Home() {
    return (
        <div className={s.container}>
            <h1>Home page</h1>
            <p>This is the home page.</p>
        </div>
    )
}
