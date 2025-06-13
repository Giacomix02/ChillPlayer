import Link from "next/link";
import s from "./SideMenu.module.css";
import Image from "next/image";
import ChillPlayerLogo from "@public/ChillPlayer.svg";
import { FaMusic } from "react-icons/fa";

export default function SideMenu() {
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

            <div className={s.containerColumn} >

                <a className={s.discoverText}>Discover</a>

                <Link href={"/"}>
                    <button>
                        Home
                    </button>
                </Link>

                <Link href={"/songList"} className={s.link}>
                    <button>
                        <FaMusic className={s.iconColor} />
                        Songs
                    </button>
                </Link>
            </div>

        </div>
    )
}