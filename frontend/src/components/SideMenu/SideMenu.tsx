'use client'
import Link from "next/link";
import s from "./SideMenu.module.css";
import Image from "next/image";
import ChillPlayerLogo from "@public/ChillPlayer.svg";
import { FaMusic, FaVideo, FaHome,FaList, FaNetworkWired } from "react-icons/fa";
import {useState} from "react";


export default function SideMenu() {
    const [activeLink, setActiveLink] = useState<string>("/");

    function handleLinkClick(link: string) {
        setActiveLink(link);
    }

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

                <Link href={"/"} className={`${s.link} ${activeLink === "/" ? s.active : ""}`} onClick={()=>handleLinkClick("/")}>
                    <FaHome className={s.iconColor}/>
                    Home
                </Link>

                <Link href={"/songsList"} className={`${s.link} ${activeLink === "/songsList" ? s.active : ""}`} onClick={()=>handleLinkClick("/songsList")}>
                    <FaMusic className={s.iconColor}/>
                    Songs
                </Link>

                <Link href={"/videosList"} className={`${s.link} ${activeLink === "/videosList" ? s.active : ""}`} onClick={()=>handleLinkClick("/videosList")}>
                    <FaVideo className={s.iconColor}/>
                    Videos
                </Link>
            </div>


            <div className={`${s.containerColumn} ${s.youContainer}`}>

                <a className={s.SectionText}>You</a>

                <Link href={"/playlistsList"} className={`${s.link} ${activeLink === "/playlistsList" ? s.active : ""}`} onClick={()=>handleLinkClick("/playlistsList")}>
                    <FaList className={s.iconColor}/>
                    Playlists
                </Link>

                <Link href={"/sftpSetup"} className={`${s.link} ${activeLink === "/sftpSetup" ? s.active : ""}`} onClick={()=>handleLinkClick("/sftpSetup")}>
                    <FaNetworkWired className={s.iconColor}/>
                    SFTP Setup
                </Link>

            </div>

        </div>
    )
}