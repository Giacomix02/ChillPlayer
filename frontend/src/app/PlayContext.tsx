'use client'


import { createContext, useContext, useState, ReactNode } from "react";

interface PlayContextType {
    currentSong: string | undefined;
    setCurrentSong: (song: string) => void;

    queueFilesPaths: string[] | undefined;
    setQueueFilesPaths: (paths: string[]) => void;

    showPlaylistSelectorModal?: {show:boolean, id:number|undefined};
    setShowPlaylistSelectorModal: (show: {show:boolean, id:number|undefined}) => void;

    showPlaylistCreatorModal?: boolean;
    setShowPlaylistCreatorModal: (show: boolean) => void;


}

// Default values
const defaultContext: PlayContextType = {
    currentSong: undefined,
    setCurrentSong: () => {},

    queueFilesPaths: undefined,
    setQueueFilesPaths: () => {},

    showPlaylistSelectorModal: {show: false, id: undefined},
    setShowPlaylistSelectorModal: () => {},

    showPlaylistCreatorModal: false,
    setShowPlaylistCreatorModal: () => {}

};

export const PlayContext = createContext<PlayContextType>(defaultContext);

export const usePlayContext = () => useContext(PlayContext);

export function PlayContextProvider({ children }: { children: ReactNode }) {
    const [currentSong, setCurrentSong] = useState<string | undefined>();
    const [filesPaths, setFilesPaths] = useState<string[] | undefined>();
    const [showPlaylistSelectorModal, setShowPlaylistSelectorModal] = useState<{show:boolean, id:number|undefined}|undefined>();
    const [showPlaylistCreatorModal, setShowPlaylistCreatorModal] = useState<boolean>();



    return (
        <PlayContext.Provider
            value={{
            currentSong,
            setCurrentSong,

            queueFilesPaths: filesPaths,
            setQueueFilesPaths: setFilesPaths,

            showPlaylistSelectorModal,
            setShowPlaylistSelectorModal,

            showPlaylistCreatorModal,
            setShowPlaylistCreatorModal,

    }}>
    {children}
    </PlayContext.Provider>
    );
}