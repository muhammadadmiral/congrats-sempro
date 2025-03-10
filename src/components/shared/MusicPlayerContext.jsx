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
  const [audioError, setAudioError] = useState(null);
  const location = useLocation();
  
  // Check if we're on the congratulations page
  const isCongratsPage = location.pathname === '/congratulations';

  // Initialize audio element safely
  const initializeAudio = () => {
    if (!musicInitialized && !audioRef.current) {
      try {
        // Create a hidden audio element in the DOM
        const audioElement = document.createElement('audio');
        
        // Important: Setting attributes in the correct order
        audioElement.setAttribute('preload', 'none');
        audioElement.setAttribute('playsinline', '');
        audioElement.setAttribute('webkit-playsinline', '');
        audioElement.setAttribute('crossorigin', 'anonymous');
        audioElement.volume = 0.3;
        audioElement.loop = true;
        audioElement.autoplay = false;
        
        // Add event listeners
        audioElement.addEventListener('play', () => setIsMusicPlaying(true));
        audioElement.addEventListener('pause', () => setIsMusicPlaying(false));
        audioElement.addEventListener('ended', () => setIsMusicPlaying(false));
        
        // Check if playback is successful
        audioElement.addEventListener('canplaythrough', () => {
          setMusicAvailable(true);
          setAudioError(null);
        });
        
        // Handle errors
        audioElement.addEventListener('error', (e) => {
          console.error('Error loading audio:', e);
          setMusicAvailable(false);
          setAudioError(e.message || 'Failed to load audio');
        });
        
        // Set source last to prevent immediate loading
        audioElement.src = '/audio/kita-kesana.mp3';
        
        // Add to the DOM but hidden (helps with iOS playback)
        audioElement.style.display = 'none';
        audioElement.style.width = '0';
        audioElement.style.height = '0';
        document.body.appendChild(audioElement);
        
        // Store reference
        audioRef.current = audioElement;
        setMusicInitialized(true);
        setMusicAvailable(true);
      } catch (error) {
        console.error('Failed to initialize audio:', error);
        setMusicAvailable(false);
        setAudioError(error.message || 'Failed to initialize audio');
      }
    }
  };
  
  // Toggle music playback with better error handling
  const toggleMusic = () => {
    // Make sure audio is initialized
    if (!musicInitialized) {
      initializeAudio();
    }
    
    // Wait a bit to ensure audio is initialized
    setTimeout(() => {
      if (audioRef.current) {
        try {
          if (isMusicPlaying) {
            audioRef.current.pause();
          } else {
            // Use a promise to handle playback
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  // Playback started successfully
                  setIsMusicPlaying(true);
                  setAudioError(null);
                })
                .catch((error) => {
                  // Auto-play was prevented or other error
                  console.error('Error playing audio:', error);
                  setIsMusicPlaying(false);
                  
                  // Check for common autoplay policy error
                  if (error.name === 'NotAllowedError') {
                    setAudioError('Browser blocked autoplay. Click again to play.');
                  } else {
                    setAudioError(error.message || 'Error playing audio');
                  }
                });
            }
          }
        } catch (error) {
          console.error('Error toggling audio playback:', error);
          setAudioError(error.message || 'Error toggling audio');
        }
      }
    }, 100);
  };
  
  // Initialize audio on component mount
  useEffect(() => {
    initializeAudio();
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        
        // Remove from DOM if we added it
        try {
          if (document.body.contains(audioRef.current)) {
            document.body.removeChild(audioRef.current);
          }
        } catch (e) {
          console.error('Error removing audio element:', e);
        }
        
        audioRef.current = null;
      }
    };
  }, []);
  
  // Special handling for mobile devices - reactivate audio context on user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      // This helps with mobile browsers that suspend audio contexts
      if (audioRef.current && !isMusicPlaying && musicInitialized) {
        // Just load the audio again to keep it "warm"
        audioRef.current.load();
      }
    };
    
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    
    return () => {
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isMusicPlaying, musicInitialized]);
  
  // Pause music when navigating to congratulations page
  useEffect(() => {
    if (isCongratsPage && audioRef.current && isMusicPlaying) {
      audioRef.current.pause();
    }
  }, [isCongratsPage, isMusicPlaying]);
  
  // Create a safe playing status value
  const effectiveMusicPlaying = !!(isMusicPlaying && musicAvailable && !audioError);
  
  const value = {
    isMusicPlaying: effectiveMusicPlaying,
    toggleMusic,
    isMusicAvailable: musicAvailable,
    audioError,
    resetAudioError: () => setAudioError(null)
  };
  
  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}