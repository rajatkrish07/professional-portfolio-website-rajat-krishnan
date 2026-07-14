import React, { useState, useEffect } from 'react';
import { profileData } from '../data';

interface ProfileImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  alt?: string;
}

export default function ProfileImage({ className, alt, ...props }: ProfileImageProps) {
  const [src, setSrc] = useState(profileData.profilePicture);
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Sync state if profileData.profilePicture changes
  useEffect(() => {
    setSrc(profileData.profilePicture);
    setRetryCount(0);
    setHasError(false);
  }, [profileData.profilePicture]);

  const handleError = () => {
    if (retryCount < 3) {
      const nextRetry = retryCount + 1;
      setRetryCount(nextRetry);
      
      // Append robust cache-busting timestamp and retry param to force browser asset refetch
      const separator = profileData.profilePicture.includes('?') ? '&' : '?';
      const cacheBuster = `${profileData.profilePicture}${separator}retry=${nextRetry}&t=${Date.now()}`;
      
      console.warn(`[ProfileImage] Failed to load. Retrying (${nextRetry}/3) with cache-buster: ${cacheBuster}`);
      setSrc(cacheBuster);
    } else {
      console.error('[ProfileImage] Failed to load after 3 retries. Displaying high-contrast RK initials SVG fallback.');
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className || ''} bg-[#0f172a]`}
        aria-label={alt || profileData.name}
        role="img"
      >
        <rect width="100%" height="100%" fill="#0f172a" />
        <text
          x="50%"
          y="55%"
          fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
          fontSize="32"
          fontWeight="bold"
          fill="#38bdf8"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {profileData.initials || "RK"}
        </text>
      </svg>
    );
  }

  return (
    <img
      src={src}
      alt={alt || profileData.name}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
