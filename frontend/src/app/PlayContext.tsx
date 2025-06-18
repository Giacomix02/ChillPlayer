'use client'


import { createContext, useContext, useState, ReactNode } from "react";

interface PlayContextType {
    currentSong: string | undefined;
    setCurrentSong: (song: string) => void;
    filesPaths: string[] | undefined;
    setFilesPaths: (paths: string[]) => void;
}

// Default values
const defaultContext: PlayContextType = {
    currentSong: undefined,
    setCurrentSong: () => {},
    filesPaths: undefined,
    setFilesPaths: () => {},
};

export const PlayContext = createContext<PlayContextType>(defaultContext);

export const usePlayContext = () => useContext(PlayContext);

export function PlayContextProvider({ children }: { children: ReactNode }) {
    const [currentSong, setCurrentSong] = useState<string | undefined>();
    const [filesPaths, setFilesPaths] = useState<string[] | undefined>();

    return (
        <PlayContext.Provider
            value={{
            currentSong,
            setCurrentSong,
            filesPaths,
            setFilesPaths,
    }}>
    {children}
    </PlayContext.Provider>
    );
}