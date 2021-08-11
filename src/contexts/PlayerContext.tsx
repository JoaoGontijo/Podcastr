import { createContext, ReactNode, useContext } from "react";
import { useState } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[],index: number) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    setPlayingState: (state: Boolean) => void;
    hasNext: boolean,
    hasPrevious: boolean,
    isLooping: boolean,
    toggleLoop: () => void,
    toggleShuffle: () => void,
    isShuffling: boolean,
    clearPlayerState: () => void
}

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function LayerContextProvider ({children}: PlayerContextProviderProps) {

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    
    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

    function play(episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay () {
        setIsPlaying(!isPlaying);
    }

    function toggleShuffle () {
        setIsShuffling(!isShuffling);
    }

    function toggleLoop () {
        setIsLooping(!isLooping);
    }

    function setPlayingState (state: boolean) {
        setIsPlaying(state);
    }

    function clearPlayerState () {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    function playNext () {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        }
        if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious () {
        if(hasPrevious)
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                playList,
                play,
                playNext,
                playPrevious,
                isPlaying,
                togglePlay,
                setPlayingState,
                hasNext,
                hasPrevious,
                isLooping,
                toggleLoop,
                toggleShuffle,
                isShuffling,
                clearPlayerState
                }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}