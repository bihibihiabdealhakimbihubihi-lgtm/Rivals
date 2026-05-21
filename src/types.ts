/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface CharacterReward {
  id: string;
  name: string;
  skinName: string;
  image: string;
  rarity: 'Legendary' | 'Mythic' | 'Exotic' | 'Limited';
  color: string;
}

export interface Hero {
  id: string;
  name: string;
  role: 'Vanguard' | 'Duelist' | 'Strategist';
  image: string;
  color: string;
}
