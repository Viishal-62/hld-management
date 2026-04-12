import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HLD Brain - System Design',
    short_name: 'HLD Brain',
    description: 'An interactive learning platform to master high-level system design concepts.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0e16',
    theme_color: '#0c0e16',
    icons: [
      {
        src: '/globe.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
