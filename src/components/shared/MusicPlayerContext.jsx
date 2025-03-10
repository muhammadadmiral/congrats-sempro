import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

// Create a context for music player
const MusicPlayerContext = createContext(null);

// Hook to use the music player context
export const useMusicPlayer = () => useContext(MusicPlayerContext);

export function MusicPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicInitialized, setMusicInitialized] = useState(false);
  const [musicAvailable, setMusicAvailable] = useState(false);
  const location = useLocation();
  
  // Check if we're on the congratulations page
  const isCongratsPage = location.pathname === '/congratulations';
  
  // Initialize audio on first user interaction
  const initializeAudio = () => {
    if (!musicInitialized) {
      const audio = new Audio('/audio/kita-kesana.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
      setMusicAvailable(true);
      setMusicInitialized(true);
      
      // Add event listeners
      audio.addEventListener('play', () => setIsMusicPlaying(true));
      audio.addEventListener('pause', () => setIsMusicPlaying(false));
      
      // Check if playback is successful
      audio.addEventListener('canplaythrough', () => {
        setMusicAvailable(true);
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Error loading audio:', e);
        setMusicAvailable(false);
      });
    }
  };
  
  // Toggle music playback
  const toggleMusic = () => {
    if (!musicInitialized) {
      initializeAudio();
    }
    
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.error('Error playing audio:', e);
        });
      }
    }
  };
  
  // Initialize audio on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      initializeAudio();
      document.removeEventListener('click', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);
  
  // Pause music when navigating to congratulations page
  useEffect(() => {
    if (isCongratsPage && audioRef.current && isMusicPlaying) {
      audioRef.current.pause();
    }
  }, [isCongratsPage, isMusicPlaying]);
  
  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const value = {
    isMusicPlaying,
    toggleMusic,
    isMusicAvailable: musicAvailable
  };
  
  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}