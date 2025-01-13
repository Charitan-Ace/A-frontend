import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  width = "w-full",
  height = "h-auto",
  borderRadius = "rounded-lg",
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  className = "",
}) => {
  if (!videoUrl) {
    return <p className="text-center text-red-500">No video URL provided</p>;
  }

  return (
    <div className={`mx-auto ${width} ${className}`}>
      <video
        className={`${width} ${height} ${borderRadius}`}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
