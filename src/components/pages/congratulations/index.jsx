import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiGift, FiStar, FiAward, FiChevronDown, FiChevronUp, 
         FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiLoader } from 'react-icons/fi';
import PageHeader from '../../../components/shared/PageHeader';
import MessageWall from '../../../components/congratulations/MessageWall';
import CelebrationAnimation from '../../../components/congratulations/CelebrationAnimation';

const Congratulations = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Kim Soo-Hyun",
      role: "Korean Actor",
      message: "Selamat imnida",
      timestamp: new Date('2025-03-10T10:30:00')
    },
    {
      id: 2,
      name: "Budi Saksono, M.Sc., Ph.D.",
      role: "Pembimbing BRIN",
      message: "Selamat yah tapi jelek bukan purifikasi",
      timestamp: new Date('2025-03-09T14:15:00')
    },
    {
      id: 3,
      name: "Adrian Agus",
      role: "Co-Founder & CEO of PUYO Group (HAKA Dimsum)",
      message: "Ada masanya kita mencuri ruang dan waktu walau pasti berlalu, biarkan saja kita ke sana, selagi masih bisa bersama",
      timestamp: new Date('2025-03-08T09:45:00')
    },
    {
      id: 4,
      name: "Miral",
      message: "cie dah sempro. keren dah luuu brooo. tapi masih ada jalan lagi yang harus di lewatin, semangat ya",
      timestamp: new Date('2025-03-07T10:30:00'),
      image: "/images/miral.jpg"
    }
  ]);
  
  const [isExpandedCard, setIsExpandedCard] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const progressBarRef = useRef(null);
  
  useEffect(() => {
    document.title = 'Ucapan Selamat - Selamat Seminar Proposal Nur Fadiyah Azzizah';
    
    // Video handling
    const video = videoRef.current;
    if (video) {
      // Set up event listeners when video is ready
      const handleLoadedData = () => {
        setDuration(video.duration);
        setIsLoading(false);
        
        // Try to autoplay the video with sound
        video.muted = false; // Ensure sound is enabled
        setIsMuted(false);
        video.play()
          .then(() => {
            setIsPlaying(true);
            console.log("Video autoplay successful with sound");
          })
          .catch(error => {
            console.log("Video autoplay with sound failed:", error);
            // If play with sound fails, try muted autoplay (more likely to succeed)
            video.muted = true;
            setIsMuted(true);
            video.play()
              .then(() => {
                setIsPlaying(true);
                console.log("Video autoplay successful with mute");
                // Try to unmute after user interaction
                const unmuteLater = () => {
                  video.muted = false;
                  setIsMuted(false);
                  document.removeEventListener('click', unmuteLater);
                };
                document.addEventListener('click', unmuteLater);
              })
              .catch(e => console.log("Muted autoplay also failed:", e));
          });
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
      
      const handlePlay = () => {
        setIsPlaying(true);
      };
      
      const handlePause = () => {
        setIsPlaying(false);
      };
      
      // Add event listeners
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      
      // Clean up event listeners
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);
  
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "6281315481787"; // Ditambahkan kode negara (62 untuk Indonesia)
    const message = encodeURIComponent("Hai miral");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };
  
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(error => {
        console.log("Play failed:", error);
        // If play fails, try with muted
        if (!isMuted) {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(e => console.log("Muted play also failed:", e));
        }
      });
    }
  };
  
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  const handleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;
    
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
    if (!progressBarRef.current || !videoRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = x / width;
    
    videoRef.current.currentTime = percent * videoRef.current.duration;
  };
  
  const toggleCard = (id) => {
    if (isExpandedCard === id) {
      setIsExpandedCard(null);
    } else {
      setIsExpandedCard(id);
    }
  };

  // Featured congratulatory messages to display in cards
  const featuredMessages = [
    {
      id: 1,
      name: "Kim Soo-Hyun",
      role: "Korean Actor",
      message: "Selamat imnida",
      image: "/images/kim-soohyun.jpg",
      background: "bg-gradient-to-r from-blue-500 to-purple-500",
      icon: <FiStar className="text-yellow-300" />
    },
    {
      id: 2,
      name: "Budi Saksono, M.Sc., Ph.D.",
      role: "Pembimbing BRIN",
      message: "Selamat yah tapi jelek bukan purifikasi",
      image: "/images/pa-budi.jpg",
      background: "bg-gradient-to-r from-green-500 to-teal-500",
      icon: <FiAward className="text-teal-300" />
    },
    {
      id: 3,
      name: "Adrian Agus",
      role: "Co-Founder & CEO of PUYO Group (HAKA Dimsum)",
      message: "Ada masanya kita mencuri ruang dan waktu walau pasti berlalu, biarkan saja kita ke sana, selagi masih bisa bersama",
      image: "/images/haka-dimsum.jpg",
      background: "bg-gradient-to-r from-red-500 to-orange-500",
      icon: <FiGift className="text-yellow-300" />
    }
  ];

  return (
    <div className="pt-16 relative">
      <PageHeader 
        title="Selamat!"
        subtitle="Rayakan keberhasilan seminar proposal Nur Fadiyah Azzizah"
        bgColor="from-secondary-500 to-accent-500"
      />
      
      <CelebrationAnimation />
      
      {/* Video Hero Section */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-b from-accent-900/30 to-primary-900/30 dark:from-gray-900 dark:to-gray-900">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10"></div>
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black">
              <FiLoader className="text-white text-5xl animate-spin" />
            </div>
          )}
          
          {/* Video with enhanced controls */}
          <div className="absolute inset-0 group">
            <video 
              ref={videoRef}
              className="h-full w-auto max-w-none object-contain absolute left-1/2 top-0 transform -translate-x-1/2"
              playsInline
              autoPlay
              muted={false}
              loop
              src="/videos/video-1.mp4"
              poster="/images/poster-image.jpg"
            ></video>
            
            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 transform transition-all duration-300 opacity-0 group-hover:opacity-100 z-20">
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
                className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer z-20"
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
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-xl border border-white/20"
            >
              <div className="inline-block bg-white/20 backdrop-blur-md rounded-full p-4 mb-6">
                <FiHeart className="text-5xl text-red-500" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
                Selamat atas Keberhasilan Seminar Proposal!
              </h2>
              
              <p className="text-lg text-white/90 mb-8">
                cie dah sempro. keren dah luuu brooo. tapi masih ada jalan lagi yang harus di lewatin, semangat ya
              </p>
              
              <motion.button
                onClick={handleWhatsAppRedirect}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>klik button ini kalau mau jadi cantik</span>
              </motion.button>
              
              <div className="mt-6 text-white/70 text-sm">
                Klik tombol di atas untuk mengirim ucapan selamat langsung melalui WhatsApp
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Messages Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="section-title dark:text-white flex items-center justify-center">
                <FiMessageCircle className="mr-3 text-secondary-500" />
                Ucapan dari Orang Istimewa
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Beberapa ucapan selamat dari mereka yang istimewa
              </p>
            </div>
            
            {/* Featured Cards - Expandable */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {featuredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: message.id * 0.1 }}
                  className={`relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 cursor-pointer
                    ${isExpandedCard === message.id ? 'md:col-span-3 md:row-span-2' : 'hover:-translate-y-2'}`}
                  onClick={() => toggleCard(message.id)}
                >
                  <div className={`absolute inset-0 ${message.background} opacity-90`}></div>
                  
                  {/* Image Background - Fallback to solid color if image not available */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-30" 
                    style={{backgroundImage: `url(${message.image})`}}>
                  </div>
                  
                  <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                        {message.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-bold text-white text-xl">{message.name}</h3>
                        <p className="text-white/70 text-sm">{message.role}</p>
                      </div>
                      <div className="ml-auto">
                        {isExpandedCard === message.id ? 
                          <FiChevronUp className="text-white text-xl" /> : 
                          <FiChevronDown className="text-white text-xl" />
                        }
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {isExpandedCard === message.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-grow"
                        >
                          <p className="text-white text-lg italic leading-relaxed">"{message.message}"</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          className="flex-grow"
                        >
                          <p className="text-white/80 text-sm line-clamp-2 italic">"{message.message}"</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Message Wall */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MessageWall messages={messages} />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-900 dark:to-secondary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Bagikan Ucapan Selamatmu</h3>
            <motion.button
              onClick={handleWhatsAppRedirect}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              klik button ini kalau mau jadi cantik
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Congratulations;