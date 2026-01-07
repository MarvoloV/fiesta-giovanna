"use client";

import { useState, useEffect, useRef } from "react";
import Icon from "@/components/common/ui/AppIcon";

interface MusicControlsProps {
  isOpen?: boolean;
  audioSrc?: string;
}

const MusicControls = ({
  isOpen = false,
  audioSrc = "/happy.mp3",
}: MusicControlsProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;

      const handleMusicEvent = (event: Event) => {
        const customEvent = event as CustomEvent;
        if (customEvent.detail?.enabled) {
          playMusic();
        }
      };

      window.addEventListener("enableMusic", handleMusicEvent);

      return () => {
        window.removeEventListener("enableMusic", handleMusicEvent);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [audioSrc]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="fixed top-4 md:top-24 lg:top-8 right-4 lg:right-8 z-[100] flex items-center gap-2">
      {showVolumeSlider && (
        <div className="bg-card rounded-lg shadow-celebration p-3 animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-3">
            <Icon
              name="SpeakerXMarkIcon"
              size={20}
              className="text-muted-foreground"
              variant="solid"
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              aria-label="Control de volumen"
            />
            <Icon
              name="SpeakerWaveIcon"
              size={20}
              className="text-primary"
              variant="solid"
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setShowVolumeSlider(!showVolumeSlider)}
        className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-celebration hover:bg-muted transition-all duration-300 hover:scale-110"
        aria-label="Ajustar volumen"
      >
        <Icon
          name={volume === 0 ? "SpeakerXMarkIcon" : "SpeakerWaveIcon"}
          size={20}
          className="text-primary"
          variant="solid"
        />
      </button>

      <button
        onClick={togglePlay}
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-countdown hover:scale-110 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        <Icon
          name={isPlaying ? "PauseIcon" : "PlayIcon"}
          size={24}
          className="text-primary-foreground"
          variant="solid"
        />
      </button>
    </div>
  );
};

export default MusicControls;
