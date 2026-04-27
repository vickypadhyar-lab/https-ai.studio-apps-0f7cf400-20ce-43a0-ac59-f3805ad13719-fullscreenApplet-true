import { Gift } from './types';

export const GIFTS: Gift[] = [
  { id: 'rose', name: 'Rose', icon: '🌹', value: 1, animation: 'float' },
  { id: 'fire', name: 'Fire', icon: '🔥', value: 10, animation: 'pulse' },
  { id: 'heart', name: 'Heart', icon: '❤️', value: 5, animation: 'sparkle' },
  { id: 'diamond', name: 'Diamond', icon: '💎', value: 100, animation: 'shake' },
  { id: 'crown', name: 'Crown', icon: '👑', value: 500, animation: 'float' },
  { id: 'rocket', name: 'Rocket', icon: '🚀', value: 1000, animation: 'pulse' },
];

export const INITIAL_ROOMS = [
  {
    id: 'room-1',
    title: 'Late Night Chill & Vibe',
    hostId: 'host-1',
    type: 'voice',
    viewerCount: 120,
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format',
  },
  {
    id: 'room-2',
    title: 'Gaming & High Stakes PK',
    hostId: 'host-2',
    type: 'stream',
    viewerCount: 850,
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format',
    pkActive: true,
  },
];
