export enum SocketEvent {
  // socketio에 미리 약속된 코드
  CONNECT = 'connection',
  DISCONNECT = 'disconnect',
  
  // 게임에서 정의
  LOGIN = 'login',
  LOGIN_OTHER = 'login_other',
  LOGOUT = 'logout',
  
  PLAYER_INPUT_ACTION = 'player_input_action',

  REQUEST_AD_DATA = 'request_ad_data'
}