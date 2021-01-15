import {
  PlayerInfo,
  Vector3,
  PlayerMoveInfo
} from './Player.d';
import * as _ from 'lodash';

export enum ECharacterRace {
  Footman = 1,
  OrcWarrior = 2
}

export class PlayerManager {
  private playerList: PlayerInfo[] = [];

  public createPlayer(id: string): PlayerInfo {
    const race: ECharacterRace = this.playerList.length % 2 + 1;
    const newPlayer: PlayerInfo = {
      id: id,
      characteRace: race,
      moveInfo: {
        position: this.getSpawnPosition(race),
        dir: { x: 0, y: 0, z: 0 },
        angle: 0,
        isMoving: false
      }
    };

    this.playerList.push(newPlayer);
    console.log(JSON.stringify(newPlayer, null, 2));
    console.log(`current player count: ${this.playerList.length}`);

    return newPlayer;
  }

  public setPlayerPosition(id: string, pos: Vector3) {
    const player = _.find(this.playerList, item => item.id === id);
    if (player) {
      console.log('SET POS: ', pos);
      player.moveInfo.position = pos;
    }
  }

  public getPlayerList(): PlayerInfo[] {
    return this.playerList;
  }

  public removePlayer(id: string) {
    const targetIndex: number = this.playerList.findIndex(x => x.id === id);
    if (-1 < targetIndex) {
      this.playerList.splice(targetIndex, 1);
    }

    console.log(`current player count: ${this.playerList.length}`);
  }

  private getSpawnPosition(race: ECharacterRace): Vector3 {
    const x = Math.floor(Math.random() * 21 - 10);
    let z = 0;
    if (race === ECharacterRace.Footman) {
      z = Math.floor(Math.random() * 6 - 20);
    } else {
      z = Math.floor(Math.random() * 6 + 15);
    }

    return {
      x, y: 10, z
    };
  }
}