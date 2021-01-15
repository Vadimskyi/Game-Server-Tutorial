import { Vector3 } from '../Player/Player.d';
import { SocketEvent } from '../Constants';
import { PlayerManager } from '../Player/PlayerManager';
import { requestAdhub } from '../AdhubLib';

export class SocketController {
  private socketHandler: SocketIO.Server;

  private playerManager: PlayerManager;

  constructor(handler: SocketIO.Server) {
    this.socketHandler = handler;
    this.playerManager = new PlayerManager();
    this.listen();
  }

  private listen() {
    this.socketHandler.on(SocketEvent.CONNECT, (socket: any) => {
      const playerId: string = socket.id;

      const playerInfo = this.playerManager.createPlayer(playerId);
      const playerList = this.playerManager.getPlayerList();
      socket.emit(SocketEvent.LOGIN, { data: { id: playerId, playerList: { playerList } } });
      socket.broadcast.emit(SocketEvent.LOGIN_OTHER, { data: { playerInfo } });

      console.log("New player connected! id:", playerId);
      
      socket.on(SocketEvent.DISCONNECT, () => {
        this.playerManager.removePlayer(playerId);
        socket.broadcast.emit(SocketEvent.LOGOUT, { data: { id: playerId } });

        console.log("Player disconnected! id:", playerId);
      });

      socket.on(SocketEvent.PLAYER_INPUT_ACTION, (data: any) => {
        socket.broadcast.emit(SocketEvent.PLAYER_INPUT_ACTION, { data });

        if (data.action === 'Move') {
          const playerPos: Vector3 = { x: data.x, y: data.y, z: data.z };
          this.playerManager.setPlayerPosition(playerId, playerPos);
        }
        
        console.log("player action: " + JSON.stringify(data, null, 2));
      });

      socket.on(SocketEvent.REQUEST_AD_DATA, async (data: any) => {
        console.log('reqeust ad data:', JSON.stringify(data, null, 2));
        const adData = await requestAdhub();
        socket.emit(SocketEvent.REQUEST_AD_DATA, { adData });
      });
    });
  }
}