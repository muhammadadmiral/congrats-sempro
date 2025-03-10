import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiLoader } from 'react-icons/fi';

const VideoMessage = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const progressBarRef = useRef(null);
  
  // Video path
  const videoPath = "/videos/congratulation.mp4";
  
  useEffect(() => {
    const video = videoRef.current;
    
    // Set up event listeners when video is ready
    const handleLoadedData = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      video.currentTime = 0;
    };
    
    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    
    // Clean up event listeners
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  const handleFullScreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleProgressBarClick = (e) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = x / width;
    
    const video = videoRef.current;
    video.currentTime = percent * video.duration;
  };
  
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-xl bg-black relative group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20">
          <FiLoader className="text-white text-3xl animate-spin" />
        </div>
      )}
      
      {/* Watermark */}
      <div className="absolute top-4 right-4 text-white/30 text-sm font-medium z-10 pointer-events-none">
        Ucapan Selamat Sempro
      </div>
      
      {/* Video */}
      <video 
        ref={videoRef}
        className="w-full"
        playsInline
        src={videoPath}
        poster="/images/video-poster.jpg"
        onError={() => setIsLoading(false)}
      ></video>
      
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform transition-all duration-300 opacity-0 group-hover:opacity-100">
        {/* Progress bar */}
        <div 
          ref={progressBarRef}
          className="h-1 bg-gray-600 rounded-full mb-4 cursor-pointer"
          onClick={handleProgressBarClick}
        >
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          {/* Play/Pause Button */}
          <div className="flex items-center">
            <motion.button
              onClick={togglePlay}
              whileTap={{ scale: 0.9 }}
              className="mr-4 text-white hover:text-primary-400 transition-colors"
            >
              {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
            </motion.button>
            
            {/* Time display */}
            <span className="text-white/80 text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          {/* Right controls */}
          <div className="flex items-center">
            {/* Mute button */}
            <motion.button
              onClick={toggleMute}
              whileTap={{ scale: 0.9 }}
              className="ml-4 text-white hover:text-primary-400 transition-colors"
            >
              {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
            </motion.button>
            
            {/* Fullscreen button */}
            <motion.button
              onClick={handleFullScreen}
              whileTap={{ scale: 0.9 }}
              className="ml-4 text-white hover:text-primary-400 transition-colors"
            >
              <FiMaximize size={20} />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Play overlay (shows only when not playing) */}
      {!isPlaying && !isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
          onClick={togglePlay}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white/30 backdrop-blur-sm"
          >
            <FiPlay size={30} className="text-white ml-1" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VideoMessage;