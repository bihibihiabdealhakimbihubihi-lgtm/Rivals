/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Stat, CharacterReward, Hero } from './types';

export const STATS: Stat[] = [
  { label: 'Claimed Today', value: 24580 },
  { label: 'Skins Unlocked', value: 890000, suffix: '+' },
  { label: 'Online Users', value: 12402 },
];

export const SKIN_REWARDS: CharacterReward[] = [
  {
    id: 'spiderman',
    name: 'Spider-Man',
    skinName: 'Future Foundation',
    image: 'https://i.postimg.cc/FzT7PJ7r/Spider-Man-Future-Foundation-Table-Icon.webp',
    rarity: 'Mythic',
    color: '#00E5FF'
  },
  {
    id: 'venom',
    name: 'Venom',
    skinName: 'Anti-Venom',
    image: 'https://i.postimg.cc/kgpY0jkc/venom-anti-venom.webp',
    rarity: 'Exotic',
    color: '#FFFFFF'
  },
  {
    id: 'scarletwitch',
    name: 'Scarlet Witch',
    skinName: 'Chaos Queen',
    image: 'https://i.postimg.cc/Px4RRthG/images.jpg',
    rarity: 'Mythic',
    color: '#C200FF'
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    skinName: 'Berserker Rage',
    image: 'https://i.postimg.cc/XYLxWsmg/images-(5).jpg',
    rarity: 'Legendary',
    color: '#FFD700'
  },
  {
    id: 'ironman',
    name: 'Iron Man',
    skinName: 'Cosmic Armor',
    image: 'https://i.postimg.cc/FKjr1Jb6/img-doctor-strange.webp',
    rarity: 'Exotic',
    color: '#FF003C'
  },
  {
    id: 'magneto',
    name: 'Magneto',
    skinName: 'Omega Power',
    image: 'https://i.postimg.cc/N0p8nKXZ/images.jpg',
    rarity: 'Legendary',
    color: '#FF003C'
  },
  {
    id: 'jeff',
    name: 'Jeff the Land Shark',
    skinName: 'Summer Splash',
    image: 'https://i.postimg.cc/yYZMzHvn/download.jpg',
    rarity: 'Limited',
    color: '#00E5FF'
  }
];

export const HEROES: Hero[] = [
  {
    id: 'spiderman-hero',
    name: 'Spider-Man',
    role: 'Duelist',
    image: 'https://i.postimg.cc/Y9S4Q9y0/Spider-Man-Spider-Man-No-Way-Home-Table-Icon-(1).webp',
    color: '#00E5FF'
  },
  {
    id: 'venom-hero',
    name: 'Venom',
    role: 'Vanguard',
    image: 'https://i.postimg.cc/WprBBV9G/download.jpg',
    color: '#FFFFFF'
  },
  {
    id: 'scarlet-hero',
    name: 'Scarlet Witch',
    role: 'Strategist',
    image: 'https://i.postimg.cc/ncXDFdDg/download.jpg',
    color: '#C200FF'
  },
  {
    id: 'wolverine-hero',
    name: 'Wolverine',
    role: 'Vanguard',
    image: 'https://i.postimg.cc/263zQtrm/download.jpg',
    color: '#FFD700'
  },
  {
    id: 'ironman-hero',
    name: 'Iron Man',
    role: 'Duelist',
    image: 'https://i.postimg.cc/TwvzwH1C/download.jpg',
    color: '#FF003C'
  },
  {
    id: 'magneto-hero',
    name: 'Magneto',
    role: 'Vanguard',
    image: 'https://i.postimg.cc/vZ62VLpC/download.jpg',
    color: '#FF003C'
  },
  {
    id: 'jeff-hero',
    name: 'Jeff the Land Shark',
    role: 'Strategist',
    image: 'https://i.postimg.cc/ry3Hgw5f/images.jpg',
    color: '#00E5FF'
  }
];

export function hasWhiteBg(url: string | undefined): boolean {
  if (!url) return false;
  return url.includes('postimg.cc') && !url.includes('Future-Foundation') && !url.includes('anti-venom');
}
