interface BaseResponse {
  readonly code: number;
  readonly msg?: string;
}
export interface OnInitSuccessResponse {
  readonly code: number;
  readonly msg?: string;
  readonly description?: any;
}

/**
 *
 * Usually the reconnection time exceeds two minutes (for example, disconnected or the in mobile switches to the background, and the reconnection is triggered after two minutes)
 * The system will automatically recycle the instance, and it will return code > 0, needs to init and createSession
 *
 * code=-3 Retries exceeded, needs to init and createSession
 * code=-2 Auto reconnecting
 * code=-1 Connect failed, try again alter
 * code>0 Proxy error, connect failed, needs to init and createSession
 * @ignore
 */
export interface OnConnectFailedResponse extends BaseResponse {}
export interface OnConnectSuccessResponse {
  readonly code: number;
  readonly seat_index: number; // seats index，multi player scene
  readonly role: string; // role，multi player scene
}

/**
 * code=-2 Failed to get H264 encoding
 * code=-1 Failed to setRemoteDescription
 * code=1 System busy
 * code=2 Token illegal
 * code=3 Insufficient user bandwidth
 * code=4 Insufficient resources, no resource available
 * code=5 Session failed, need to retry
 * code=6 Incorrect media description information
 * code=7 Launch game failed
 * code=100 Proxy error
 * code=255	Device does not support webrtc
 * @ignore
 */
export interface OnWebrtcStatusChangeResponse extends BaseResponse {}

/**
 * code=-2 Create offer failed, need to init and createSession
 * code=-1 Need to reconnect, when fps is 0 for 10s, can not receive stream, connection timeout or ice disconnected. If you passed init param `reconnect: true`, SDK will reconnect automatically, or you can reconnect manually.
 * code=0	Server close
 * code=1	User repeated connection
 * code=2 The user's heartbeat times out, the webrtc server actively disconnects, and this message may be lost
 * @ignore
 */
export interface OnDisconnectResponse extends BaseResponse {}

export interface WebrtcStats {
  readonly bit_rate?: number; // Bit rate received by the client, unit: Mbps
  readonly cpu?: number | string; // Cloud CPU usage
  readonly gpu?: string; // Cloud GPU usage
  readonly delay?: number; // The delay from the client receiving the image frame to the decoding display, unit: ms, iOS may not receive
  readonly fps?: number; // FPS
  readonly load_cost_time?: number; // unit: Mbps
  readonly nack?: number;
  readonly packet_lost?: number;
  readonly packet_received?: number;
  readonly rtt?: number;
  readonly timestamp?: number;
}

/**
 * latency values
 * value=0 NETWORK_NORMAL
 * value=1 NETWORK_CONGESTION
 * value=2 NACK_RISING
 * value=3 HIGH_DELAY
 * value=4 NETWORK_JITTER
 * @ignore
 */
export interface OnNetworkChangeResponse {
  readonly status: 'idle' | 'noflow' | 'noflowcenter' | 'stats' | 'jitter' | 'openurl' | 'latency';
  readonly times?: number;
  readonly stats?: WebrtcStats;
  readonly data?: {
    code?: number;
    value?: number | string;
    message?: string;
    begin?: number;
    finish?: number;
  };
}

/**
 *  Touch Type valid values: `touchstart`, `touchmove`, `touchend`, `touchcancel`.
 */
export type TouchType = 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel' | string;

/**
 * onTouchEvent response OnTouchEventResponse[]
 * @ignore
 */
export interface OnTouchEventResponse {
  /**
   * identifier
   */
  readonly id: number;
  /**
   * Touch Type valid values: `touchstart`, `touchmove`, `touchend`, `touchcancel`.
   */
  readonly type: TouchType;
  /**
   * The X coordinate of the video view
   */
  readonly x: number;
  /**
   * The Y coordinate of the video view
   */
  readonly y: number;
  /**
   * The X coordinate of the page
   */
  readonly pageX: number;
  /**
   * The Y coordinate of the page
   */
  readonly pageY: number;
  /**
   * The delta movement of X coordinate
   */
  readonly movementX: number;
  /**
   * The delta movement of Y coordinate
   */
  readonly movementY: number;
}

export interface OnGameStartCompleteResponse {
  readonly request_id: string;
  readonly app_id: number;
  readonly user_id: string;
  readonly game_id: string;
  readonly status: number; // 0 success 1 failed
}

export interface OnGameStopResponse {
  readonly user_id: string;
  readonly game_name: string;
  readonly timestamp: number;
  readonly message: string;
}

export interface OnLoadGameArchiveResponse {
  readonly user_id: string;
  readonly game_id: string;
  readonly name: string; // Archive filename
  readonly url: string; // Archive download url
  readonly status: number; // 0: load success 1: load failed 2: verify failed 3: unzip failed 4: other errors 5: downloading
  readonly save_type: 'Auto' | 'Normal';
  readonly category_id: string;
  readonly archive_size: number;
  readonly loaded_size: number;
}
export interface OnSaveGameArchiveResponse {
  readonly user_id: string;
  readonly game_id: string;
  readonly name: string; // Archive filename
  readonly md5: string;
  readonly status: number; // 0: success 1: failed 2: zip failed 3: other errors 4: uploading
  readonly save_type: 'Auto' | 'Normal';
  readonly category_id: string;
  readonly archive_size: number;
  readonly saved_size: number;
}

export interface ServerSideDescriptionGameConfig {
  readonly sdk_conf: {
    login_helper?: any;
    virtual_keys?: any;
    user_keys?: any;
    cursor_mode?: number;
    webdraft_level?: number;
    connect_timeout?: number;
    noflow_timeout?: number;
    cursor_scale?: number;
    cursor_style?: 'standard' | 'default_huge';
    bgimg_url?: string;
    default_cursor_url?: string;
    lock_by_mouseright?: boolean;
    keep_lastframe?: boolean;
    tablet_mode?: boolean;
    mobile_show_cursor?: boolean;
    enable_event_intercept?: boolean;
  };
  readonly GameEncodePreset?: any;
  readonly GameRunningInfo?: any;
}

export interface ServerSideDescriptionFeatureSwitch {
  network_event_script?: {
    loss_rate_threshold?: number;
    nack_rate_threshold?: number;
    rtt_avg_threshold?: number;
    rtt_dev_threshold?: number;
    notify_threshold?: number;
  };
}

export interface ServerSideDescription {
  readonly app_id: number;
  readonly game_id: string;
  readonly group_id: string;
  /**
   * code=-2 Failed to get H264 encoding
   * code=-1 Failed to setRemoteDescription
   * code=0	Success
   * code=1	System busy
   * code=2	Token illegal
   * code=6	SDP error
   * code=8	Waiting for host to connect
   * code=9	The role has reached the limit
   * code=100 Proxy error
   */
  readonly code: number;
  readonly msg?: string;
  readonly message: string;
  readonly type: string;
  readonly sdp: string;
  readonly server_ip: string;
  readonly server_version: string;
  readonly server_port?: string;
  readonly region: string;
  readonly instance_type?: string; // L1 S1 M1
  readonly request_id: string;
  readonly user_id: string;
  readonly user_ip: string;
  readonly input_seat: number;
  readonly game_config?: ServerSideDescriptionGameConfig;
  readonly feature_switch?: ServerSideDescriptionFeatureSwitch;
  readonly role: string;
  readonly metric_key: string;
  readonly plat: 'android' | 'pc' | 'Android';
  readonly sig_key?: string;
  readonly host_name: string; // Only in mobile game
  readonly video: {
    height: number;
    width: number;
  };
  readonly video_codec: string;
  readonly screen_config?: {
    width: number;
    height: number;
    orientation: 'landscape' | 'portrait';
  };
  /**
   * The webrtc structure returned by Proxy
   */
  readonly WebrtcResponse?: {
    Code: number;
    Msg: string;
    Sdp: string;
  };
}

/**
 * When the cloud input state changes, it will be triggered, You can judge whether the input box is focused.
 * @ignore
 */
export interface OnInputStatusChangeResponse {
  readonly field_type: 'normal_input' | 'autologin_input' | 'unfocused';
  readonly status: 'disabled' | 'enabled';
}

/**
 * Gamepad connection status
 * @ignore
 */
export interface OnGamepadConnectChangeResponse {
  readonly status: 'gamepadconnect' | 'gamepaddisconnect';
  readonly index: number;
  readonly gamepad?: Gamepad;
}

/**
 * Cursor show/hide, only trigger when status changed.
 * @ignore
 */
export interface OnCursorShowStatChangeResponse {
  readonly oldStatus: boolean;
  readonly newStatus: boolean;
}

/**
 * Cloud config changed, only trigger when status changed.
 * @ignore
 */
export interface OnConfigurationChangeResponse {
  readonly screen_config: {
    width: number;
    height: number;
    orientation: 'landscape' | 'portrait';
  };
}

/**
 * Cloud screen resolution changed.
 * @ignore
 */
export interface OnRemoteScreenResolutionChangeResponse {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface SeatsInfo {
  players: {
    name: string;
    seat_index: number;
    /**
     * 0 host forbid mic
     * 1 close mic(self)
     * 2 open mic
     */
    mic_status: number;
  }[];
  viewers: {
    name: string;
    seat_index: number;
    /**
     * 0 host forbid mic
     * 1 close mic(self)
     * 2 open mic
     */
    mic_status: number;
  }[];
}

export interface SeatChangeInfo {
  user_id: string;
  to_role?: 'viewer' | 'player';
  seat_index?: number;
}

export interface ChangeMicStatusResponse {
  type?: string; // mic_status
  /**
   * 0: Success
   * -2: NoAuthorized
   * -4: NoSuchUser
   */
  code: number;
  /**
   * 0 host forbid mic
   * 1 close mic(self)
   * 2 open mic
   */
  status?: number;
  user_id?: string;
}

export interface OnMultiPlayerChangeResponse {
  readonly user_state?: {
    state: 'offline' | 'online';
    user_id: string;
  };
  readonly seats_info?: SeatsInfo;
  /**
   * Only host can receive this message.
   */
  readonly submit_seat_change?: SeatChangeInfo;
}

export type EventAutoPlayResponse = {
  readonly type: 'autoplay';
  readonly data: {
    code: number; // 0 success -1 failed
    message: string;
  };
};

export type EventIdleResponse = {
  readonly type: 'idle';
  readonly data: {
    times: number;
  };
};

export type OnEventResponseType = 'autoplay' | 'idle';

export type OnEventAutoplayResponse = {
  type: 'autoplay';
  data: {
    code: number; // 0 success -1 failed
    message: string;
  };
};

export type OnEventIdleResponse = {
  type: 'idle';
  data: {
    times: number;
  };
};

export type OnEventOpenUrlResponse = {
  type: 'openurl';
  data: {
    value: string;
  };
};

export type OnEventWebrtcStatsResponse = {
  type: 'webrtc_stats';
  data: WebrtcStats;
};

export type OnEventNoflowResponse = {
  type: 'noflow';
  data?: {};
};

export type OnEventNoflowcenterResponse = {
  type: 'noflowcenter';
  data?: {};
};

export type OnEventLatencyResponse = {
  type: 'latency';
  data: {
    value: number;
    /**
     * latency values
     * value=0 NETWORK_NORMAL
     * value=1 NETWORK_CONGESTION
     * value=2 NACK_RISING
     * value=3 HIGH_DELAY
     * value=4 NETWORK_JITTER
     */
    message: string;
  };
};

/**
 * Usually the http protocol will fail to read clipboard
 */
export type OnEventReadClipboardErrorResponse = {
  type: 'readclipboarderror';
  data?: {
    message?: any;
  };
};

export type OnEventPointerLockErrorResponse = {
  type: 'pointerlockerror';
  data?: {};
};

export type OnEventResponse =
  | OnEventAutoplayResponse
  | OnEventIdleResponse
  | OnEventOpenUrlResponse
  | OnEventWebrtcStatsResponse
  | OnEventNoflowResponse
  | OnEventNoflowcenterResponse
  | OnEventLatencyResponse
  | OnEventReadClipboardErrorResponse
  | OnEventPointerLockErrorResponse;

/**
 * Push stream
 */
export type StreamPushState = 'NoStreamPushing' | 'PushConnecting' | 'Pushing' | 'PushPaused' | 'PushReConnecting';

export type OnStreamPushStateChangeResponse = {
  stream_push_state: StreamPushState;
};

/**
 * Debug settings
 */
export type DebugSettingParams = {
  /**
   * Whether to print the messages input by the keyboard/mouse.
   */
  showSendKmData?: boolean;
  /**
   * Whether to print the sent ACK messages.
   */
  showSendAckData?: boolean;
  /**
   * Whether to print the sent heartbeat messages.
   */
  showSendHbData?: boolean;
  /**
   * Whether to print the heartbeat response packet messages.
   */
  showOnHbMessage?: boolean;
  /**
   * Whether to print the keyboard/mouse response messages.
   */
  showOnKmMessage?: boolean;
  /**
   * Whether to print the ACK response packet messages.
   */
  showOnAckMessage?: boolean;
  /**
   * Whether to print the CD response packet messages.
   */
  showOnCdMessage?: boolean;
  /**
   * Whether to print the server response packet messages.
   */
  showOnSvMessage?: boolean;
  /**
   * Whether to print all logs of the SDK.
   */
  showLog?: boolean;
  /**
   * Whether to display the WebRTC status on the data panel. You can also press CTRL + ~ to display it.
   */
  showStats?: boolean;
};

/**
 * Mouse events on PC
 */
export type MouseEvent =
  | 'mouseleft'
  | 'mouseright'
  | 'mousemiddle'
  | 'mouseforward'
  | 'mousebackward'
  | 'mousescroll'
  | 'mousemove'
  | 'mousemove_v2'
  | 'mousedeltamove'
  | 'mousedeltamove_v2';

/**
 * Gamepad events
 */
export type GamePadEvent =
  | 'gamepadconnect'
  | 'gamepaddisconnect'
  | 'gamepadkey'
  | 'axisleft'
  | 'axisright'
  | 'lt'
  | 'rt';

export type KeyBoardEvent = 'keyboard';

/**
 * KM DataChannel data types
 */
type KMMessageType = MouseEvent | GamePadEvent | KeyBoardEvent;

/**
 * The underlying raw data type, which can be used to send mouse, keyboard, and joystick messages.
 */
type RawEventData = {
  type: KMMessageType;
  x?: number;
  y?: number;
  down?: boolean;
  delta?: number;
  key?: number;
};

/**
 * Microphone parameters, specific values ​​can be set according to requirements.
 * @ignore
 */
export interface MicProfileConstraints extends MediaTrackConstraints {
  sampleRate?: number; // default 44100
  echoCancellation?: ConstrainBoolean; // default true
  noiseSuppression?: ConstrainBoolean; // default true
  autoGainControl?: ConstrainBoolean; // default true
  deviceId?: string; // You can through getDevices interface to get deviceID. The default deviceId depends on system default value.
}

/**
 * Camera parameters, specific values ​​can be set according to requirements.
 * @ignore
 */
export interface CameraProfileConstraints {
  /**
   * default 1280, pass null to use the default value
   */
  width?: number | null;
  /**
   * default 720, pass null to use the default value
   */
  height?: number | null;
  frameRate?: number;
  bitrate?: number;
  /**
   * You can through getDevices interface to get deviceID. The default deviceId depends on system default value.
   *
   * Mobile can pass 'user' | 'environment', to use front/rear camera.
   */
  deviceId?: string | 'user' | 'environment';
}

/**
 * Camera resolution type for quick setup
 */
export type CameraProfileType = '120p' | '180p' | '240p' | '360p' | '480p' | '720p' | '1080p';

/**
 * TCGSDK InitConfig related configuration.
 */
export interface InitConfig {
  /**
   *  Tencent cloud APPID, Optional
   */
  appid?: number;
  /**
   * Cloud rendering mount point(HTML element ID).
   */
  mount: string;
  /**
   * Whether to enable mic
   *
   * @default false
   */
  mic?: boolean | MicProfileConstraints;
  /**
   * Whether to enable camera
   *
   * @default false
   */
  camera?: boolean | CameraProfileConstraints | CameraProfileType;
  /**
   * Enables/Disables the cursor sliding mode. This API is generally used in scenarios where there is an offset between the displayed cursor and the actual touch point.
   *
   * Can not use it on PC
   *
   * @default false
   */
  tabletMode?: boolean;
  /**
   * Mobile Game
   *
   * @default false
   */
  mobileGame?: boolean;
  /**
   * Whether to enable VPX encoding
   *
   * @default false
   */
  mobileVpx?: boolean;
  /**
   * Cursor mode valid values: `0` local default cursor, `1` cursor image for cloud delivery, `2` cloud cursor
   *
   * @default 0
   */
  cursorMode?: number;
  /**
   * Whether to enable click any point to fullscreen.
   *
   * @default false
   */
  clickToFullscreen?: boolean;
  /**
   * Whether to enable click any point to play video.
   *
   * @default true
   */
  clickBodyToPlay?: boolean;
  /**
   * User no action threshold, in seconds. Default value 300s, it will callback on onNetworkChange witt message `{status: 'idle', times: 1}`
   *
   * @default 300
   */
  idleThreshold?: number;
  /**
   * Keep last frame image when destroy. Mac safari/ios webview does not work.
   *
   * @default false
   */
  keepLastFrame?: boolean;
  /**
   * Whether to enable auto reconnect. It will happen when FPS is 0 for 10s or first connect failed.
   *
   * @default true
   */
  reconnect?: boolean;
  /**
   * Whether to show loading.
   *
   * @default true
   */
  showLoading?: boolean;
  /**
   * Loading text
   *
   * @default '正在启动云渲染'
   */
  loadingText?: string;
  /**
   * Restart button text
   *
   * @default '重新连接'
   */
  restartText?: string;
  /**
   * Whether to rotate the entire HTML view. Default value: `false.
   *
   * @default false
   */
  autoRotateContainer?: boolean;
  /**
   * Whether to rotate the `mountPoint` node. Default value: `false`.
   *
   * @default false
   */
  autoRotateMountPoint?: boolean;
  /**
   * When mount point size(width/height) bigger than cloud stream.
   *
   * `true` Stretch video size and fit on short edge.
   *
   * `false` Do not stretch the video, keep the original cloud resolution.
   *
   * @default true
   */
  fullVideoToScreen?: boolean;
  /**
   * Enables/Disables the debugging mode. If it is enabled, logs will be printed in the console.
   */
  debugSetting?: DebugSettingParams;
  /**
   * 0: Turn off mouse high frequency sampling
   *
   * 1: Open and send as package
   *
   * 2: Send as single message
   *
   * 3: Limit the length of the packet, and lose more
   *
   * @default 0
   */
  webDraftLevel?: number;
  /**
   * Force display of mouse
   *
   * @default false
   */
  forceShowCursor?: boolean;
  /**
   * Sets background image for web container, not cloud desktop background image.
   */
  bgImgUrl?: string;
  /**
   * Default cursor image(https/http url), default is a 3px dots, pass '' does not show cursor.
   */
  defaultCursorImgUrl?: string;
  /**
   * CLoud client interaction mode, support mouse or touch
   *
   * @default 'cursor'
   */
  clientInteractMode?: 'cursor' | 'touch';
  /**
   * Whether to hijack Ctrl/Cmd + V. When a user uses the paste feature, the content in the local clipboard will be sent to the cloud directly.
   *
   * **This method is usually used when the cloud input box is focused.**
   *
   * @default false
   */
  enablePaste?: boolean;
  /**
   * Whether to enable cloud computing mouse
   *
   * Could be smoother
   *
   * @default true
   */
  enableMousemoveV2?: boolean;
  /**
   *
   * Init success callback
   *
   * CreateSession in this callback.
   *
   * @function
   * @param {Object} response - OnInitSuccess response
   * @param {number} response.code  code=-1 localOffer can noe get H264 encoding. code=0 Success
   * @param {string} response.msg
   * @param {any} response.description
   *
   */
  onInitSuccess?: (response: OnInitSuccessResponse) => void;
  /**
   * Connect success callback, it will trigger after call `TCGSDK.start()`.
   *
   * We recommend use other API after this callback. Like follow methods:
   *
   * 1. `createCustomDataChannel`
   * 2. Use plugin, lick `new joystick()`.
   * 3. `setRemoteDesktopResolution`
   *
   * @function
   * @param {Object} response - onConnectSuccess response
   * @param {number} response.code  code=0 Success
   * @param {number} response.seat_index - multi player scene
   * @param {string} response.role -multi player scene
   *
   */
  onConnectSuccess?: (response: OnConnectSuccessResponse) => void;
  /**
   * Connect failed callback, it will trigger after call `TCGSDK.start()`.
   *
   * @function
   * @param {Object} response - onConnectFail response
   * @param {number} response.code
   *
   * code as follows:
   * | code   | Description                               |
   * | ------ | ----------------------------------------- |
   * | -3     | Retries exceeded, needs to init and createSession                                |
   * | -2     | Auto reconnecting                                  |
   * | -1     | Connect failed, try again alter        |
   * | code > 0 | Proxy error, connect failed, needs to init and createSession     |
   * @param {string} response.msg - message
   *
   */
  onConnectFail?: (response: OnConnectFailedResponse) => void;
  /**
   * Webrtc status callback, it will trigger after call `TCGSDK.start()`.
   *
   * @function
   * @param {Object} response - onWebrtcStatusChange response
   * @param {number} response.code
   *
   * code as follows:
   * | code    | Description                  |
   * | ------- | ---------------------------- |
   * | -2      | Failed to get H264 encoding             |
   * | -1      | Failed to setRemoteDescription    |
   * | 1       | System busy                       |
   * | 2       | Token illegal |
   * | 3       | Insufficient user bandwidth                   |
   * | 4       | Insufficient resources, no resource available           |
   * | 5       | Session failed, need to retry     |
   * | 6       | Incorrect media description information               |
   * | 7       | Launch game failed                  |
   * | 100     | Proxy error                   |
   * | 225     | Device does not support webrtc            |
   * @param {string} response.msg - message
   */
  onWebrtcStatusChange?: (response: OnWebrtcStatusChangeResponse) => void;
  /**
   * User disconnect or disconnect from server, it will trigger after call `TCGSDK.start()`.
   *
   * if sets init param `reconnect: true`, this callback will also be trigger, You can judge whether the page needs to be refreshed according to the corresponding code.
   *
   * @function
   * @param {Object} response - onDisconnect response
   * @param {number} response.code
   *
   * code as follows:
   * | code    | Description                                                     |
   * | ------- | --------------------------------------------------------------- |
   * | -2      | -2 Create offer failed, need to init and createSession                    |
   * | -1      | Need to reconnect, when fps is 0 for 10s, can not receive stream, connection timeout or ice disconnected. |
   * | 0       | Server close                                                         |
   * | 1       | User repeated connection                                                      |
   * | 2       | The user's heartbeat times out, the webrtc server actively disconnects, and this message may be lost   |
   * @param {string} response.msg - message
   */
  onDisconnect?: (response: OnDisconnectResponse) => void;
  /**
   * Network status change callback
   *
   * @function
   * @param {Object} response - onNetworkChange response
   * @param {('idle'|'noflow'|'noflowcenter'|'stats'|'jitter'|'openurl'|'latency')} response.status
   * @param {number} response.times
   * @param {WebrtcStats} response.stats
   * @param {Object} response.data
   * @param {number} response.data.code
   * @param {(number | string)} response.data.value
   * @param {string} response.data.message
   * @param {number} response.data.begin
   * @param {number} response.data.finish
   *
   */
  onNetworkChange?: (response: OnNetworkChangeResponse) => void;
  /**
   * Touch event callback, it will trigger after call `TCGSDK.start()`.
   *
   * Response is OnTouchEventResponse[], Corresponds to the number of touch points on the current screen, multi-finger operation can be judged according to the length of the array.
   *
   * @function
   * @param {Object[]} response - onTouchEvent response
   * @param {number} response.id - ID
   * @param {TouchType} response.type - Touch Type valid values: `touchstart`, `touchmove`, `touchend`, `touchcancel`.
   * @param {number} response.x - The X coordinate of the video view
   * @param {number} response.y - The Y coordinate of the video view
   * @param {number} response.pageX - The X coordinate of the page
   * @param {number} response.pageY - The Y coordinate of the page
   * @param {number} response.movementX - The delta movement of X coordinate
   * @param {number} response.movementY - The delta movement of Y coordinate
   *
   * @example
   * onTouchEvent: async (res) => {
   *   // console.log('onTouchEvent', res);
   *   // Single finger
   *   if (res.length === 1) {
   *     const { id, type, pageX, pageY } = res.pop();
   *     // console.log('onTouchEvent', id, type, pageX, pageY);
   *     TCGSDK.mouseMove(id, type, pageX, pageY);
   *     if (type === 'touchstart') {
   *       TCGSDK.sendMouseEvent({ type: 'mouseleft', down: true });
   *     }
   *     if (type === 'touchend' || type === 'touchcancel') {
   *       TCGSDK.sendMouseEvent({ type: 'mouseleft', down: false });
   *     }
   *   }
   *   // Multi-finger, simulate the mouse wheel event of the PC
   *   if (res.length === 2) {
   *     const [{ pageX: oneX, pageY: oneY }, { pageX: twoX, pageY: twoY }] = res;
   *
   *     const currentX = Math.ceil(Math.abs(oneX - twoX));
   *     const currentY = Math.ceil(Math.abs(oneY - twoY));
   *     // lastX, lastY, can be defined globally, like: let lastX = null, lastY = null
   *     lastX || (lastX = currentX);
   *     lastY || (lastY = currentY);
   *
   *     if (lastX && currentX - lastX < 0 && lastY && currentY - lastY < 0) {
   *       TCGSDK.sendMouseEvent({ type: 'mousescroll', delta: 1 });
   *       lastX = currentX;
   *       lastY = currentY;
   *     }
   *
   *     if (lastX && currentX - lastX > 0 && lastY && currentY - lastY > 0) {
   *       TCGSDK.sendMouseEvent({ type: 'mousescroll', delta: -1 });
   *       lastX = currentX;
   *       lastY = currentY;
   *     }
   *   }
   * }
   */
  onTouchEvent?: (response: OnTouchEventResponse[]) => void;
  /**
   * Only for mobile, double tao callback(same as onTouchEvent)
   * @function
   */
  onDoubleTap?: (response: OnTouchEventResponse[]) => void;
  /**
   * Game start success callback
   *
   * @function
   * @param {Object} response - onGameStartComplete response
   * @param {string} response.request_id
   * @param {string} response.user_id - user_id
   * @param {string} response.game_id - game_id
   * @param {number} response.status - 0 success; 1 failed
   *
   */
  onGameStartComplete?: (response: OnGameStartCompleteResponse) => void;
  /**
   * Game stop callback
   *
   * @function
   * @param {Object} response - onGameStop response
   * @param {string} response.user_id - user_id
   * @param {string} response.game_name - game_name
   * @param {number} response.timestamp - timestamp
   * @param {string} response.message - message
   */
  onGameStop?: (response: OnGameStopResponse) => void;
  /**
   * Game archive loading callback, will continue to call back size
   *
   * @function
   * @param {Object} response - onLoadGameArchive response
   * @param {string} response.user_id - user_id
   * @param {string} response.game_id - game_id
   * @param {string} response.name - Archive filename
   * @param {string} response.url - Archive download url
   * @param {number} response.status - 0: load success 1: load failed 2: verify failed 3: unzip failed 4: other errors 5: downloading
   * @param {('Auto'|'Normal')} response.save_type - 'Auto' or 'Normal'
   * @param {string} response.category_id
   * @param {number} response.archive_size - archive_size
   * @param {number} response.loaded_size
   */
  onLoadGameArchive?: (response: OnLoadGameArchiveResponse) => void;
  /**
   * 游戏保存存档回调
   *
   * @function
   * @param {Object} response - onLoadGameArchive response
   * @param {string} response.user_id - user_id
   * @param {string} response.game_id - game_id
   * @param {string} response.name - Archive filename
   * @param {string} response.md5 - md5
   * @param {number} response.status - 0: success 1: failed 2: zip failed 3: other errors 4: uploading
   * @param {('Auto'|'Normal')} response.save_type - 'Auto' or 'Normal'
   * @param {string} response.category_id
   * @param {number} response.archive_size - archive_size
   * @param {number} response.saved_size
   *
   */
  onSaveGameArchive?: (response: OnSaveGameArchiveResponse) => void;
  /**
   * When the cloud input state changes, it will be triggered, You can judge whether the input box is focused.
   *
   * @function
   * @param {Object} response - onInputStatusChange response
   * @param {('normal_input' | 'autologin_input' | 'unfocused')} response.field_type - unfocused, normal_input, autologin_input
   * @param {('disabled' | 'enabled')} response.status
   */
  onInputStatusChange?: (response: OnInputStatusChangeResponse) => void;
  /**
   * Gamepad connection status callback
   *
   * @function
   * @param {Object} response - onGamepadConnectChange response
   * @param {('gamepadconnect'|'gamepaddisconnect')} response.status - status
   * @param {number} response.index
   * @param {Gamepad} response.gamepad - Gamepad API interface
   *
   */
  onGamepadConnectChange?: (response: OnGamepadConnectChangeResponse) => void;
  /**
   * Cursor show/hide, only trigger when status changed.
   *
   * @function
   * @param {Object} response - onCursorShowStatChange response
   * @param {boolean} response.oldStatus
   * @param {boolean} response.newStatus
   */
  onCursorShowStatChange?: (response: OnCursorShowStatChangeResponse) => void;
  /**
   * Orientation change callback.
   *
   * @function
   * @param {Object} response - onOrientationChange response
   * @param {('portrait' | 'landscape')} response.type - current screen status
   */
  onOrientationChange?: (response: { type: 'portrait' | 'landscape' }) => void;
  /**
   * Page visibility changes.
   *
   * @function
   * @param {Object} response - onVisibilityChange response
   * @param {('visible' | 'hidden')} response.status
   */
  onVisibilityChange?: (response: { status: 'visible' | 'hidden' }) => void;
  /**
   * Cloud config changed, only trigger when status changed.
   *
   * @function
   * @param {Object} response - onConfigurationChange response
   * @param {number} response.width
   * @param {number} response.height
   * @param {('landscape'|'portrait')} response.orientation - orientation
   */
  onConfigurationChange?: (response: OnConfigurationChangeResponse) => void;
  /**
   * Cloud screen resolution changed.
   *
   * @function
   * @param {Object} response - onRemoteScreenResolutionChange response
   * @param {number} response.width
   * @param {number} response.height
   * @param {number} response.top
   * @param {number} response.left
   */
  onRemoteScreenResolutionChange?: (response: OnRemoteScreenResolutionChangeResponse) => void;
  /**
   * Video stream resolution changed.
   *
   * The difference between onRemoteScreenResolutionChange and onRemoteScreenResolutionChange is that the former is the resolution of the cloud screen/application, and the latter is the resolution of the stream decoded.
   *
   * There may be a case where the screen/application resolution is set to 1280*720, but the resolution of the push stream is 1920*1080.
   *
   * @function
   * @param {Object} response - onVideoStreamConfigChange response
   * @param {number} response.width
   * @param {number} response.height
   */
  onVideoStreamConfigChange?: (response: { width: number; height: number }) => void;
  /**
   * Connected devices have changed and can be get by `navigator.mediaDevices.enumerateDevices()`.
   * @function
   */
  onDeviceChange?: (response: any) => void;
  /**
   * User media callback
   *
   * @function
   * @param {Object} response - onGetUserMediaStatusChange response
   * @param {number} response.code - 0 Success；1 NotFoundError；2 NotAllowedError
   * @param {string} response.msg - 'NotFoundError' | 'NotAllowedError' | string;
   * @param {MediaStream} response.userMedia -
   */
  onGetUserMediaStatusChange?: ({
    code,
    msg,
    userMedia,
  }: {
    code: number;
    msg: 'NotFoundError' | 'NotAllowedError' | string;
    userMedia: MediaStream;
  }) => void;
  /**
   * Event callback
   *
   * It is mainly used to callback whether the autoplay is successful or not.
   *
   * @function
   * @param {Object} response - onConfigurationChange response
   * @param {string} response.type - event type: 'idle' | 'noflow' | 'noflowcenter' | 'webrtc_stats' | 'openurl' | 'latency' | 'pointerlockerror' ｜ 'readclipboarderror'
   * @param {any} response.data
   */
  onEvent?: (response: OnEventResponse) => void;
  /**
   * @function
   * @param {Object} response - onStreamPushStateChange response
   * @param {string} response.stream_push_state - Push state 'NoStreamPushing' | 'PushConnecting' | 'Pushing' | 'PushPaused' | 'PushReConnecting';
   */
  onStreamPushStateChange?: (response: OnStreamPushStateChangeResponse) => void;
  /**
   * **Multi-player cloud game (in beta test)**
   *
   * @function
   * @param {Object} response - onConfigurationChange response
   * @param {Object} response.user_state
   * @param {('offline' | 'online')} response.user_state.state - user state
   * @param {string} response.user_state.user_id
   * @param {SeatsInfo} response.seats_info
   * @param {SeatChangeInfo} response.submit_seat_change - Only host can receive this message
   *
   */
  onMultiPlayerChange?: (response: OnMultiPlayerChangeResponse) => void;
  /**
   * Log callback, same as `setLogHandler`
   *
   * @function
   * @param {string} response
   */
  onLog?: (response: string) => void;
}

/**
 * The TCG(Tencent Cloud Gaming) JavaScript SDK (TCGSDK) is used to develop PaaS cloud rendering applications. It is exported as a singleton, adopts configuration and callback registration methods, and provides mouse/keyboard, audio/video, and game process control APIs as detailed below.
 * @hideconstructor
 */
export class TCGSDK {
  // -------------- 云渲染生命周期相关接口 ------------
  /**
   * @param {InitConfig} config
   * The entry file of TCGSDK. We recommend you call other TCGSDK methods in the `onInitSuccess` or `onConnectSuccess` callback function in `init`.
   */
  init(config?: InitConfig): void;
  /**
   * Gets the initialization parameter
   * {@link InitConfig}
   */
  getInitOptions(): InitConfig;
  /**
   * **Gets the client session information.**
   *
   * `ClientSession` is available during each lifecycle of `init`. After the connection is destroyed, `init` needs to be called again to get the latest `ClientSession`.
   *
   * @example
   * const clientSession = TCGSDK.getClientSession();
   *
   */
  getClientSession(): string;
  /**
   * Starts cloud rendering.
   * @param {string} serverSession The `ServerSession` returned after the `CreateSession` API is called.
   *
   * @example
   * TCGSDK.start(serverSession);
   *
   */
  start(serverSession: string): void;
  /**
   * Stops cloud rendering immediately.
   *
   * This API is used to stop the service on the frontend, i.e., to clear the current connection (peerConnection). The cloud will release resources automatically after detecting that there are no heartbeats.
   *
   * To immediately release cloud resources, call the [StopGame](https://cloud.tencent.com/document/product/1162/40739) API for GS, or call the [DestroySession](https://cloud.tencent.com/document/product/1547/72812) API for CAR.
   *
   * @param {Object} [params]
   * @param {number} [params.code=0]
   * @param {string} [params.message='']
   *
   * @example
   * TCGSDK.destroy();
   *
   */
  destroy(params?: { message?: string; code?: number }): void;
  /**
   * Reconnects to the service. You can set the `_init reconnect_ ` parameter to make the SDK automatically call this API. You can also actively call this API based on the callback code of `onDisconnect` and your actual business scenario.
   *
   * @example
   * TCGSDK.reconnect();
   *
   */
  reconnect(): void;
  // -------------- base interfaces ------------
  /**
   * Queries whether the current solution is a mobile game solution.
   *
   * @example
   * TCGSDK.getIsMobileGame();
   *
   */
  getIsMobileGame(): boolean;
  /**
   * Adjusts the video position.
   *
   * The entire view will be displayed at the aspect ratio of the cloud resolution, with the short side fully displayed and the long side scaled proportionally. If the display is not as expected, you can call this API to adjust the view or use the CSS style to directly hack the view.
   *
   * @example
   * TCGSDK.reshapeWindow();
   *
   */
  reshapeWindow(): void;
  /**
   * Sets the background image of the cloud rendering page.
   *
   * Note that the background image set here is for the frontend container but not the cloud. The cloud background is set through `createSession` interface.
   * @param {string} url The background image.
   */
  setPageBackground(url: string): void;
  /**
   * Sets whether to enable the full screen mode.
   *
   * @param {boolean} fullscreen Whether the full screen mode is enabled.
   * @param {HTMLElement} element The node to be manipulated.
   *
   * @example
   * TCGSDK.setFullscreen(true, html);
   */
  setFullscreen(fullscreen: boolean, element?: HTMLElement): void;
  /**
   * Queries whether the full screen mode is enabled.
   */
  getFullscreen(): boolean;
  /**
   * Queries page orientation.
   */
  getPageOrientation(): 'portrait' | 'landscape';
  // -------------- 游戏进程相关接口 ------------
  /**
   * Restarts the currently running game process.
   */
  gameRestart(callback?: Function): void;
  /**
   * Pauses the currently running game process.
   */
  gamePause(callback?: Function): void;
  /**
   * Resumes the currently running game process.
   */
  gameResume(callback?: Function): void;
  /**
   * Quickly sends content when the input box is focused.
   *
   * @param {string} content The content to be sent.
   * @example
   * TCGSDK.sendText('abc');
   */
  sendText(content: string): void;
  /**
   * Sets the interaction mode of the cloud application, which can also be set through _InitConfig clientInteractMode_.
   *
   * @param { string } mode='cursor' - Valid values: 'cursor': Mouse input; 'touch': Touch input.This feature requires support by the cloud application.
   * @example
   * TCGSDK.setClientInteractMode('cursor');
   */
  setClientInteractMode(mode: 'cursor' | 'touch'): void;
  /**
   * @async
   *
   * @description Sets the resolution width and height of the cloud desktop.
   *
   * We recommend you call this API in **onConnectSuccess**.
   *
   * Cloud applications can be roughly divided into the following four modes
   * 1. Window with borders - the application has a border, similar to a folder browser window, you can see the desktop while opening the application
   * 2. Window without borders - the application has no borders, the application resolution is smaller than the desktop resolution, and the status bar such as the title bar cannot be seen. When the application is opened, the desktop can be seen at the same time
   * 3. Fullscreen without borders - the application has no borders and the application resolution is equal to the desktop resolution, and the desktop is completely blocked by the application.
   * 4. Exclusive fullscreen - the application exclusively occupies the fullscreen, and the display resolution is controlled by the application. At this time, forcibly modifying the desktop resolution may cause the application to crash
   *
   * *How to distinguish Fullscreen without borders and Exclusive fullscreen?*
   *
   * Pressing alt-tab to switch windows of a Fullscreen without borders application will not cause the display to flicker, and an Exclusive fullscreen application will have a flickering phenomenon
   *
   * All the above four modes can use this interface except 4 (Exclusive fullscreen) mode
   *
   * @param {Object} param
   * @param {number} param.width - The cloud desktop width.
   * @param {number} param.height - The cloud desktop height.
   *
   * @example
   * TCGSDK.setRemoteDesktopResolution({width: 1920, height: 1080});
   *
   * @returns {Promise<{code: 0 | 1}>} The Promise object. Valid values: 0 (success), 1 (failure).
   */
  setRemoteDesktopResolution({ width, height }: { width: number; height: number }): Promise<{
    code: number; // 0 | 1
  }>;
  /**
   * Gets the resolution of the specified video stream.
   *
   * @returns {Object} Object {width: number; height: number}
   * @example
   * const {width, height} = TCGSDK.getRemoteStreamResolution();
   */
  getRemoteStreamResolution(): { width: number; height: number };
  // -------------- DataChannel/Media interfaces ------------
  /**
   * @async
   *
   * @description Creates a custom `dataChannel`. We recommend you use this API in the `onConnectSuccess` callback. Specific request parameters are as follows:
   *
   * **We recommend you call this API in `onConnectSuccess`.**
   *
   * @param {Object} param
   * @param {number} param.destPort - The target port.
   * @param {string} [param.protocol='text'] - 'text' | 'binary', for data type from server (response from onMessage)
   * @param {Function} param.onMessage - The callback function for message receipt by `dataChannel`.
   *
   * @returns Promise object.
   * | Name          | Type                | Description                 |
   * | ------------- | ------------------- | --------------------------- |
   * | code          | number              | `0`: Success; `1`: Failed to create the `ack` data channel. Try again. `2`: The data channel already exists. |
   * | msg           | string              | The callback function for message receipt by `dataChannel`. |
   * | sendMessage   | (message: string \| Blob \| ArrayBuffer \| ArrayBufferView) => void;  | The method for sending messages, which will pass through data to the data channel of `peerConnection`. The `message` parameter supports all data types of `RTCDataChannel`. |
   *
   * @example
   * const { sendMessage, code } = await TCGSDK.createCustomDataChannel({
   *   destPort: 6060,
   *   onMessage: (res) => {
   *     console.log('CustomDataChannel onMessage', res);
   *   },
   * });
   *
   * if (code === 0) {
   *   sendMessage('abc123');
   * }
   *
   * if (code === 1) {
   *   // 考虑 retry
   * }
   *
   */
  createCustomDataChannel({ destPort, onMessage }: { destPort: number; onMessage: (res: any) => void }): Promise<{
    code: number; // `0`: Success; `1`: Failed to create the `ack` data channel. Try again.
    msg: string;
    // The method for sending messages, which will pass through data to the data channel of `peerConnection`. The `message` parameter supports all data types of `RTCDataChannel`.
    sendMessage: (message: string | Blob | ArrayBuffer | ArrayBufferView) => void;
  }>;
  // -------------- Keyboard/Mouse interfaces ------------
  /**
   * Sends a keyboard event. **This method is usually called twice as a key is pressed (down) and released (up) for each keystroke.**
   *
   * For the keycodes, see [JavaScript Key Code Event Tool & List](https://https://www.toptal.com/developers/keycode).
   *
   * The common keycodes for the mobile game solution of TCGSDK
   * KEY_BACK = 158
   * KEY_MENU = 139
   * KEY_HOME = 172
   *
   * @param {Object} param
   * @param {number} param.key - keycode.
   * @param {boolean} param.down - Whether the key is pressed.
   *
   * @example
   * // keydown
   * TCGSDK.sendKeyboardEvent({key: 32, down: true});
   * // keyup
   * TCGSDK.sendKeyboardEvent({key: 32, down:  false});
   *
   */
  sendKeyboardEvent({ key, down }: { key: number; down: boolean }): void;
  /**
   * Sends a mouse event.
   *
   * @param {Object} param
   * @param {MouseEvent} param.type - The mouse event type. Valid values: 'mousedeltamove', 'mousemove', 'mouseleft', 'mouseright', 'mousescroll'.
   * @param {boolean} param.down Whether the mouse button is pressed (down) or released (up).
   * @param {boolean} [param.delta] mouse scroll，values between 1 and -1
   *
   * @example
   * // mouseleft down
   * TCGSDK.sendMouseEvent({type: 'mouseleft', down: true});
   * // mouseleft up
   * TCGSDK.sendMouseEvent({type: 'mouseleft', down: false});
   */
  sendMouseEvent({ type, down, delta }: { type: MouseEvent; down?: boolean; delta?: number }): void;
  /**
   * Sends a gamepad event.
   *
   * For the PC (if the browser supports the Gamepad API), TCGSDK has automatically listened and handled the event.
   *
   * @param {Object} param
   * @param {GamePadEvent} param.type - GamePadEvent 'gamepadconnect' | 'gamepaddisconnect' | 'gamepadkey' | 'axisleft' | 'axisright' | 'lt' | 'rt'
   * @param {boolean} [param.down] Whether the button is pressed (down) or released (up).
   * @param {number} [param.key] Gamepad key values 
                                        • D-pad values: up: 0x01, down: 0x02 left: 0x04, right: 0x08
                                        • X: 0x4000, Y: 0x8000, A: 0x1000, B: 0x2000
                                        • select: 0x20
                                        • start: 0x10
   * @param {number} [param.x] Using in lt/rt value: [0-255] or axisleft/axisright value: [-32767~32767]
   * @param {number} [param.y] Using in axisleft/axisright value: [-32767~32767]
   *
   * @example
   * // gamepadconnect
   * TCGSDK.sendGamepadEvent({ type: 'gamepadconnect' });
   * // gamepaddisconnect
   * TCGSDK.sendGamepadEvent({ type: 'gamepaddisconnect' });
   * // Send key for X
   * TCGSDK.sendGamepadEvent({ type: 'gamepadkey', key: '0x4000', down: true });
   * // lt
   * TCGSDK.sendGamepadEvent({ type: 'lt', x:  200, down: true });
   * // axisleft
   * TCGSDK.sendGamepadEvent({ type: 'axisleft', x: 10000, y: -10000 });
   */
  sendGamepadEvent({
    type,
    down,
    key,
    x,
    y,
  }: {
    type: GamepadEvent;
    down?: boolean;
    key?: number;
    x?: number;
    y?: number;
  }): void;
  /**
   * @deprecated
   *
   * Sends mouse and keyboard events (underlying implementation).
   * @param {RawEventData} params - The underlying raw data type, which can be used to send mouse, keyboard, and joystick messages.
   */
  sendRawEvent(params: RawEventData): void;
  /**
   * @deprecated
   *
   * Sends the key sequence (underlying implementation).
   * @param {RawEventData[]} params - The serialized data to be sent.
   */
  sendSeqRawEvents(params: RawEventData[]): void;
  /**
   * Sets the cursor sensitivity.
   * @param {number} value - Value range: A floating point number in the range of [0.01,100.0]
   */
  setMoveSensitivity(value: number): void;
  /**
   * Gets the current cursor sensitivity value.
   */
  getMoveSensitivity(): number;
  /**
   * Sets whether to allow the cursor to be locked.
   * @param {boolean} param=true - Valid values: `true` (yes), `false` (no). Default value: `true`.
   */
  setMouseCanLock(param: boolean): void;
  /**
   * @param {number} identifier The touch identifier, which must be unique for each touch point in case of multi-touch. The touch identifier of all events of the same touch point must be the same.
   * @param {TouchType} type The touch event type. Valid values: `touchstart`, `touchmove`, `touchend`, `touchcancel`. For the same touch point, `touchstart` must and can correspond to only one `touchend` or `touchcancel`.
   * @param {number} x The X coordinate of the touch point, which should be a number. However, if a floating point number is passed in, it will be processed as a logical coordinate.
   * @param {number} y The Y coordinate of the touch point, which should be a number. However, if a floating point number is passed in, it will be processed as a logical coordinate.
   *
   * @example
   * TCGSDK.mouseMove(id: 1, type: 'touchstart', pageX: 100, pageY: 100);
   *
   */
  mouseMove(identifier: number, type: string, x: number, y: number): void;
  /**
   * Enables/Disables the cursor sliding mode. This API is generally used in scenarios where there is an offset between the displayed cursor and the actual touch point.
   * @param {boolean} param - Valid values; `true` (enable), `false` (disable).
   */
  mouseTabletMode(param: boolean): void;
  /**
   * @param {number} mode
   *
   * Currently, three cursor modes are supported:
   *
   * mode=0: Fixed cursor image rendered on the page
   *
   * mode=1: Cursor image delivered from the cloud and rendered by the browser page
   *
   * mode=2: Cursor image rendered on the cloud page. In this case, the locally rendered cursor will be hidden. This mode has the best compatibility but causes a delay in cursor movement.
   *
   */
  setRemoteCursor(mode: 0 | 1 | 2 | number): void;
  /**
   * Sets whether to hide/show the cursor. However, the cursor hide/show setting distributed from the cloud may overwrite this setting.
   * @param {boolean} show
   */
  setCursorShowStat(show: boolean): void;
  /**
   * Gets the cursor hide/show status. Valid values: `true`, `false`.
   */
  getCursorShowStat(): boolean;
  /**
   * @param {number} value The zooming factor, which is 1.0 by default and is the same as that in the cloud. Value range: [0.1,10].
   */
  setMobileCursorScale(value: number): void;
  /**
   * Sets the style string. Valid values:
   * @param {('standard'|'default_huge')} style `standard`: System default cursor style, which is smaller. `default_huge`: System large cursor style, which is larger.
   */
  setRemoteCursorStyle(style: 'standard' | 'default_huge'): void;
  /**
   * Resets the status of all cloud keys, which is used in scenarios where cloud keys become stuck.
   */
  clearRemoteKeys(): void;
  /**
   * Resets the cloud capsLock to lowercase.
   */
  resetRemoteCapsLock(): void;
  /**
   * Sets the default image of the cursor on the cloud rendering page.
   * @param {string} url The cursor image.
   */
  setDefaultCursorImage(url: string): void;
  /**
   * Sets whether the mouse/keyboard is available. On PC, mouse/keyboard events will be captured by the SDK and sent to the cloud by default.
   * @param {Object} param
   * @param {boolean} param.keyboard Whether the keyboard is available.
   * @param {boolean} param.mouse Whether the mouse is available.
   *
   * @example
   * TCGSDK.setKMStatus({keyboard: false, mouse: false});
   *
   */
  setKMStatus({ keyboard, mouse }: { keyboard: boolean; mouse: boolean }): { code: number };
  /**
   * Sets whether to hijack Ctrl/Cmd + V. When a user uses the paste feature, the content in the local clipboard will be sent to the cloud directly.
   *
   * **This method is usually used when the cloud input box is focused.**
   */
  setPaste(enable: boolean): void;
  // -------------- Video/Audio interfaces ------------
  /**
   * Sets bitrate and stream parameters. This API is used to set the recommended parameters, which may be dynamically adjusted in the cloud based on the game conditions.
   * @param {Object} profile Currently available parameters include:
   * @param {number} profile.fps - The frame rate in fps. Value range: [10,60].
   * @param {number} profile.max_bitrate - The maximum bitrate in Mbps. Value range: [1,15].
   * @param {number} profile.min_bitrate - The minimum bitrate in Mbps. Value range: [1,15].
   * @param {Function} [callback] The settings result callback function, which can be `null`.
   *
   * @example
   * TCGSDK.setStreamProfile({ fps: 60, max_bitrate: 8, min_bitrate: 5 });
   */
  setStreamProfile(profile: { fps: number; max_bitrate: number; min_bitrate: number }, callback?: Function): void;
  /**
   * Gets the parameters of the display area, such as margin, width, and height. Its parameters include:
   *
   * @returns `video` data obtained through `getBoundingClientRect`.
   * | Name          | Type                | Description                 |
   * | ------------- | ------------------- | --------------------------- |
   * | left          | number              | The value of the left margin between the view window and the display area.          |
   * | top           | number              | The value of the top margin between the view window and the display area.           |
   * | width         | number              | The playback element (video) width.       |
   * | height        | number              | The playback element (video) height.       |
   * | pixelRatio    | number              | `window.devicePixelRatio`: The ratio of the current display device pixel resolution.  |
   */
  getDisplayRect(): { left: number; top: number; width: number; height: number; pixelRatio: number };
  /**
   * Sets the video volume level.
   * @param {number} value number [0-1]
   *
   * @example
   * TCGSDK.setVideoVolume(0);
   *
   */
  setVideoVolume(value: number): void;
  /**
   * Gets the video volume level.
   */
  getVideoVolume(): number;
  /**
   * Plays back the video.
   * @param {('play'|'pause')} status
   *
   * @example
   * TCGSDK.playVideo('play');
   */
  playVideo(status: 'play' | 'pause'): void;
  /**
   * Plays back the audio.
   * @param {('play'|'pause')} status
   *
   * @example
   * TCGSDK.playAudio('play');
   */
  playAudio(status: 'play' | 'pause'): void;
  /**
   * Gets the user media stream.
   */
  getUserMedia(): MediaStream;
  /**
   * Turns on/off the mic.
   * @param {Object} param
   * @param {('open'|'close')} param.status - The on/off status.
   *
   * @example
   * TCGSDK.switchMic({status: 'open'});
   */
  switchMic({ status }: { status: 'open' | 'close' }): void;
  /**
   * Turns on/off the camera.
   * @param {Object} param
   * @param {('open'|'close')} param.status - The on/off status.
   *
   * @example
   * TCGSDK.switchCamera({status: 'open'});
   */
  switchCamera({ status }: { status: 'open' | 'close' }): void;
  /**
   * @async
   *
   * @description Sets the mic capturing quality.
   *
   * @param {MicProfileConstraints} profile - `MicProfileConstraints` is an `Object`, which contains the following parameters:
   * @param {number} [profile.sampleRate=44100] - The sample rate. Default value: `44100`.
   * @param {ConstrainBoolean} [profile.echoCancellation=true] - Whether to enable echo cancellation. Default value: `true`.
   * @param {ConstrainBoolean} [profile.noiseSuppression=true] - Whether to enable noise suppression. Default value: `true`.
   * @param {ConstrainBoolean} [profile.autoGainControl=true] - Whether to enable automatic gain control. Default value: `true`.
   * @param {string} [profile.deviceId] - The ID of the input device, which can be obtained through the `getDevices` API. The device selected by the system is used by default.
   *
   * @example
   * TCGSDK.setMicProfile({sampleRate: 44100, echoCancellation: true, noiseSuppression: true, autoGainControl: true});
   */
  setMicProfile(profile: MicProfileConstraints): void;
  /**
   * @async
   *
   * @description Sets the camera capturing quality.
   *
   * @param {(CameraProfileType|CameraProfileConstraints)} profile CameraProfileType = "120p" | "180p" | "240p" | "360p" | "480p" | "720p" | "1080p"
   *
   * `CameraProfileConstraints` is an `Object`, which contains the following parameters:
   *
   * @param {number} [profile.width=1280] - The width. Default value: `1280`.
   * @param {number} [profile.height=720] - The height. Default value: `720`.
   * @param {number} [profile.frameRate=30] - The frame rate. Default value: `30`.
   * @param {number} [profile.bitrate=1500] - The bitrate in Kbps. Default value: `1500`.
   * @param {string} [profile.deviceId] - The ID of the input device, which can be obtained through the `getDevices` API. The device selected by the system is used by default. Mobile can pass 'user' | 'environment', to use front/rear camera.
   *
   * @example
   * // Set the resolution
   * TCGSDK.setCameraProfile('720p');
   * // Custom settings
   * TCGSDK.setCameraProfile({width: '1920', height: '1080', frameRate: '60', bitrate: 2000});
   *
   */
  setCameraProfile(profile: CameraProfileConstraints | CameraProfileType): Promise<void>;
  /**
   * Gets all devices.
   *
   * @returns {MediaDeviceInfo[]}
   */
  getDevices(): Promise<MediaDeviceInfo[]>;
  /**
   * Sets the video rotation angle.
   *
   * -We recommend you do not implement screen rotation out of the SDK, as screen rotation involves complex coordinate conversion, which is already implemented in the SDK. The SDK also implements plugin rotation and data processing internally. Therefore, we recommend you use this method or directly configure automatic rotation in the `Init` parameter.-
   *
   * @param {Object} param
   * @param {(0|90|270)} param.deg=0 - Currently, 0 and 270 degrees are supported for mobile games, and 0 and 90 degrees are supported for other applications.
   * @param {boolean} [param.rotateContainer=true] - Whether to rotate the entire HTML view. Default value: `true`.
   * @param {boolean} [param.rotateMountPoint=false] - Whether to rotate the `mountPoint` node. Default value: `false`.
   *
   * @example
   * // Rotate an HTML view
   * TCGSDK.setVideoOrientation({ deg: 90, rotateContainer: true });
   * // Rotate `MountPoint`
   * TCGSDK.setVideoOrientation({ deg: 90, rotateMountPoint: true });
   */
  setVideoOrientation({
    deg,
    rotateContainer,
    rotateMountPoint,
  }: {
    deg: number;
    rotateContainer?: boolean;
    rotateMountPoint?: boolean;
  }): void;
  /**
   * Gets the page size.
   *
   * @returns {Object} { width: number; height: number };
   *
   * @example
   * const {width, height} = TCGSDK.getPageSize();
   *
   */
  getPageSize(): { width: number; height: number };
  // -------------- Debug/Log interfaces ------------
  /**
   * Enables/Disables the debugging mode. If it is enabled, logs will be printed in the console. It can also be set through the `Init` parameter.
   * @param {Object} param
   * @param {boolean} [param.showLog] - Whether to print all logs of the SDK.
   * @param {boolean} [param.showStats] - Whether to display the WebRTC status on the data panel. You can also press CTRL + ~ to display it.
   * @param {boolean} [param.showSendKmData] - Whether to print the messages input by the keyboard/mouse.
   * @param {boolean} [param.showSendAckData] - Whether to print the sent ACK messages.
   * @param {boolean} [param.showSendHbData] - Whether to print the sent heartbeat messages.
   * @param {boolean} [param.showOnHbMessage] - Whether to print the heartbeat response packet messages.
   * @param {boolean} [param.showOnKmMessage] - Whether to print the keyboard/mouse response messages.
   * @param {boolean} [param.showOnAckMessage] - Whether to print the ACK response packet messages.
   * @param {boolean} [param.showOnCdMessage] - Whether to print the CD response packet messages.
   * @param {boolean} [param.showOnSvMessage] - Whether to print the server response packet messages.
   *
   * @example
   * TCGSDK.setDebugMode({showLog: true, showStats: true});
   *
   */
  setDebugMode({
    showStats,
    showSendKmData,
    showSendAckData,
    showSendHbData,
    showOnHbMessage,
    showOnKmMessage,
    showOnAckMessage,
    showOnCdMessage,
    showOnSvMessage,
    showLog,
  }: DebugSettingParams): void;
  /**
   * Reports logs.
   *
   * @returns {Object}   { code: number; message: string } code=0 success code=-1 failed
   *
   */
  reportLog(): { code: number; message: string };
  /**
   * Sets the log callback function to facilitate external access to detailed logs. The purpose of this API is the same as the `onLog` callback passed in during `init`.
   * @param {Function} handler
   */
  setLogHandler(handler: Function): void;
  /**
   * Sets whether to report performance logs.
   */
  toggleMetricReportBulk(start: boolean): void;
  // -------------- Multi-player cloud game interfaces ------------
  /**
   * **Multi-player cloud game (in beta test)**
   *
   * Gets the volume level of the specified player.
   *
   * @param {string} id 用户id
   */
  getPlayerVolume(id: string): number;
  /**
   * **Multi-player cloud game (in beta test)**
   *
   * Gets the audio volume level.
   *
   * @param {string} id 用户id
   * @param {number} val 音量 [0-1]
   */
  setPlayerVolume(id: string, val: number): number;
  /**
   * **Multi-player cloud game (in beta test)**
   *
   * Gets all seats.
   *
   * @returns {Promise<SeatsInfo>} 返回 Promise 对象。
   */
  getSeats(): Promise<SeatsInfo>;
  /**
   * **Multi-player cloud game (in beta test)**
   *
   * Applies for switching the role or seat (by a guest). The response codes are as detailed below:
   * @param {Object} param
   * @param {string} param.user_id - The user ID.
   * @param {('viewer' | 'player')} param.to_role - The role to be switched to.
   * @param {number} param.seat_index - The seat number.
   *
   * @returns {Promise<{code: number}>} The response codes are as detailed below:
   *
   * | Code     | Description                    |
   * | -------- | ------------------------------ |
   * | 0        | Success                        |
   * | 1001     | MultiPlayerInvalidSeatIndex    |
   * | 1002     | MultiPlayerNoAuthorized        |
   * | 1003     | MultiPlayerNoSuchRole          |
   * | 1004     | MultiPlayerNoSuchUser          |
   * | 1005     | MultiPlayerAssignSeatFailed    |
   * | 1006     | MultiPlayerJsonParseFailed     |
   * | 1007     | MultiPlayerIgnoredHostSubmit   |
   */
  submitSeatChange(param: SeatChangeInfo): Promise<{ code: number }>;
  /**
   * **Multi-player cloud game (in beta test)**
   *
   * Only the host player can call this API. The response codes are as detailed below:
   *
   * @param {Object} param
   * @param {string} param.user_id - The user ID.
   * @param {('viewer' | 'player')} param.to_role - The role to be switched to.
   * @param {number} param.seat_index - The seat number.
   *
   * @returns {Promise<{code: number}>} The response codes are as detailed below:
   *
   * | Code     | Description                    |
   * | -------- | ------------------------------ |
   * | 0        | Success                        |
   * | 1001     | MultiPlayerInvalidSeatIndex    |
   * | 1002     | MultiPlayerNoAuthorized        |
   * | 1003     | MultiPlayerNoSuchRole          |
   * | 1004     | MultiPlayerNoSuchUser          |
   * | 1005     | MultiPlayerAssignSeatFailed    |
   * | 1006     | MultiPlayerJsonParseFailed     |
   * | 1007     | MultiPlayerIgnoredHostSubmit   |
   *
   */
  seatChange(param: SeatChangeInfo): Promise<{ code: number }>;
  /**
   * **Multi-player cloud game (in beta test)**
   *
   * Switches the mic status.
   *
   * @param {Object} param
   * @param {string} param.status - `1`: Actively mute the mic. `2`: Unmute the mic.
   * @param {string} param.user_id - The user ID
   *
   * @returns {Promise<ChangeMicStatusResponse>} ChangeMicStatusResponse, which has the following types:
   *
   * | Response      | Type    | Description                                                          |
   * | ------------- | ------- | -------------------------------------------------------------------- |
   * | type          | string  | mic_status (0 ==> Success ; -2 ==> NoAuthorized ; -4 ==> NoSuchUser) |
   * | code          | number  | 0 ==> The mic is muted by the admin; 1 ==> The mic is muted by the user actively; 2 ==> The mic is unmuted                           |
   * | status        | number  | status (optional)                                                     |
   * | user_id       | string  | user_id (optional)                                                    |
   *
   */
  changeMicStatus(param: { status: number; user_id: string }): Promise<ChangeMicStatusResponse>;
}

declare const TCGSDKStatic: TCGSDK;

export default TCGSDKStatic;
