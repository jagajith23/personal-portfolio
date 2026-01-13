"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Song = {
  title: string;
  artist: string;
  albumArt: string;
  audioSrc: string;
};

export default function MusicWidget() {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const FADE_DURATION = 3;

  useEffect(() => {
    const fetchMusic = async () => {
      setLoading(true);
      try {
        const spotifyRes = await fetch("/api/spotify");
        if (!spotifyRes.ok) throw new Error("Failed to reach API");

        const spotifyData = await spotifyRes.json();
        if (!spotifyData.tracks || spotifyData.tracks.length === 0) {
          throw new Error("No tracks found");
        }

        const promises = spotifyData.tracks.map(async (track: any) => {
          try {
            const res = await fetch(
              `https://itunes.apple.com/search?term=${encodeURIComponent(
                track.searchQuery
              )}&media=music&entity=song&limit=1`
            );
            const data = await res.json();
            const itunesTrack = data.results[0];

            if (!itunesTrack || !itunesTrack.previewUrl) return null;

            return {
              title: itunesTrack.trackName,
              artist: itunesTrack.artistName,
              albumArt: itunesTrack.artworkUrl100.replace(
                "100x100bb",
                "600x600bb"
              ),
              audioSrc: itunesTrack.previewUrl,
            };
          } catch (e) {
            return null;
          }
        });

        const results = await Promise.all(promises);
        const validSongs = results.filter(
          (song): song is Song => song !== null
        );

        if (validSongs.length === 0) throw new Error("No valid previews found");

        setPlaylist(validSongs);
      } catch (error) {
        console.error("Music Widget Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  const currentSong = playlist[currentIndex];

  useEffect(() => {
    if (!isPlaying || !audioRef.current) return;

    const updateProgress = () => {
      if (audioRef.current) {
        const { currentTime, duration } = audioRef.current;

        if (duration > 0) {
          setProgress((currentTime / duration) * 100);
        }

        if (duration > 0 && duration - currentTime <= FADE_DURATION) {
          const timeLeft = duration - currentTime;
          const fadeVolume = Math.max(0, timeLeft / FADE_DURATION);
          audioRef.current.volume = fadeVolume;
        } else {
          audioRef.current.volume = 1;
        }
      }
      requestAnimationFrame(updateProgress);
    };

    const animationId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 1;
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setErrorCount(0);
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    if (isPlaying) setIsPlaying(true);
  };

  const prevSong = () => {
    setErrorCount(0);
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    if (isPlaying) setIsPlaying(true);
  };

  const handleAudioError = () => {
    if (errorCount >= playlist.length) {
      console.error("All songs failed to load. Stopping playback.");
      setIsPlaying(false);
      setErrorCount(0);
      return;
    }

    console.warn(`Error loading ${currentSong?.title}. Skipping to next...`);
    setErrorCount((prev) => prev + 1);
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && currentSong) {
      setProgress(0);

      audioRef.current.volume = 1;

      audioRef.current.pause();
      audioRef.current.load();

      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.log("Playback prevented (Autoplay policy):", e);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [currentIndex, currentSong]);

  if (loading) {
    return (
      <div className="w-full max-w-xs h-24 p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentSong) return null;

  return (
    <div className="w-full max-w-xs p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm relative overflow-hidden font-aoboshi group">
      <audio
        ref={audioRef}
        src={currentSong.audioSrc}
        onEnded={nextSong}
        onError={handleAudioError}
        crossOrigin="anonymous"
      />

      <div className="flex items-center gap-4 relative z-10">
        <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden border border-zinc-700/50 group-hover:border-zinc-500 transition-colors">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentSong.albumArt}
              src={currentSong.albumArt}
              alt={currentSong.title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: isPlaying ? 1.1 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isPlaying ? "grayscale-0" : "grayscale"
              }`}
            />
          </AnimatePresence>

          <button
            onClick={togglePlay}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-20"
          >
            {isPlaying ? (
              <PauseIcon className="w-6 h-6 text-white drop-shadow-lg" />
            ) : (
              <PlayIcon className="w-6 h-6 text-white drop-shadow-lg" />
            )}
          </button>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
          <div className="flex justify-between items-center">
            <div className="truncate pr-2">
              <h4 className="text-sm font-bold text-zinc-100 truncate">
                {currentSong.title}
              </h4>
              <p className="text-xs text-zinc-500 truncate">
                {currentSong.artist}
              </p>
            </div>

            <div className="h-4 flex items-center gap-[2px]">
              {isPlaying && <AnimatedBars />}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={prevSong}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <PrevIcon className="w-4 h-4" />
            </button>

            <div className="h-0.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500"
                style={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            <button
              onClick={nextSong}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <NextIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedBars() {
  return (
    <div className="flex items-end gap-[2px] h-3">
      {[1, 2, 3, 4].map((bar) => (
        <motion.div
          key={bar}
          className="w-[2px] bg-emerald-500 rounded-t-sm"
          animate={{
            height: [4, 12, 4],
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const PlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const NextIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </svg>
);

const PrevIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </svg>
);
