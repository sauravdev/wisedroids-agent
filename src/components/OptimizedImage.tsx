import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  loading = 'lazy'
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : loading}
      decoding="async"
      onError={(e) => {
        // Fallback to a placeholder if image fails to load
        const target = e.target as HTMLImageElement;
        target.src = '/placeholder.png';
      }}
    />
  );
}

// Predefined image configurations for common use cases
export const ImageConfigs = {
  hero: {
    priority: true,
    loading: 'eager' as const
  },
  card: {
    priority: false,
    loading: 'lazy' as const
  },
  thumbnail: {
    priority: false,
    loading: 'lazy' as const
  }
};
