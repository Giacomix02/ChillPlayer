'use client'
import Link from "next/link";
import s from "./SideMenu.module.css";
import Image from "next/image";
import ChillPlayerLogo from "$public/ChillPlayer.svg";
import { FaMusic, FaVideo, FaHome,FaList, FaNetworkWired } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import {APP_ROUTES} from "$/routerMap"


export default function SideMenu() {
    const pathname = usePathname()

    return(
        <div className={`${s.background} ${s.containerColumn}`}>
            <div className={s.logoContainer}>
                <Image
                    src={ChillPlayerLogo} // Passi l'oggetto modulo, non una stringa
                    alt="Logo"
                    width={50}
                    height={50}
                />
                <a className={s.logotext}>ChillPlayer</a>
            </div>

            <div className={`${s.containerColumn} ${s.discoverContainer}`}>

                <a className={s.SectionText}>Discover</a>

                <Link href={APP_ROUTES.home} className={`${s.link} ${pathname === APP_ROUTES.home ? s.active : ""}`}>
                    <FaHome className={s.iconColor}/>
                    Home
                </Link>

                <Link href={APP_ROUTES.songsList} className={`${s.link} ${pathname === APP_ROUTES.songsList ? s.active : ""}`}>
                    <FaMusic className={s.iconColor}/>
                    Songs
                </Link>

                <Link href={APP_ROUTES.videosList} className={`${s.link} ${pathname === APP_ROUTES.videosList ? s.active : ""}`} >
                    <FaVideo className={s.iconColor}/>
                    Videos
                </Link>
            </div>


            <div className={`${s.containerColumn} ${s.youContainer}`}>

                <a className={s.SectionText}>You</a>

                <Link href={APP_ROUTES.playlistsList} className={`${s.link} ${pathname === APP_ROUTES.playlistsList ? s.active : ""}`}>
                    <FaList className={s.iconColor}/>
                    Playlists
                </Link>

                <Link href={ APP_ROUTES.sftpSetup} className={`${s.link} ${pathname === APP_ROUTES.sftpSetup + "" ? s.active : ""}`} >
                    <FaNetworkWired className={s.iconColor}/>
                    SFTP Setup
                </Link>

            </div>

        </div>
    )
}