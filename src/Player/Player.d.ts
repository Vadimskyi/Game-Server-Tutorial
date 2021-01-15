import { ECharacterRace } from './PlayerManager';

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface PlayerInfo {
  id: string;
  characteRace: ECharacterRace;
  moveInfo: PlayerMoveInfo;
}

export interface PlayerMoveInfo {
  position: Vector3;
  dir: Vector3;
  angle: number;
  isMoving: boolean;
}