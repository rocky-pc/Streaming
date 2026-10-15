export const siteConfig = {
  name: 'StreamHub',
  description: 'Modern video streaming platform',
  url: 'http://localhost:3000',
  ogImage: '/og-image.png',
  logo: {
    text: 'StreamHub',
    icon: 'Play',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Upload', href: '/upload' },
  ],
  theme: {
    primary: '#6366f1',
    background: '#030712',
    surface: '#111827',
    border: '#1f2937',
  },
  video: {
    maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB
    allowedTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'application/x-mpegURL'],
    thumbnailTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxThumbnailSize: 5 * 1024 * 1024, // 5MB
  },
  pagination: {
    videosPerPage: 20,
  },
} as const

export type SiteConfig = typeof siteConfig