export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  isHost?: boolean;
  giftsReceived: number;
  starPoints?: number;
}

export interface Gift {
  id: string;
  name: string;
  icon: string;
  value: number;
  animation: 'pulse' | 'float' | 'shake' | 'sparkle';
}

export interface Room {
  id: string;
  title: string;
  hostId: string;
  type: 'voice' | 'stream';
  viewerCount: number;
  coverImage: string;
  pkActive?: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
  isSystem?: boolean;
  giftId?: string;
}

export interface PKBattle {
  id: string;
  roomAId: string;
  roomBId: string;
  scoreA: number;
  scoreB: number;
  timeLeft: number;
}
