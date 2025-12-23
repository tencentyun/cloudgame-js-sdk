import { AndroidInstance } from './androidInstance';

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
 * 通常重连时间超过两分钟（例如连接断开/移动端切后台，两分钟后触发重连）
 * 系统会自动回收实例，表现为返回 code > 0，建议该情况下 重新init + createSession
 *
 * code=-7 setRemoteDescription 失败
 * code=-6 模式禁用
 * code=-3 超出重试次数，需重新init + createSession
 * code=-2 自动重连中
 * code=-1 连接失败，触发了限频操作 5s，可稍后再连接
 * code > 0 Proxy 返回的重连错误，通常连不上，需重新init + createSession
 * @ignore
 */
export interface OnConnectFailedResponse extends BaseResponse {}

export interface OnConnectSuccessResponse {
  readonly code: number;
  readonly seat_index?: number; // 座位号，多人云游场景可能会用到
  readonly role?: string; // 角色，多人云游场景可能会用到
}

/**
 * code=-2 获取H264 编码失败
 * code=-1 setRemoteDescription 失败
 * code=0 成功
 * code=1 系统繁忙
 * code=2 票据不合法
 * code=3 用户带宽不足
 * code=4 资源不足，没有可用机器
 * code=5 session 失效，需要重新登录
 * code=6 媒体描述信息错误
 * code=7 游戏拉起失败
 * code=100 proxy 错误
 * code=255	设备不支持webrtc
 * @ignore
 */
export interface OnWebrtcStatusChangeResponse extends BaseResponse {}

/**
 * code=-2 创建local offer 失败，需要重新init + createSession
 * code=-1 需要重连，通常出现在码率掉0，收不到推流，连接超时，ice 断开，可以尝试重连（如设置了 init reconnect 参数，SDK 会主动重连）
 * code=0	主动关闭
 * code=1	用户重复连接
 * code=2 用户心跳超时，webrtc服务端主动断开，这个消息有可能丢失 init + createSession
 * @ignore
 */
export interface OnDisconnectResponse extends BaseResponse {}

export interface WebrtcStats {
  readonly bit_rate?: number; // 	客户端接收的码率，单位：Mbps
  readonly cpu?: number | string; // 	云端 CPU 占用率，单位：百分比
  readonly gpu?: string; // 	云端 GPU 占用率，单位：百分比
  readonly delay?: number; // 	客户端收到图像帧到解码显示的延时，单位：ms，iOS 可能收不到
  readonly fps?: number; // 	客户端显示帧率
  readonly load_cost_time?: number; //	云端加载时长，单位：ms
  readonly nack?: number; // 	客户端重传次数
  readonly packet_lost?: number; // 	客户端丢包次数
  readonly packet_received?: number; // 	客户端收到的包总数
  readonly rtt?: number; //	客户端到云端，网络端数据包往返耗时
  readonly raw_rtt?: number;
  readonly edge_rtt?: number;
  readonly timestamp?: number; //	此数据回调的时间戳，单位：ms
}

export interface MediaStats {
  videoStats: {
    readonly fps: number;
    readonly rtt: number;
    readonly raw_rtt: number;
    readonly edge_rtt: number;
    readonly bit_rate: number;
    readonly packet_lost: number;
    readonly packet_received: number;
    readonly packet_loss_rate: number;
    readonly nack: number;
    readonly jitter_buffer: number;
    readonly width: number;
    readonly height: number;
    readonly codec: string;
  };
  audioStats: {
    readonly sample_rate: number;
    readonly channels: number;
    readonly bit_rate: number;
    readonly packet_lost: number;
    readonly packet_received: number;
    readonly packet_loss_rate: number;
    readonly nack: number;
    readonly jitter_buffer: number;
    readonly concealed_samples: number;
    readonly concealment_events: number;
    readonly codec: string;
  };
}

/**
 * latency 对应value
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
 * 触摸事件类型
 */
export type TouchType = 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel' | string;

/**
 * onTouchEvent 返回 OnTouchEventResponse[]
 * @ignore
 */
export interface OnTouchEventResponse {
  /**
   * 触控事件的 ID
   */
  readonly id: number;
  /**
   * 事件类型，可选择 'touchstart'，'touchmove'，'touchend'，'touchcancel' 四种之一
   */
  readonly type: TouchType;
  /**
   * 触控点在视频区域内的 x 坐标 (hook 模式未减去 screen_left)
   */
  readonly x: number;
  /**
   * 触控点在视频区域内的 y 坐标 (hook 模式未减去 screen_top)
   */
  readonly y: number;
  /**
   * 触控点在当前网页内的 x 坐标
   */
  readonly pageX: number;
  /**
   * 触控点在当前网页内的 y 坐标
   */
  readonly pageY: number;
  /**
   * 触控点相对上次坐标的 x 偏移值
   */
  readonly movementX: number;
  /**
   * 触控点相对上次坐标的 y 偏移值
   */
  readonly movementY: number;
}

export interface OnGameStartCompleteResponse {
  readonly request_id: string;
  readonly app_id: number;
  readonly user_id: string;
  readonly game_id: string;
  readonly status: number; // 0 启动游戏成功 1 启动游戏失败
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
  readonly name: string; // 存档最终文件名
  readonly url: string; // 存档下载地址
  readonly status: number; // 0: 加载存档成功 1: 下载存档失败 2: 校验存档失败 3: 解压存档失败 4: 其他错误 5: 下载中
  readonly save_type: 'Auto' | 'Normal';
  readonly category_id: string; // 分类标识
  readonly archive_size: number;
  readonly loaded_size: number; // 表示下载的字节数
}
export interface OnSaveGameArchiveResponse {
  readonly user_id: string;
  readonly game_id: string;
  readonly name: string; // 存档最终文件名
  readonly md5: string;
  readonly status: number; // 0: 存档保存成功 1: 存档保存失败 2: 存档压缩失败失败 3: 其他错误 4: 上传中
  readonly save_type: 'Auto' | 'Normal';
  readonly category_id: string; // 分类标识
  readonly archive_size: number;
  readonly saved_size: number;
}

export interface ServerSideDescriptionGameConfig {
  readonly sdk_conf: {
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
    // tablet_mode?: boolean;
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
    notify_threshold?: number; // 表示异常情况持续多少次，促发异常回调
  };
}

export interface ServerSideDescription {
  readonly app_id?: number;
  readonly game_id?: string;
  readonly group_id?: string;
  /**
   * code=-2 获取H264 编码失败
   * code=-1 setRemoteDescription 失败
   * code=0	请求正常
   * code=1	系统繁忙（可以重试）
   * code=2	票据不合法
   * code=6	SDP 错误
   * code=8	等待主机连接
   * code=9	角色已达上限
   * code=100 Proxy 错误
   */
  readonly code?: number;
  readonly msg?: string;
  readonly message?: string;
  readonly type?: string;
  readonly sdp?: string;
  readonly server_ip?: string;
  readonly server_version?: string;
  readonly server_port?: string;
  readonly region?: string;
  readonly instance_id?: string;
  readonly instance_type?: string; // L1 S1 M1
  readonly request_id?: string;
  readonly user_id?: string;
  readonly user_ip?: string;
  readonly game_config?: ServerSideDescriptionGameConfig;
  readonly feature_switch?: ServerSideDescriptionFeatureSwitch;
  readonly role?: string;
  readonly metric_key?: string;
  readonly plat?: 'android' | 'pc' | 'Android';
  readonly sig_key?: string;
  readonly host_name?: string; // 只有手游有
  readonly video?: {
    height: number;
    width: number;
  };
  readonly video_codec?: string;
  readonly screen_config?: {
    width: number;
    height: number;
    orientation: 'landscape' | 'portrait';
    degree: '0_degree' | '90_degree' | '180_degree' | '270_degree';
  };
  /**
   * Proxy 返回的 webrtc 结构体
   */
  readonly WebrtcResponse?: {
    Code: number;
    Msg: string;
    Sdp: string;
  };
  input_seat?: number;
  video_mime_type: string;
  audio_mime_type: string;
  readonly proxy?: {
    edge: string;
    uploader: string;
    proxy_delay: number;
  };
}

/**
 * 云端输入状态改变，有点击事件的时候都会触发，可根据状态判断 input 框是否聚焦
 * @ignore
 */
export interface OnInputStatusChangeResponse {
  readonly field_type: 'normal_input' | 'unfocused';
  readonly status: 'disabled' | 'enabled';
}

/**
 * 手柄连接/断开事件回调
 * @ignore
 */
export interface OnGamepadConnectChangeResponse {
  readonly status: 'gamepadconnect' | 'gamepaddisconnect';
  readonly index: number; // 手柄索引
  readonly gamepad?: Gamepad; // 手柄
}

/**
 * 云端鼠标显示/隐藏，只在变化的时候回调
 * @ignore
 */
export interface OnCursorShowStatChangeResponse {
  readonly oldStatus: boolean;
  readonly newStatus: boolean;
}

/**
 * 云端config 发生变化时候回调
 * @ignore
 */
export interface OnConfigurationChangeResponse {
  readonly screen_config: {
    width: number;
    height: number;
    degree: '0_degree' | '90_degree' | '180_degree' | '270_degree';
    orientation: 'landscape' | 'portrait';
    deg?: 0 | 90 | 180 | 270;
  };
}

/**
 * 云端屏幕分辨率发生变化
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
     * 0 管理员禁麦
     * 1 闭麦（自己主动）
     * 2 开麦
     */
    mic_status: number;
  }[];
  viewers: {
    name: string;
    seat_index: number;
    /**
     * 0 管理员禁麦
     * 1 闭麦（自己主动）
     * 2 开麦
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
   * 0 管理员禁麦
   * 1 闭麦（自己主动）
   * 2 开麦
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
   * 对于主机玩家才能收到该消息
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

export type OnEventAutoplayResponse = {
  type: 'autoplay';
  data: {
    code: number; // 0 success -1 failed
    message: string;
    mediaType?: 'video' | 'audio';
  };
};

export type OnEventFirstFrameResponse = {
  type: 'first_frame';
  data: {
    /**
     * 首帧耗时，从调用 access 方法开始计算
     */
    duration: number;
    /**
     * 视频宽度
     */
    width: number;
    /**
     * 视频高度
     */
    height: number;
  };
};

export type OnEventVideoPlayStateResponse = {
  type: 'video_state';
  data: {
    code: number; // 0 playing 1 pause 2 ended
    message: string;
  };
};

export type OnEventAudioPlayStateResponse = {
  type: 'audio_state';
  data: {
    code: number; // 0 playing 1 pause 2 ended
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

export type OnEventMediaStatsResponse = {
  type: 'media_stats';
  data: MediaStats;
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
     * latency 对应value
     * value=0 NETWORK_NORMAL
     * value=1 NETWORK_CONGESTION
     * value=2 NACK_RISING
     * value=3 HIGH_DELAY
     * value=4 NETWORK_JITTER
     */
    message: string;
  };
};

export type OnEventPointerLockErrorResponse = {
  type: 'pointerlockerror';
  data?: {};
};

/**
 * 通常 http 协议会读取剪切板失败
 */
export type OnEventReadClipboardErrorResponse = {
  type: 'readclipboarderror';
  data?: {
    message?: any;
  };
};

/**
 * ice 链接状态回调
 */
export type OnEventIceConnectionStateChangeResponse = {
  type: 'ice_state';
  data?: {
    value?: 'connected' | 'disconnected';
  };
};

export type OnEventTokenNotFoundResponse = {
  type: 'token_not_found';
  data?: {
    instance_ids: string[];
  };
};

export type OnEventCameraStatusResponse = {
  type: 'camera_status';
  data?: {
    status: 'open_back' | 'open_front' | 'close';
    width?: number;
    height?: number;
  };
};

export type OnEventMicStatusResponse = {
  type: 'mic_status';
  data?: {
    status: 'open' | 'close';
  };
};

export type OnEventResponse =
  | OnEventAutoplayResponse
  | OnEventFirstFrameResponse
  | OnEventVideoPlayStateResponse
  | OnEventAudioPlayStateResponse
  | OnEventIdleResponse
  | OnEventOpenUrlResponse
  | OnEventWebrtcStatsResponse
  | OnEventMediaStatsResponse
  | OnEventNoflowResponse
  | OnEventNoflowcenterResponse
  | OnEventLatencyResponse
  | OnEventPointerLockErrorResponse
  | OnEventReadClipboardErrorResponse
  | OnEventIceConnectionStateChangeResponse
  | OnEventTokenNotFoundResponse
  | OnEventMicStatusResponse
  | OnEventCameraStatusResponse;

export type OnAndroidInstanceEventResponse =
  | OnAndroidInstanceTransMessageResponse
  | OnAndroidInstanceSystemUSageResponse
  | OnAndroidInstanceClipboardEventResponse
  | OnAndroidInstanceNotificationEventResponse
  | OnAndroidInstanceSystemStatusResponse
  | OnAndroidInstanceDistributeProgressEventResponse
  | OnAndroidInstanceGroupJoinEventResponse
  | OnAndroidInstanceSetSyncListEventResponse
  | OnAndroidInstanceTouchEventResponse;

export type OnAndroidInstanceTransMessageResponse = {
  type: 'trans_message';
  data: {
    package_name: string;
    msg: string;
  };
};

export type OnAndroidInstanceSystemUSageResponse = {
  type: 'system_usage';
  data: {
    cpu_usage: number;
    mem_usage: number;
    gpu_usage: number;
  };
};

export type OnAndroidInstanceClipboardEventResponse = {
  type: 'clipboard_event';
  data: {
    text: string;
    writeText?: boolean;
  };
};

export type OnAndroidInstanceNotificationEventResponse = {
  type: 'notification_event';
  data: {
    package_name: string;
    title: string;
    text: string;
  };
};

export type OnAndroidInstanceSystemStatusResponse = {
  type: 'system_status';
  data: {
    /**
     * 导航栏状态
     */
    nav_visible: boolean;
    /**
     * 音量 [0 - 100]
     */
    music_volume: number;
  };
};

export type OnAndroidInstanceDistributeProgressEventResponse = {
  type: 'distribute_progress_event';
  data: {
    /**
     * UNSUPPORTED 镜像不支持
     * BUSY 在分发其他应用
     */
    state: 'SUCCESS' | 'UNSUPPORTED' | 'BUSY' | 'FAIL';
    package_name: string;
  };
};

export type OnAndroidInstanceGroupJoinEventResponse = {
  type: 'join';
  data: {
    /**
     * 0 success, others failed
     */
    code: number;
    message: string;
  };
};

export type OnAndroidInstanceSetSyncListEventResponse = {
  type: 'set_sync_list';
  data: {
    /**
     * 0 success, others failed
     */
    code: number;
    message: string;
  };
};

export type OnAndroidInstanceTouchEventResponse = {
  type: 'touch_event';
  data: {
    finger_id: number;
    /**
     * 0 "touchstart"
     * 1 "touchmove"
     * 2 "touchend"
     * 3 "touchcancel"
     */
    event_type: number;
    /**
     * 云机 x
     */
    x: number;
    /**
     * 云机 y
     */
    y: number;
    /**
     * 云机 width
     */
    width: number;
    /**
     * 云机 height
     */
    height: number;
    timestamp: number;
  };
};

/**
 * 直播推流相关
 */
export type StreamPushState = 'NoStreamPushing' | 'PushConnecting' | 'Pushing' | 'PushPaused' | 'PushReConnecting';

export type OnStreamPushStateChangeResponse = {
  stream_push_state: StreamPushState;
};

/**
 * 调试相关设置
 */
export type DebugSettingParams = {
  /**
   * 打印键盘/鼠标键入的消息
   */
  showSendKmData?: boolean;
  /**
   * 打印发送的ACK message
   */
  showSendAckData?: boolean;
  /**
   * 打印发送的Hb message
   */
  showSendHbData?: boolean;
  /**
   * 打印发送的 Cloud device message
   */
  showSendCloudDeviceData?: boolean;
  /**
   * 打印心跳回包消息
   */
  showOnHbMessage?: boolean;
  /**
   * 打印km回包消息
   */
  showOnKmMessage?: boolean;
  /**
   * 打印ACK回包消息
   */
  showOnAckMessage?: boolean;
  /**
   * 打印CD回包消息
   */
  showOnCdMessage?: boolean;
  /**
   * 打印Sv回包消息
   */
  showOnSvMessage?: boolean;
  /**
   * 打印CloudDevice回包消息
   */
  showOnCloudDeviceMessage?: boolean;
  /**
   * 打印 Muxer 相关信息
   */
  showMuxer?: boolean;
  /**
   * 打印SDK 所有日志
   */
  showLog?: boolean;
  /**
   * 展示数据面板 webrtc 状态信息，否则需要按 CTRL+~ 快捷键显示。
   */
  showStats?: boolean;
};

/**
 * PC 上的鼠标事件
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
  | 'mousedeltamove_v2'
  | 'mousehorizontalscroll';

/**
 * 手柄事件
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
 * KM 通道数据类型
 */
type KMMessageType = MouseEvent | GamePadEvent | KeyBoardEvent;

/**
 * 底层接收的原始数据类型
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
 * 麦克风参数，可根据需求设置具体值
 * @ignore
 */
export interface MicProfileConstraints extends MediaTrackConstraints {
  sampleRate?: number; // 默认值 44100
  echoCancellation?: ConstrainBoolean; // 回声消除 默认值 true
  noiseSuppression?: ConstrainBoolean; // 降噪 默认值 true
  autoGainControl?: ConstrainBoolean; // 增益 默认值 true
  deviceId?: string; // input 的设备id，可以通过 getDevices 接口获取, 默认采用系统自选设备
}

/**
 * 摄像头参数，可根据需求设置具体值
 * @ignore
 */
export interface CameraProfileConstraints {
  /**
   * 默认值 1280，传入 null 则采用系统默认选择值
   */
  width?: number | null;
  /**
   * 默认值 720，传入 null 则采用系统默认选择值
   */
  height?: number | null;
  frameRate?: number;
  /**
   * @deprecated
   */
  bitrate?: number;
  /**
   * input 的设备id，可以通过 getDevices 接口获取, 默认采用系统自选设备。
   *
   * 移动端可传入 'user' | 'environment', 来区前置/后置摄像头
   */
  deviceId?: string | 'user' | 'environment';
}

/**
 * 摄像头分辨率类型，用于快速设置
 */
export type CameraProfileType = '120p' | '180p' | '240p' | '360p' | '480p' | '720p' | '1080p';

export type OnImageEventResponse = OnImageEventScreenshotResponse;

export type OnImageEventScreenshotResponse = {
  type: 'screenshot';
  data: {
    instanceId: string;
    url: string;
  }[];
};

/**
 * TCGSDK 时间类型
 */
export type EventTypes =
  | 'InitSuccess'
  | 'ConnectSuccess'
  | 'Disconnected'
  | 'ConnectFailed'
  | 'Event'
  | 'OrientationChange'
  | 'VisibilityChange'
  | 'NetworkChange'
  | 'WebrtcStatusChange'
  | 'GameStartComplete'
  | 'GameStop'
  | 'LoadGameArchive'
  | 'SaveGameArchive'
  | 'InputStatusChange'
  | 'TouchEvent'
  | 'CursorShowStatChange'
  | 'GamepadConnectChange'
  | 'ConfigurationChange'
  | 'RemoteScreenResolutionChange'
  | 'VideoStreamConfigChange'
  | 'DoubleTap'
  | 'StreamPushStateChange'
  | 'DeviceChange'
  | 'GetUserMediaStatusChange'
  | 'MultiPlayerChange'
  // ------------   云手机回调  --------------
  | 'AndroidInstanceEvent'
  | 'ImageEvent';

export interface EventTypesMap {
  InitSuccess: OnInitSuccessResponse;
  ConnectSuccess: OnConnectSuccessResponse;
  Disconnected: OnDisconnectResponse;
  ConnectFailed: OnConnectFailedResponse;
  Event: OnEventResponse;
  OrientationChange: { type: 'portrait' | 'landscape' };
  VisibilityChange: { status: 'visible' | 'hidden' };
  NetworkChange: OnNetworkChangeResponse;
  WebrtcStatusChange: OnWebrtcStatusChangeResponse;
  GameStartComplete: OnGameStartCompleteResponse;
  GameStop: OnGameStopResponse;
  LoadGameArchive: OnLoadGameArchiveResponse;
  SaveGameArchive: OnSaveGameArchiveResponse;
  InputStatusChange: OnInputStatusChangeResponse;
  TouchEvent: OnTouchEventResponse[];
  CursorShowStatChange: OnCursorShowStatChangeResponse;
  GamepadConnectChange: OnGamepadConnectChangeResponse;
  ConfigurationChange: OnConfigurationChangeResponse;
  RemoteScreenResolutionChange: OnRemoteScreenResolutionChangeResponse;
  VideoStreamConfigChange: { width: number; height: number };
  DoubleTap: OnTouchEventResponse[];
  StreamPushStateChange: OnStreamPushStateChangeResponse;
  DeviceChange: any;
  GetUserMediaStatusChange: {
    code: number;
    msg: 'NotFoundError' | 'NotAllowedError' | string;
    type: 'mic' | 'camera';
    userMedia: MediaStream;
  };
  MultiPlayerChange: OnMultiPlayerChangeResponse;
  // ------------   云手机回调  --------------
  AndroidInstanceEvent: OnAndroidInstanceEventResponse;
  ImageEvent: OnImageEventResponse;
}

/**
 * TCGSDK InitConfig 相关配置，对应TCGSDK 中的 init 方法的。
 */
export interface InitConfig {
  /**
   *  用户的腾讯云 APPID，可选参数
   */
  appid?: number;
  /**
   * 页面挂载点的 HTML 元素 ID
   */
  mount: string;
  /**
   * 串流设置
   *
   * @default 'webrtc'
   */
  streaming?: {
    /**
     * 串流模式，默认采用 webrtc 串流
     */
    mode?: 'webrtc' | 'websocket';
    /**
     * 推流格式，默认采用 H264
     */
    videoCodecList?: string[];
    /**
     * 需要请求的流名称，目前支持 'low' | 'mid' | 'high'
     */
    streamName?: 'low' | 'mid' | 'high';
  };
  /**
   * Group Control 配置
   */
  groupControl?: {
    /**
     * 截图相关配置
     */
    image?: {
      /**
       * 截图间隔，单位秒，默认 1
       * @default 1
       */
      interval?: number;
      /**
       * quality 截图质量，取值范围 0-100，默认 20
       * @default 20
       */
      quality?: number;
    };
  };
  /**
   * 实例访问 token，通过云 API 获取
   */
  accessToken?: {
    token: string;
    accessInfo: string;
  };
  /**
   * 设置拉流信息
   */
  streamProfile?: {
    video_width?: number;
    video_height?: number;
    fps?: number;
    max_bitrate?: number;
    min_bitrate?: number;
    unit?: 'Kbps' | 'Mbps';
  };
  /**
   * 用户 ID
   */
  userId?: string;
  /**
   * 是否开启本地麦克风
   *
   * @default false
   */
  mic?: boolean | MicProfileConstraints;
  /**
   * 是否开启本地摄像头
   *
   * @default false
   */
  camera?: boolean | CameraProfileConstraints | CameraProfileType;
  /**
   * 自动开关本地麦克风
   *
   * true: SDK 闭环自动开关本地麦克风
   *
   * false: 客户端选择是否开关麦克风，SDK 会回调云端的麦克风状态
   *
   * @default true
   */
  autoSwitchMic?: boolean;
  /**
   * 自动开关本地摄像头
   *
   * true: SDK 闭环自动开关本地摄像头
   *
   * false: 客户端选择是否开关摄像头，SDK 会回调云端的摄像头状态
   *
   * @default true
   */
  autoSwitchCamera?: boolean;
  /**
   * true 为使用平板滑动鼠标模式，false 为绝对映射模式。该参数只针对移动端，PC 端忽略该参数。该 mode 下鼠标产生相对位移。
   *
   * @default false
   */
  tabletMode?: boolean;
  /**
   * true 为使用接入手游/云手机
   *
   * @default false
   */
  mobileGame?: boolean;
  /**
   *
   * 安卓实例配置
   */
  androidInstance?: {
    /**
     * 在 PC 端自动旋转，保证推流画面始终是正向显示
     *
     * @default true
     */
    autoRotateOnPC?: boolean;
  };
  /**
   * @deprecated
   *
   * 手游启用VPX 编码
   *
   * @default false
   */
  mobileVpx?: boolean;
  /**
   * 鼠标模式
   *
   * mode=0: 页面渲染的固定鼠标图片，如为设置默认鼠标图片，会采用系统鼠标
   *
   * mode=1: 采用云端应用内的鼠标图片，图片会下发到前端，由前端在浏览器页面绘制
   *
   * mode=2: (不建议使用)云端画面内渲染鼠标图片，此时会隐藏本地渲染的鼠标，兼容性最好，但是有延时
   *
   * @default 0
   */
  cursorMode?: number;
  /**
   * 是否启动点击全屏操作，true 为启用，false为禁用。
   *
   * @default false
   */
  clickToFullscreen?: boolean;
  /**
   * 点击body 任意地方尝试播放video，true 为启用，false为禁用。
   *
   * @default true
   */
  clickBodyToPlay?: boolean;
  /**
   * 用户操作空闲时间阈值，单位为秒，默认值：300s 空闲超过这个时间将触发 onEvent 事件，消息为 {type: 'idle', data: {times: 1}}
   *
   * **可在回调中调用 TCGSDK.destroy() 释放并发**
   *
   * @default 300
   */
  idleThreshold?: number;
  /**
   * WebRTC stats / Media stats 统计间隔，默认 1s 一次回调
   *
   * @default 1
   */
  statsInterval?: number;
  /**
   * 断开的时候是否保留最后一帧画面。
   *
   * mac safari/ios webview 无法生效
   *
   * @default false
   */
  keepLastFrame?: boolean;
  /**
   * 是否自动重连，会在弱网，或帧率持续掉 0所导致的断连时，主动重连
   *
   * 重连策略：每6秒尝试一次，最多重连10次
   *
   * @default true
   */
  reconnect?: boolean;
  /**
   * 是否显示加载中画面
   *
   * @default true
   */
  showLoading?: boolean;
  /**
   * 加载中的文字提示内容
   *
   * @default '正在启动云渲染'
   */
  loadingText?: string;
  /**
   * 重新连接的文字提示内容
   *
   * @default '重新连接'
   */
  restartText?: string;
  /**
   * 当横竖屏切换时，是否自动旋转html节点适配，**该参数会旋转整个html**
   *
   * *移动端适用*
   *
   * @default false
   */
  autoRotateContainer?: boolean;
  /**
   * 当横竖屏切换时，是否自动旋转挂载节点（mount）适配，**该参数会旋转挂载节点（mount）**
   *
   * *移动端适用*
   *
   * @default false
   */
  autoRotateMountPoint?: boolean;
  /**
   * 当 mount挂载节点宽高大于云端推流分辨率时候
   *
   * true 拉伸video 尺寸并采用短边适配
   *
   * false 不拉伸video，保持原有云端分辨率
   *
   * @default true
   */
  fullVideoToScreen?: boolean;
  /**
   * Auto focus to video element
   *
   * @default false
   */
  autoFocusVideo?: boolean;
  /**
   * debugSetting 会在控制台打印出对应的日志 有如下配置
   */
  debugSetting?: DebugSettingParams;
  /**
   * 0: 关闭鼠标高频采样
   *
   * 1: 打开鼠标高采样
   *
   * 2: 打开鼠标高采样，打包发送
   *
   * 3: 限制包长度，多的丢掉
   *
   * @default 0
   */
  webDraftLevel?: number;
  /**
   * 强制显示鼠标
   *
   * @default false
   */
  forceShowCursor?: boolean;
  /**
   * 设置初始化背景图，web端container 的背景，非云端背景
   */
  bgImgUrl?: string;
  /**
   * 默认不展示
   *
   * 鼠标图片格式 https/http 地址
   *
   * 移动端传 'dot' 展示一个宽高 3px 的圆形小点。
   *
   * @default null
   */
  defaultCursorImgUrl?: string;
  /**
   * 云上应用交互模式，支持鼠标 或者 触摸
   *
   * **该参数建议移动端使用**
   *
   * @default 'cursor'
   */
  clientInteractMode?: 'cursor' | 'touch';
  /**
   * 劫持键盘 Ctrl+v/Cmd+v，当用户使用粘贴功能时候，直接将本地剪切板内容发送给云端
   *
   * **该接口适用PC 端，通常在云端 input 框 focus 时候使用**
   *
   * @default true
   */
  enablePaste?: boolean;
  // /**
  //  * 启动移动端系统输入法
  //  *
  //  * 云端input 框聚焦时候，拉起系统输入法
  //  *
  //  * @default false
  //  */
  // enableClientKeyboard?: boolean;
  /**
   * 启用云端计算鼠标
   *
   * 可能会更平滑
   *
   * @default true
   */
  enableMousemoveV2?: boolean;
  /**
   * 初始化云端桌面分辨率
   *
   * **可通过 TCGSDK.getPageSize() 获取页面 width，height 来实现自适应分辨率（移动端可将 width * 2，height * 2 保证画面清晰）**
   *
   * @default null
   */
  remoteDesktopResolution?: {
    width: number;
    height: number;
  };
  /**
   * 启动移动端鼠标事件监听
   *
   * @default true
   */
  enableMouseEventOnMobile?: boolean;
  /**
   * 是否开启事件拦截
   *
   * 拦截鼠标/键盘等事件，只针对云渲染节点操作时才向云端发送指令。
   *
   * @default true
   */
  enableEventIntercept?: boolean;
  /**
   * 初始化完毕的回调，触发此回调之后才能调用后面的 API
   *
   * CreateSession 需要在该回调成功后进行;
   *
   * @function
   * @param {Object} response - OnInitSuccess 回调函数的 response
   * @param {number} response.code  code=-2 peerConnection 未断开，需要先调用 TCGSDK.destroy() code=-1 localOffer 无法获取H264 编码 code=0 Success
   * @param {string} response.msg - message
   * @param {any} response.description -相关描述
   *
   */
  onInitSuccess?: (response: OnInitSuccessResponse) => void;
  /**
   * 连接成功回调，调用 start 接口成功后才会触发
   *
   * 建议TCGSDK 相关接口都在该回调成功后调用，例如：
   * 1. 创建数据通道 createCustomDataChannel
   * 2. 创建摇杆（Plugin/Joystick）
   * 3. setRemoteDesktopResolution 等
   *
   * @function
   * @param {Object} response - onConnectSuccess 回调函数的 response
   * @param {number} response.code  code=0 Success
   * @param {number} response.seat_index - 座位号，多人云游场景可能会用到
   * @param {string} response.role -角色，多人云游场景可能会用到
   *
   */
  onConnectSuccess?: (response: OnConnectSuccessResponse) => void;
  /**
   * 连接失败回调，连接断开，重连中会回调该接口
   *
   * 通常重连时间超过两分钟（例如连接断开/移动端切后台，两分钟后触发重连）
   * 系统会自动回收实例，表现为返回 code > 0，建议该情况下 重新init + createSession
   *
   *
   * @function
   * @param {Object} response - onConnectFail 回调函数的 response
   * @param {number} response.code
   * code 详情如下：
   * | code   | Description                               |
   * | ------ | ----------------------------------------- |
   * | -3     | 超出重连次数                                |
   * | -2     | 自动重连中                                  |
   * | -1     | 连接失败，触发了限频操作 5s，可稍后再连接        |
   * | 大于0(code > 0) | Proxy 返回的重连错误，通常连不上，需重新init + createSession     |
   * @param {string} response.msg - message
   *
   */
  onConnectFail?: (response: OnConnectFailedResponse) => void;
  /**
   * webrtc 状态回调，调用 start 接口成功后才会触发。
   *
   * @function
   * @param {Object} response - onWebrtcStatusChange 回调函数的 response
   * @param {number} response.code
   * code 详情如下：
   * | code    | Description                  |
   * | ------- | ---------------------------- |
   * | -2      | 获取H264 编码失败              |
   * | -1      | setRemoteDescription 失败     |
   * | 0       | 成功                          |
   * | 1       | 系统繁忙                       |
   * | 2       | 票据不合法                     |
   * | 3       | 用户带宽不足                   |
   * | 4       | 资源不足，没有可用机器           |
   * | 5       | session 失效，需要重新登录      |
   * | 6       | 媒体描述信息错误                |
   * | 7       | 游戏拉起失败                   |
   * | 100     | proxy 错误                    |
   * | 255     | 设备不支持webrtc               |
   * @param {string} response.msg - message
   */
  onWebrtcStatusChange?: (response: OnWebrtcStatusChangeResponse) => void;
  /**
   * 断开/被踢触发此回调，调用 start 接口成功后才会触发
   *
   * 当出现 -1 时候，如果设置了 init 参数 `reconnect: true`（默认值 true） 不用任何操作，SDK 会主动重连，未设置需要调用 TCGSDK.reconnect()
   *
   * 如果持续链接不上，可以看回调 onConnectFail 相关错误码，在里面完善相关逻辑
   *
   * @function
   * @param {Object} response - onDisconnect 回调函数的 response
   * @param {number} response.code
   * code 详情如下：
   * | code    | Description                                                     |
   * | ------- | --------------------------------------------------------------- |
   * | -2      | 创建local offer 失败，需要重新init + createSession                       |
   * | -1      | 需要重连，通常出现在码率掉0，收不到推流，连接超时，ice 断开，SDK 会自动重连  |
   * | 0       | 主动关闭                                                         |
   * | 1       | 用户重复连接(该消息不可靠)                                          |
   * | 2       | 用户心跳超时，webrtc服务端主动断开，这个消息有可能丢失 init + createSession   |
   * @param {string} response.msg - message
   *
   */
  onDisconnect?: (response: OnDisconnectResponse) => void;
  /**
   * 网络状态变化/用户idle，都会调用此回调
   *
   * @function
   * @param {Object} response - onNetworkChange 回调函数的 response
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
   * **移动端适用**
   *
   * 移动端触摸事件回调，调用 start 接口成功后才会触发
   *
   * 返回 OnTouchEventResponse[]，对应当前屏幕触控点数，可根据 array 长度判断多指操作
   *
   * @function
   * @param {Object[]} response - onTouchEvent 回调函数的 response
   * @param {number} response.id - 触控事件的 ID
   * @param {TouchType} response.type - 事件类型，可选择 'touchstart'，'touchmove'，'touchend'，'touchcancel' 四种之一
   * @param {number} response.x - 触控点在视频区域内的 x 坐标 (hook 模式未减去 screen_left)
   * @param {number} response.y - 触控点在视频区域内的 y 坐标 (hook 模式未减去 screen_top)
   * @param {number} response.pageX - 触控点在当前网页内的 x 坐标
   * @param {number} response.pageY - 触控点在当前网页内的 y 坐标
   * @param {number} response.movementX - 触控点相对上次坐标的 x 偏移值
   * @param {number} response.movementY - 触控点相对上次坐标的 y 偏移值
   *
   * @example
   * onTouchEvent: async (res) => {
   *   // console.log('onTouchEvent', res);
   *   // 针对单指触控操作
   *   if (res.length === 1) {
   *     const [{ id, type, pageX, pageY }] = res;
   *     // console.log('onTouchEvent', id, type, pageX, pageY);
   *     TCGSDK.mouseMove(id, type, pageX, pageY);
   *     if (type === 'touchstart') {
   *       TCGSDK.sendMouseEvent({ type: 'mouseleft', down: true });
   *     }
   *     if (type === 'touchend' || type === 'touchcancel') {
   *       TCGSDK.sendMouseEvent({ type: 'mouseleft', down: false });
   *     }
   *   }
   *   // 针对双指缩放操作，这里双指模拟了PC 的鼠标滚轮事件
   *   if (res.length === 2) {
   *     const [{ pageX: oneX, pageY: oneY, type: oneType }, { pageX: twoX, pageY: twoY, type: twoType }] = res;
   *
   *     const currentX = Math.ceil(Math.abs(oneX - twoX));
   *     const currentY = Math.ceil(Math.abs(oneY - twoY));
   *     // lastX，lastY 为上一次的位置，可定义在全局 如 let lastX = null, lastY = null
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
   *
   *     // 双指离开后，发送一次鼠标抬起操作
   *     if (
   *       oneType === 'touchend' ||
   *       oneType === 'touchcancel' ||
   *       twoType === 'touchend' ||
   *       twoType === 'touchcancel'
   *     ) {
   *       TCGSDK.sendMouseEvent({ type: 'mouseleft', down: false });
   *     }
   *   }
   * }
   */
  onTouchEvent?: (response: OnTouchEventResponse[]) => void;
  /**
   * 只针对移动端，双击屏幕回调（同onTouchEvent）
   * @function
   */
  onDoubleTap?: (response: OnTouchEventResponse[]) => void;
  /**
   * 游戏启动成功后的通知
   *
   * @function
   * @param {Object} response - onGameStartComplete 回调函数的 response
   * @param {string} response.request_id - 请求唯一标示
   * @param {string} response.user_id - user_id
   * @param {string} response.game_id - game_id
   * @param {number} response.status - 0 启动游戏成功; 1 启动游戏失败
   *
   */
  onGameStartComplete?: (response: OnGameStartCompleteResponse) => void;
  /**
   * 云端进程终止的通知
   *
   * @function
   * @param {Object} response - onGameStop 回调函数的 response
   * @param {string} response.user_id - user_id
   * @param {string} response.game_name - game_name
   * @param {number} response.timestamp - timestamp
   * @param {string} response.message - message
   */
  onGameStop?: (response: OnGameStopResponse) => void;
  /**
   * 游戏存档加载回调，会不断回调size
   *
   * @function
   * @param {Object} response - onLoadGameArchive 回调函数的 response
   * @param {string} response.user_id - user_id
   * @param {string} response.game_id - game_id
   * @param {string} response.name - 存档最终文件名
   * @param {string} response.url - 存档下载地址
   * @param {number} response.status - 0: 加载存档成功 ; 1: 下载存档失败 ; 2: 校验存档失败 ; 3: 解压存档失败 ; 4: 其他错误 ; 5: 下载中
   * @param {('Auto'|'Normal')} response.save_type - 'Auto' or 'Normal'
   * @param {string} response.category_id - 分类标识
   * @param {number} response.archive_size - archive_size
   * @param {number} response.loaded_size - 表示下载的字节数
   */
  onLoadGameArchive?: (response: OnLoadGameArchiveResponse) => void;
  /**
   * 游戏保存存档回调
   *
   * @function
   * @param {Object} response - onLoadGameArchive 回调函数的 response
   * @param {string} response.user_id - user_id
   * @param {string} response.game_id - game_id
   * @param {string} response.name - 存档最终文件名
   * @param {string} response.md5 - md5
   * @param {number} response.status - 0: 存档保存成功 1: 存档保存失败 2: 存档压缩失败失败 3: 其他错误 4: 上传中
   * @param {('Auto'|'Normal')} response.save_type - 'Auto' or 'Normal'
   * @param {string} response.category_id - 分类标识
   * @param {number} response.archive_size - archive_size
   * @param {number} response.saved_size - 表示上传的字节数
   *
   */
  onSaveGameArchive?: (response: OnSaveGameArchiveResponse) => void;
  /**
   * 云端输入状态改变，有点击事件的时候都会触发，可根据状态判断 input 框是否聚焦
   *
   * 该回调可能会触发两次，分别对应鼠标左右按下/抬起
   *
   * @function
   * @param {Object} response - onInputStatusChange 回调函数的 response
   * @param {('normal_input' | 'unfocused')} response.field_type - unfocused 脱焦，normal_input 常规input 输入
   * @param {('disabled' | 'enabled')} response.status - 输入可用状态
   */
  onInputStatusChange?: (response: OnInputStatusChangeResponse) => void;
  /**
   * 手柄连接/断开事件回调
   *
   * **需要 Web 运行环境支持 Gamepad API**
   *
   * @function
   * @param {Object} response - onGamepadConnectChange 回调函数的 response
   * @param {('gamepadconnect'|'gamepaddisconnect')} response.status - 链接状态
   * @param {number} response.index - 手柄索引
   * @param {Gamepad} response.gamepad - Gamepad API interface
   *
   */
  onGamepadConnectChange?: (response: OnGamepadConnectChangeResponse) => void;
  /**
   * 云端鼠标显示/隐藏，只在变化的时候回调，包含新旧状态描述
   *
   * @function
   * @param {Object} response - onCursorShowStatChange 回调函数的 response
   * @param {boolean} response.oldStatus - 老状态
   * @param {boolean} response.newStatus - 新状态
   */
  onCursorShowStatChange?: (response: OnCursorShowStatChangeResponse) => void;
  /**
   * 屏幕方向变化事件回调，type 包含 portrait 以及 landscape
   *
   * @function
   * @param {Object} response - onOrientationChange 回调函数的 response
   * @param {('portrait' | 'landscape')} response.type - 当前横竖屏状态
   */
  onOrientationChange?: (response: { type: 'portrait' | 'landscape' }) => void;
  /**
   * 页面显示/隐藏发生变化，status 包含 visible 以及 hidden
   *
   * @function
   * @param {Object} response - onVisibilityChange 回调函数的 response
   * @param {('visible' | 'hidden')} response.status - 当前显示/隐藏状态
   */
  onVisibilityChange?: (response: { status: 'visible' | 'hidden' }) => void;
  /**
   * 云端config 发生变化时候回调，包含屏幕相关 screen_config，具体如下：
   *
   * @function
   * @param {Object} response - onConfigurationChange 回调函数的 response
   * @param {number} response.width - 宽
   * @param {number} response.height - 高
   * @param {('landscape'|'portrait')} response.orientation - 屏幕方向
   * @param {('0_degree' | '90_degree' | '180_degree' | '270_degree')} response.degree - 云机旋转角度
   * @param {(0 | 90 | 180 | 270)} response.deg - 前端需要旋转的角度（需要旋转该角度才能正向显示画面）
   */
  onConfigurationChange?: (response: OnConfigurationChangeResponse) => void;
  /**
   * 云端屏幕分辨率发生变化，具体如下：
   *
   * @function
   * @param {Object} response - onRemoteScreenResolutionChange 回调函数的 response
   * @param {number} response.width
   * @param {number} response.height
   * @param {number} response.top
   * @param {number} response.left
   */
  onRemoteScreenResolutionChange?: (response: OnRemoteScreenResolutionChangeResponse) => void;
  /**
   * 推流分辨率发生变化
   *
   * 与 onRemoteScreenResolutionChange 区别在于，前者是云端屏幕/应用的分辨率，后者是推流分辨率，可能存在设置的屏幕/应用分辨率为 1280*720，但是推流的分辨率为 1920*1080的情况。
   *
   * @function
   * @param {Object} response - onVideoStreamConfigChange 回调函数的 response
   * @param {number} response.width
   * @param {number} response.height
   */
  onVideoStreamConfigChange?: (response: { width: number; height: number }) => void;
  /**
   * 连接设备发生变化，需要通过 navigator.mediaDevices.enumerateDevices() 拿到可用设备
   * @function
   */
  onDeviceChange?: (response: any) => void;
  /**
   * 获取 mic/camera 回调
   *
   * @function
   * @param {Object} response - onGetUserMediaStatusChange 回调函数的 response
   * @param {number} response.code - 0 Success; 1 NotFoundError; 2 NotAllowedError; 3 OverconstrainedError
   * @param {string} response.msg - 'NotFoundError' | 'NotAllowedError' | string;
   * @param {MediaStream} response.userMedia - userMedia
   */
  onGetUserMediaStatusChange?: ({
    code,
    msg,
    type,
    userMedia,
  }: {
    code: number;
    msg: 'NotFoundError' | 'NotAllowedError' | string;
    type: 'mic' | 'camera';
    userMedia: MediaStream;
  }) => void;
  /**
   * 事件回调
   *
   * 目前主要用于自动播放是否成功回调
   *
   * @function
   * @param {Object} response - onEvent 回调函数的 response
   * @param {string} response.type - 对应类型 'autoplay' | 'first_frame' | 'video_state' | 'idle' | 'noflow' | 'noflowcenter' |  'openurl' | 'pointerlockerror' | 'readclipboarderror' | 'webrtc_stats' | 'latency'
   * @param {Object} [response.data] - 不同 type可能 data 不同，参考下表
   *
   * 对照表
   * | type    | data                                                     |
   * | ------- | --------------------------------------------------------------- |
   * | autoplay   | Object<{code: number; message: string; mediaType: 'video' | 'audio'}> <table><tr><th>code</th><th>0 success -1 failed</th></tr><tr><td>message</td><td>string</td></tr><tr><td>mediaType</td><td>'video' | 'audio'</td></tr></table> |
   * | first_frame   | Object<{duration: number}> <table><tr><th>duration</th><th>首帧回调时间，从 access 开始计算</th></tr><tr><th>width</th><th>视频宽度</th></tr><tr><th>height</th><th>视频高度</th></tr></table> |
   * | video_state      | Object<{code: number; message: string;}> <table><tr><th>code</th><th>0 playing 1 pause 2 ended</th></tr><tr><td>message</td><td>string</td></tr></table> |
   * | audio_state      | Object<{code: number; message: string;}> <table><tr><th>code</th><th>0 playing 1 pause 2 ended</th></tr><tr><td>message</td><td>string</td></tr></table> |
   * | idle      | Object<{times: number;}> <table><tr><th>times</th><th>number</th></tr></table> |
   * | noflow      | - |
   * | noflowcenter      | - |
   * | openurl      | Object<{value: string;}> <table><tr><th>value</th><th>string</th></tr></table> |
   * | pointerlockerror      | - |
   * | readclipboarderror      | Object<{message?: string;}> <table><tr><th>message</th><th>string</th></tr></table> |
   * | webrtc_stats      | Object<> <table><tr><th>bit_rate</th><th>number</th><th>客户端接收的码率，单位：Mbps</th></tr><tr><th>cpu</th><th>number</th><th>云端CPU占用率，单位：百分比</th></tr><tr><th>gpu</th><th>string</th><th>云端GPU占用率，单位：百分比</th></tr><tr><th>delay</th><th>number</th><th>客户端收到图像帧到解码显示的延时，单位：ms，iOS可能收不到</th></tr><tr><th>fps</th><th>number</th><th>客户端显示帧率</th></tr><tr><th>load_cost_time</th><th>number</th><th>云端加载时长，单位：ms</th></tr><tr><th>nack</th><th>number</th><th>客户端重传次数</th></tr><tr><th>packet_lost</th><th>number</th><th>客户端丢包次数</th></tr><tr><th>packet_received</th><th>number</th><th>客户端收到的包总数</th></tr><tr><th>rtt</th><th>number</th><th>客户端到云端，网络端数据包往返耗时</th></tr><tr><th>timestamp</th><th>number</th><th>此数据回调的时间戳，单位：ms</th></tr> <tr><th>first_frame_cost_time</th><th>number</th><th>首帧耗时</th></tr> <tr><th>api_cost_time</th><th>number</th><th>API 耗时</th></tr> </table> |
   * | media_stats      | Object<{video: Object<>; audio: Object<>}> <table><tr><td>videoStats</td><td></td><td></td></tr><tr><td>fps</td><td>number</td><td>帧率</td></tr><tr><td>bit_rate</td><td>number</td><td>码率，单位：Mbps</td></tr><tr><td>packet_lost</td><td>number</td><td>丢包次数</td></tr><tr><td>packet_received</td><td>number</td><td>收到的包总数</td></tr><tr><td>packet_loss_rate</td><td>number</td><td>丢包率</td></tr><tr><td>nack</td><td>number</td><td>重传次数</td></tr><tr><td>jitter_buffer</td><td>number</td><td>缓冲区延迟</td></tr><tr><td>width</td><td>number</td><td>宽度</td></tr><tr><td>height</td><td>number</td><td>高度</td></tr><tr><td>codec</td><td>string</td><td>编码格式</td></tr><tr><td>audioStats</td><td></td><td></td></tr><tr><td>sample_rate</td><td>number</td><td>采样率</td></tr><tr><td>channels</td><td>number</td><td>声道数</td></tr><tr><td>bit_rate</td><td>number</td><td>码率，单位：Mbps</td></tr><tr><td>packet_lost</td><td>number</td><td>丢包次数</td></tr><tr><td>packet_received</td><td>number</td><td>收到的包总数</td></tr><tr><td>packet_loss_rate</td><td>number</td><td>丢包率</td></tr><tr><td>nack</td><td>number</td><td>重传次数</td></tr><tr><td>jitter_buffer</td><td>number</td><td>缓冲区延迟</td></tr><tr><td>concealed_samples</td><td>number</td><td>丢包补偿（PLC）的样点总个数</td></tr><tr><td>concealment_events</td><td>number</td><td>丢包补偿（PLC）的累计次数</td></tr><tr><td>codec</td><td>string</td><td>编码格式</td></tr></table> |
   * | latency      | Object<{value: number; message: string;}> <table><tr><th>value</th><th>value=0 NETWORK_NORMAL <br />value=1 NETWORK_CONGESTION <br />value=2 NACK_RISING <br />value=3 HIGH_DELAY <br />value=4 NETWORK_JITTER </th></tr><tr><td>message</td><td>string</td></tr></table> |
   * | ice_state    | Object<{value: string;}> <table><tr><th>value</th><th>connected / disconnected</th></tr></table> |
   * | token_not_found    | Object<{instance_ids: string[];}> <table><tr><th>instance_ids</th><th>string[]</th></tr></table> |
   * | mic_status    | Object<{status: string;}> <table><tr><th>status</th><th>open / close</th></tr></table> |
   * | camera_status    | Object<{status: 'open_back' | 'open_front' | 'close'; width？: number; height: number;}> <table><tr><th>status</th><th> 'open_back' | 'open_front' | 'close' </th></tr><tr><td>width</td><td>number</td></tr><tr><td>height</td><td>number</td></tr></table> |
   *
   *
   */
  onEvent?: (response: OnEventResponse) => void;
  /**
   * @function
   * @param {Object} response - onStreamPushStateChange 回调函数的 response
   * @param {string} response.stream_push_state - 推流状态 'NoStreamPushing' | 'PushConnecting' | 'Pushing' | 'PushPaused' | 'PushReConnecting';
   */
  onStreamPushStateChange?: (response: OnStreamPushStateChangeResponse) => void;
  /**
   *
   * 多人云游场景的回调函数，包括 user_state，seats_info
   *
   * @function
   * @param {Object} response - onMultiPlayerChange 回调函数的 response
   * @param {Object} response.user_state
   * @param {('offline' | 'online')} response.user_state.state - 用户状态
   * @param {string} response.user_state.user_id - 用户 id
   * @param {Object} response.seats_info - 座位信息
   * @param {Object[]} response.seats_info.players
   * @param {string} response.seats_info.players.name - 用户名称
   * @param {number} response.seats_info.players.seat_index - 坐席位置
   * @param {number} response.seats_info.players.mic_status - 麦克风状态 0 管理员禁麦 1 闭麦（自己主动）2 开麦
   * @param {Object[]} response.seats_info.viewers
   * @param {string} response.seats_info.viewers.name - 用户名称
   * @param {number} response.seats_info.viewers.seat_index - 坐席位置
   * @param {number} response.seats_info.viewers.mic_status - 麦克风状态 0 管理员禁麦 1 闭麦（自己主动）2 开麦
   * @param {Object} response.submit_seat_change - 只有主机玩家才能收到该消息
   * @param {string} response.submit_seat_change.user_id - 用户 id
   * @param {('viewer' | 'player')} response.submit_seat_change.to_role - 需要切换至的角色
   * @param {number} response.submit_seat_change.seat_index - 需要切换至的坐席
   *
   */
  onMultiPlayerChange?: (response: OnMultiPlayerChangeResponse) => void;
  // -------------- 云手机消息 ------------
  /**
   *
   * 云手机事件回调
   *
   * @function
   * @param {Object} response - onAndroidInstanceEvent 回调函数的 response
   * @param {string} response.type - 事件名称  'trans_message' | 'system_usage' | 'clipboard_event' | 'notification_event'
   * @param {Object} response.data - 事件数据，不同 type可能 data 不同，参考下表
   *
   *
   * 对照表
   * | type    | data                                                     |
   * | ------- | --------------------------------------------------------------- |
   * | trans_message   | Object<{msg: string; package_name: string;}> |
   * | system_usage    | Object<{cpu_usage: number; mem_usage: number; gpu_usage: number;}> |
   * | clipboard_event | Object<{text: string; writeText?: boolean}> <table><tr><th>text</th><th>string</th></tr><tr><th>writeText</th><th>boolean 是否已写入剪切板</th></tr></table> |
   * | notification_event    | Object<{package_name: string; title: string; text: string;}> |
   * | system_status    | Object<{ nav_visible: boolean; music_volume: number;}> |
   * | distribute_progress_event    | Object<{ state: 'SUCCESS' | 'UNSUPPORTED'(镜像不支持) | 'BUSY'(在分发其他应用) | 'FAIL'; package_name: string;}> |
   * | touch_event    | Object<{finger_id: number; event_type: number; x: number; y: number; width: number; height: number; timestamp: number;}> <table><tr><th>finger_id</th><th> - </th></tr><tr><th>event_type</th><th> 0 "touchstart", 1 "touchmove", 2 "touchend", 3 "touchcancel" </th></tr><tr><th>x</th><th> 云机 x </th></tr><tr><th>y</th><th> 云机 y </th></tr><tr><th>width</th><th> 云机 width </th></tr><tr><th>height</th><th> 云机 height </th></tr><tr><th>timestamp</th><th> - </th></tr></table>|
   *
   */
  onAndroidInstanceEvent?: (response: OnAndroidInstanceEventResponse) => void;
  /**
   * 连接成功后会根据 image.interval 间隔时间，截取屏幕画面，并通过 onImageEvent 回调
   *
   * @function
   * @param {Object} response - onImageEvent 回调函数的 response
   * @param {'screenshot'} response.type  - 事件类型，'screenshot' 截图
   * @param {Object} response.data - screenshot type 对应 [{instanceId: string, url: string}]
   *
   */
  onImageEvent?: (response: OnImageEventResponse) => void;
  /**
   * 日志回调函数，用于外部获取日志，作用与 setLogHandler 接口一致
   *
   * @function
   * @param {string} response
   */
  onLog?: (response: string) => void;
}

/**
 * 云渲染JSSDK（TCGSDK），用于云渲染 PaaS 应用的开发。TCGSDK 采用注册回调方式，并提供了包括鼠标键盘控制，音视频控制，游戏进程控制相关接口，接口详情请参考下列说明。
 *
 * @class
 */
export class CloudGamingWebSDK {
  constructor();
  // -------------- 云渲染生命周期相关接口 ------------
  /**
   * @param {InitConfig} config
   * TCGSDK 入口文件，TCGSDK 其他方法建议在 init 的回调函数 onInitSuccess/onConnectSuccess 中调用
   */
  init(config?: InitConfig): void;
  /**
   * 获取初始化参数
   * {@link InitConfig}
   */
  getInitOptions(): InitConfig;
  /**
   * Cloud Device 模块
   */
  getAndroidInstance(): AndroidInstance;
  /**
   * **获取 Client 端会话信息**
   *
   * ClientSession 在每次 init 生命周期可用，当 destroy 后，需要重新 init，再获取最新 ClientSession
   *
   * @example
   * const clientSession = TCGSDK.getClientSession();
   *
   */
  getClientSession(): string;
  /**
   * 启动云渲染
   * @param {string} serverSession 调用云API接口 CreateSession 后返回的 ServerSession
   *
   * @example
   * TCGSDK.start(serverSession);
   *
   */
  start(serverSession: string): void;
  /**
   * 设置 accessToken
   *
   * @param {Object} params
   * @param {string} params.accessInfo
   * @param {string} params.token
   *
   * @example
   * TCGSDK.setAccessToken({accessInfo: 'xxx', token: 'xxx'});
   *
   */
  setAccessToken({ accessInfo, token }: { accessInfo: string; token: string }): void;
  /**
   * 启动云渲染，需要 init 内传入 accessToken 或调用 setAccessToken
   *
   * @param {Object} params
   * @param {string} [params.instanceId] - 实例 Id，单连接
   * @param {string} [params.instanceIds] - 实例 Ids，group control
   * @param {boolean} [params.groupControl] - groupControl 标志位 default false
   *
   * @example
   * TCGSDK.access({instanceId: 'cai-xxxx-xxxx'});
   *
   */
  access({
    instanceId,
    instanceIds,
    groupControl,
  }: {
    instanceId?: string;
    instanceIds?: string[];
    groupControl?: boolean;
  }): void;
  /**
   * 立即停止云渲染；
   *
   * 该接口为前端的停止，即 clear 当前的连接（peerConnection）。云端会在自动检测到心跳消失后，释放资源。
   *
   * 如需立即释放云端资源，云游戏请调用云API [StopGame](https://cloud.tencent.com/document/product/1162/40739)，应用云渲染请调用云API [DestroySession](https://cloud.tencent.com/document/product/1547/72812)
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
   * 重连接口，也可以设置 *init reconnect* 参数由SDK 自动调用。或根据 onDisconnect 回调 code，结合自身场景，主动调用该接口
   *
   * 重连策略：每5秒尝试一次，最多重连5次
   *
   * @example
   * TCGSDK.reconnect();
   *
   */
  reconnect(): void;
  // -------------- 事件接口 ------------
  /**
   * 监听事件回调，同 init 内的对应回调相同
   *
   * @param {EventTypes} type - 监听事件
   * @param {Function} handler - 回调函数 response data
   *
   */
  on<T extends EventTypes>(type: T, handler: (data: EventTypesMap[T]) => void): void;
  // -------------- 基础方法接口 ------------
  /**
   * 获取是否为手游方案
   *
   * @example
   * TCGSDK.getIsMobileGame();
   *
   */
  getIsMobileGame(): boolean;
  /**
   * 重新调整video 位置
   *
   * 视图根据云端分辨率比例，采用短边适配原则，如未达到预期，可通过该接口重新调整视图，或直接通过 CSS 样式覆盖。
   *
   * @example
   * TCGSDK.reshapeWindow();
   *
   */
  reshapeWindow(): void;
  /**
   * 设置云渲染页面的背景图。
   * **注意，这里设置的是前端container 的背景图，不是云端的背景图，云端背景图通过createSession 设置**
   * @param {string} url 背景图片
   */
  setPageBackground(url: string): void;
  /**
   * 设置是否全屏
   *
   * **iOS 不可用**
   *
   * @param {boolean} fullscreen 是全屏还是退出全屏
   * @param {HTMLElement} element 需要操作的节点
   *
   * @example
   * TCGSDK.setFullscreen(true, html);
   */
  setFullscreen(fullscreen: boolean, element?: HTMLElement): Promise<void>;
  /**
   * 获取是否全屏
   */
  getFullscreen(): boolean;
  /**
   * 获取页面方向
   */
  getPageOrientation(): 'portrait' | 'landscape';
  /**
   * 获取当前连接 requestId
   *
   * **在调用 TCGSDK.start() 后生效**
   */
  getRequestId(): string;
  // -------------- 游戏进程相关接口 ------------
  /**
   * 重启当前运行的游戏进程
   */
  gameRestart(): void;
  /**
   * 暂停推流
   *
   * *media 不传默认 audio/video 同时暂停*
   *
   * @param {Object} param
   * @param {'audio' | 'video'} param.media - 媒体类型
   *
   * @example
   * TCGSDK.gamePause({media: 'video'});
   */
  gamePause({ media }?: { media: 'audio' | 'video' }): void;
  /**
   * 恢复推流
   *
   * *media 不传默认 audio/video 同时恢复*
   *
   * @param {Object} param
   * @param {'audio' | 'video'} param.media - 媒体类型
   *
   * @example
   * TCGSDK.gameResume({media: 'video'});
   */
  gameResume({ media }?: { media: 'audio' | 'video' }): void;
  /**
   * **聚焦输入框时**快速发送内容，会同时粘贴到剪贴板
   *
   * @param {string} content 需要发送的内容
   * @param {Function} [callback] 回调 code: 0 success, 1 failed
   *
   * @example
   * TCGSDK.sendText('abc');
   */
  sendText(content: string, callback?: Function): void;
  /**
   * 设置云端应用交互模式，也可通过 *InitConfig clientInteractMode* 设置
   *
   * **该参数建议移动端使用，PC 端设置该参数会导致鼠标锁定**
   *
   * @param { string } mode='cursor' -'cursor' 表示鼠标，‘touch’ 表示触控，**需要云上应用支持**
   *
   * @example
   * TCGSDK.setClientInteractMode('cursor');
   */
  setClientInteractMode(mode: 'cursor' | 'touch'): void;
  /**
   * @async
   *
   * @description 设置云端桌面分辨率 width、height
   *
   * **建议在 onConnectSuccess 内调用**
   *
   * 云上应用大概可以分为以下四种模式
   * 1. 有边框窗口 - 应用有边框，类似文件夹浏览器的窗口，打开应用的同时可以看到桌面
   * 2. 无边框窗口 - 应用无边框，应用分辨率小于桌面分辨率，看不到标题栏之类的状态条，打开应用的同时可以看到桌面
   * 3. 无边框全屏 - 应用无边框且应用分辨率等同于桌面分辨率，桌面被应用完全遮挡，达到全屏的效果
   * 4. 独占全屏 - 应用独占全屏，显示器分辨率由应用控制，此时强行修改桌面分辨率可能导致应用崩溃
   *
   * *区分无边框全屏和独占全屏*
   * -无边框全屏的应用按alt tab切换窗口不会导致显示器闪烁，独占全屏应用会有个闪烁的现象-
   *
   * 以上四种模式除4（独占全屏）模式外，都能使用该接口
   *
   * @param {Object} param
   * @param {number} param.width - 云端桌面宽度
   * @param {number} param.height - 云端桌面高度
   *
   * @example
   * TCGSDK.setRemoteDesktopResolution({width: 1920, height: 1080});
   *
   * @returns {Promise<{code: 0 | 1}>} 返回 Promise 对象。 0 成功 1 失败
   */
  setRemoteDesktopResolution({ width, height }: { width: number; height: number }): Promise<{
    code: number; // 0 | 1
  }>;
  /**
   * 获取视频流的分辨率
   *
   * @returns {Object} Object {width: number; height: number}
   * @example
   * const {width, height} = TCGSDK.getRemoteStreamResolution();
   */
  getRemoteStreamResolution(): { width: number; height: number };
  /**
   * 推流视频截图
   *
   * @param {Object} param
   * @param {string} [param.name] - 截图名称，默认为 `tcgsdk-${+new Date()}`
   * @param {number} [param.width] - 截图宽度，默认取视频流宽度
   * @param {number} [param.height] - 截图高度，默认取视频流高度
   *
   * @example
   * TCGSDK.screenShot({name: 'abc123', width: 720, height: 1280});
   */
  screenShot({ name, width, height }: { name?: string; width?: number; height?: number }): void;
  // -------------- 数据通道/媒体数据相关接口 ------------
  /**
   * @async
   *
   * @description 创建自定义dataChannel，建议在onConnectSuccess 回调中使用，请求参数具体如下:
   *
   * **建议在 onConnectSuccess 内 setTimeout 调用**
   *
   * **常见问题**
   * - 数据通道创建成功，业务前端发送数据成功，但没有收到云端应用回复的数据
   *
   *    **参考流程**
   *    1. 该接口调用成功表示业务前端与云端数据通道已建立成功，但可能此时云端应用并未完全拉起，业务前端可以通过 timeout/interval/轮询等形式发送自定义数据，确保云端应用成功拉起后正常接收到业务前端发送的自定义数据。只要数据通道创建成功，默认数据能发送成功。
   *    2. 在onMessage 回调中确定收到云端应用数据，可以取消轮询，之后正常发送数据。
   *
   * - 可以收发的数据类型
   *
   *    该接口支持 string \| ArrayBuffer
   *
   * - 数据包传输大小是否有限制
   *
   *    服务对传输数据包大小没有限制，但是需要注意 UDP 最大包长是 64KB，建议包大小应该小于 MTU 1500。如果包体过大，建议通过分包形式传输，如果太多数据上行容易导致拥塞影响体验。
   *
   * @param {Object} param
   * @param {number} param.destPort - 目标端口，端口范围建议为 10000-20000
   * @param {number} [param.maxPacketLifeTime] - 最大包体发送时间，单位毫秒。*注意：maxPacketLifeTime 和 maxRetransmits 不能同时存在。*
   * @param {number} [param.maxRetransmits] - 最大重传次数。*注意：maxPacketLifeTime 和 maxRetransmits 不能同时存在。*
   * @param {string} [param.protocol='text'] - 'text' | 'binary'，指定云端回复(onMessage 方法内收到的)数据类型
   * @param {string} [param.type=''] - '' | 'android' | 'android_broadcast'，默认值 '' 字符串会透传 sendMessage 的数据，传 'android' 会基于sendMessage 内的数据包一层 user_id， 类似于 {user_id: 'xxx', data: any} 的格式，'android_broadcast' 会包一层 user_id 并广播消息到所有实例。
   * @param {Function} param.onMessage - dataChannel收到消息的回调函数
   *
   * @returns 返回 Promise 对象。
   * | Name          | Type                | Description                 |
   * | ------------- | ------------------- | --------------------------- |
   * | code          | number              | 0 success, 1 ack dataChannel 未创建成功，请重试, 2 该数据通道已经存在, 3 请求超时，请重试,  -1 创建失败(ack 返回)                     |
   * | msg           | string              |   |
   * | sendMessage   | (message: string \| Blob \| ArrayBuffer \| ArrayBufferView) => void;  | 用于发送消息的方法，会透传数据给 peerConnection 的 dataChannel，参数message 支持 RTCDataChannel send 所有数据类型  |
   *
   * @example
   * let timer = null;
   *
   * const { sendMessage, code } = await TCGSDK.createCustomDataChannel({
   *   destPort: 10005,
   *   onMessage: (res) => {
   *     console.log('CustomDataChannel onMessage', res);
   *
   *     // 收到该回调后，表示云端应用已成功拉起并收到数据，可以 clearInterval，之后正常发送数据
   *     // clearInterval(timer)
   *   },
   * });
   *
   * // code 为 0表示，web 端与云端数据通道已建立成功，但此时可能云端应用并未完全拉起，web 端可以通过 setTimeout/setInterval/轮询发送消息
   * if (code === 0) {
   *   // 发送自定义消息
   *   sendMessage('abc123');
   *
   *   // timer = setInterval(() => {
   *   //   sendMessage('abc123');
   *   // }, 5000);
   * }
   *
   * if (code === 1) {
   *   // 考虑重新创建数据通道
   * }
   *
   */

  createCustomDataChannel({
    destPort,
    onMessage,
    maxPacketLifeTime,
    maxRetransmits,
    protocol,
    type,
  }: {
    destPort: number;
    onMessage: (res: any) => void;
    maxRetransmits?: number;
    maxPacketLifeTime?: number;
    protocol?: 'text' | 'binary';
    type?: '' | 'android' | 'android_broadcast';
  }): Promise<{
    code: number; // 0 success, 1 ack dataChannel 未创建成功，请重试, 2 该数据通道已经存在
    msg: string;
    // 用于发送消息的方法，会透传数据给 peerConnection 的 dataChannel，参数message 支持 RTCDataChannel send 所有数据类型
    sendMessage: (message: string | Blob | ArrayBuffer | ArrayBufferView) => void;
  }>;
  // -------------- 鼠标键盘控制相关接口 ------------
  /**
   * 发送键盘事件，**该方法调用通常是成对出现(就像正常打字，通常是down/up组合)**
   *
   * 键盘的键位码 可通过 [keycode](https://www.toptal.com/developers/keycode) 查询
   *
   * 对于云手游常用按键keycode是:
   * KEY_BACK = 158
   * KEY_MENU = 139
   * KEY_HOME = 172
   * KEYCODE_VOLUME_UP = 0x3a
   * KEYCODE_VOLUME_Down = 0x3b
   *
   * @param {Object} param
   * @param {number} param.key - 对应的 code 码
   * @param {boolean} param.down - 是否是按下状态
   * @param {number} param.location - 1 左键，2 右键
   *
   * @example
   * // 按下时
   * TCGSDK.sendKeyboardEvent({key: 32, down: true});
   * // 抬起时
   * TCGSDK.sendKeyboardEvent({key: 32, down:  false});
   *
   */
  sendKeyboardEvent({ key, down, location }: { key: number; down: boolean; location?: number }): void;
  /**
   * 发送鼠标事件
   * @param {Object} param
   * @param {MouseEvent} param.type - 鼠标事件类型 'mouseleft' | 'mouseright' | 'mousemiddle' | 'mouseforward' | 'mousebackward' | 'mousescroll' | 'mousemove' | 'mousedeltamove'
   * @param {boolean} [param.down] 是否是按下状态(就像正常鼠标点击，通常是down/up组合)
   * @param {number} [param.delta] 鼠标滚轮，通常传 1/-1
   *
   * @example
   * // 鼠标左键按下
   * TCGSDK.sendMouseEvent({type: 'mouseleft', down: true});
   * // 鼠标左键抬起
   * TCGSDK.sendMouseEvent({type: 'mouseleft', down: false});
   */
  sendMouseEvent({ type, down, delta }: { type: MouseEvent; down?: boolean; delta?: number }): void;
  /**
   * 发送手柄事件
   *
   * 对于PC 端（如果浏览器支持 Gamepad API），TCGSDK 已自动监听/处理了手柄事件，无需手动调用
   *
   * @param {Object} param
   * @param {GamePadEvent} param.type - 手柄事件类型 'gamepadconnect' | 'gamepaddisconnect' | 'gamepadkey' | 'axisleft' | 'axisright' | 'lt' | 'rt'
   * @param {boolean} [param.down] 是否是按下状态
   * @param {number} [param.key] 手柄键值 
   * 
• 方向键事件值：向上键值为0x01，向下键值为0x02，向左键值为0x04，向右键值为0x08

• 按键事件值：X 键值为0x4000，Y 键值为0x8000，A 键值为0x1000, B 键值为0x2000，LB 键值为0x100，RB 键值为0x200

•select 事件值：键值为0x20

•start 事件值：键值为0x10

   * @param {number} [param.x] lt/rt 取值[0-255], axisleft/axisright [-32767~32767]
   * @param {number} [param.y] 针对 axisleft/axisright [-32767~32767]
   *
   * @example
   * // 连接手柄
   * TCGSDK.sendGamepadEvent({ type: 'gamepadconnect' });
   * // 断开手柄
   * TCGSDK.sendGamepadEvent({ type: 'gamepaddisconnect' });
   * // key X 按下
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
    type: GamePadEvent;
    down?: boolean;
    key?: number;
    x?: number;
    y?: number;
  }): void;
  /**
   * @deprecated
   *
   * @description
   * 发送鼠标及键盘事件（底层实现 ACK 通道）
   *
   * @param {RawEventData} params - 底层原始数据类型，可用于鼠标/键盘/手柄消息的发送
   */
  sendRawEvent(params: RawEventData): void;
  /**
   * @deprecated
   *
   * @description
   * 发送按键序列（底层实现）
   *
   * @param {RawEventData[]} params - 序列化发送数据
   */
  sendSeqRawEvents(params: RawEventData[]): void;
  /**
   * 设置鼠标移动灵敏度
   *
   * **该方法只针对 deltaMove 生效**
   *
   * @param {number} value - 取值范围：[0.01, 100.0]之间的浮点数
   */
  setMoveSensitivity(value: number): void;
  /**
   * 获取当前鼠标灵敏度值
   */
  getMoveSensitivity(): number;
  /**
   * 模拟鼠标移动
   *
   * @param {number} identifier 触控点的 ID，多点触控时每个触控点 ID不能相等，同个触控点的所有事件的触控点 ID 必须一致
   * @param {TouchType} type 触控事件类型，值为touchstart、touchmove、touchend、touchcancel中的一个，对于同一个触控点，touchstart 必须且只对应一个 touchend 或 touchcancel
   * @param {number} x 触控点的 x 坐标，但是如果传浮点数，则按逻辑坐标处理
   * @param {number} y 触控点的 y 坐标，但是如果传浮点数，则按逻辑坐标处理
   *
   * @example
   * TCGSDK.mouseMove(id: 1, type: 'touchstart', pageX: 100, pageY: 100);
   *
   */
  mouseMove(identifier: number, type: string, x: number, y: number): void;
  /**
   * @deprecated
   *
   * 开启或关闭滑屏鼠标移动模式，通常对于鼠标相对位移方式
   *
   * **该方法只针对移动端适用。该 mode 下鼠标产生相对位移。**
   *
   * @param {boolean} param - true：打开，false：关闭
   */
  mouseTabletMode(param: boolean): void;
  /**
   * 设置鼠标模式
   *
   * **该方法建议在PC 端使用**
   *
   * @param {number} mode  目前支持三种鼠标样式：
   *
   * mode=0：页面渲染的固定鼠标图片，如未设置默认鼠标图片，会采用系统鼠标
   *
   * mode=1：采用云端应用内的鼠标图片，图片会下发到前端，由前端在浏览器页面绘制
   *
   * mode=2：(不建议使用)云端画面内渲染鼠标图片，此时会隐藏本地渲染的鼠标，兼容性最好，但是有延时
   *
   */
  setRemoteCursor(mode: 0 | 1 | 2 | number): void;
  /**
   * 设置鼠标状态，用于强制显示/强制锁定/自动跟随云端应用显示或锁定鼠标
   *
   * @param {string} status 目前支持三种状态
   *
   * status='forceShow' 强制网页鼠标显示鼠标
   *
   * status='forceLock' 强制锁定网页鼠标
   *
   * status='auto' 自动跟随云端应用的鼠标状态，如云端应用显示鼠标则网页显示鼠标，云端应用隐藏鼠标则网页锁定鼠标
   *
   */
  setCursorState(status: 'forceShow' | 'forceLock' | 'auto'): void;
  /**
   * (不建议使用) 如果鼠标显示/锁定需求调用 setCursorState
   *
   * 设置鼠标隐藏或显示
   *
   * **但是云端下发的鼠标显隐会覆盖掉该设置**
   *
   * @param {boolean} show
   */
  setCursorShowStat(show: boolean): void;
  /**
   * 获取云端鼠标隐藏状态，true｜false
   */
  getCursorShowStat(): boolean;
  /**
   * 设置是否允许锁定鼠标，该接口适用于云端应用会下发锁定鼠标指令，这里设置成 false会强制显示鼠标
   *
   * @param {boolean} param=true - 其中 true 为允许，false 为禁止。默认为 true。
   */
  setMouseCanLock(param: boolean): void;
  /**
   * 强制锁定鼠标
   *
   * @param {boolean} param=true - 其中 true 为允许，false 为禁止。
   */
  lockMouse(param: boolean): void;
  /**
   * 移动端适用，设置虚拟鼠标放大系数
   *
   * @param {number} value 放大系数，默认是1.0，与云端大小一致，取值范围[0.1,10]
   */
  setMobileCursorScale(value: number): void;
  /**
   * 重置云端所有按键状态，用于云端按键卡住的场景。
   */
  clearRemoteKeys(): void;
  /**
   * 重置云端大小写状态为小写。
   */
  resetRemoteCapsLock(): void;
  /**
   * 设置云渲染页面中鼠标默认图片。
   * @param {string} url 鼠标图片
   */
  setDefaultCursorImage(url: string): void;
  /**
   * 设置鼠标/键盘的可用状态，针对PC 上，鼠标键盘的对应事件默认会被SDK 捕获然后发向云端
   *
   * **该方法 PC 端适用**
   *
   * @param {Object} param
   * @param {boolean} param.keyboard 键盘可用状态
   * @param {boolean} param.mouse 鼠标可用状态
   *
   * @example
   * TCGSDK.setKMStatus({keyboard: false, mouse: false});
   *
   */
  setKMStatus({ keyboard, mouse }: { keyboard: boolean; mouse: boolean }): { code: number };
  /**
   * 设置键盘禁用列表，默认所有键位可用
   *
   * 键盘的键位码，可通过 [keycode](https://www.toptal.com/developers/keycode) 查询
   *
   * @param {Object} param
   * @param {boolean} param.keyList 按键列表
   *
   * @example
   * TCGSDK.setKeyboardBanList({ keyList: [18] });
   *
   */
  setKeyboardBanList({ keyList }: { keyList: number[] }): void;
  /**
   * 设置是否劫持 Ctrl+v/Cmd+v，当用户使用粘贴功能时候，直接将本地剪切板内容发送给云端
   *
   * **该方法PC 端适用，通常在云端 input 框 focus 时候使用**
   */
  setPaste(enable: boolean): void;
  /**
   * 云手机/云手游发送touch 事件
   *
   * **根据 onRemoteScreenResolutionChange 会调，可拿到云端屏幕分辨率，x/y 坐标是相对于该分辨率的 width/height 的位置**
   *
   * @param {Object} param
   * @param {number} param.finger_id touch finger id
   * @param {number} param.event_type touch 事件类型 touchstart - 0，touchmove - 1，touchend - 2，touchcancel - 2
   * @param {number} param.x 相对x轴坐标
   * @param {number} param.y 相对y轴坐标
   *
   * @example
   * // start/end 成对发送
   * TCGSDK.mobileTouchMove({finger_id: 0, event_type: 0, x: 111, y: 1102 });
   * TCGSDK.mobileTouchMove({finger_id: 0, event_type: 2, x: 111, y: 1102 });
   *
   */
  mobileTouchMove({
    finger_id,
    event_type,
    x,
    y,
  }: {
    /**
     * 支持多指操作，通过 finger_id 区分
     */
    finger_id: number;
    /**
     * touch 事件类型
     *
     * touchstart - 0
     * touchmove - 1
     * touchend - 2
     * touchcancel - 2
     */
    event_type: 0 | 1 | 2;
    /**
     * 相对x轴坐标，按照推流分辨率计算，左上角为 (0,0) 点
     */
    x: number;
    /**
     * 相对y轴坐标，按照推流分辨率计算，左上角为 (0,0) 点
     */
    y: number;
  }): void;
  // -------------- 音视频控制相关接口 ------------
  /**
   *
   * @description
   * 设置码流参数，该接口为设置建议码流参数，云端可能会根据游戏动态调整
   *
   * **如果CreateSession 参数中设置了 MinBitrate/MaxBitrate，参数 min_bitrate/max_bitrate 必须在前者设置范围内**
   *
   * @param {Object} profile 目前可用参数如下：
   * @param {number} [profile.fps] - 帧率，范围[10,60]
   * @param {number} [profile.max_bitrate] - 最大码率，范围[1,15]，单位：Mbps
   * @param {number} [profile.min_bitrate] - 最小码率，范围[1,15]，单位：Mbps
   * @param {number} [profile.video_width] - 视频宽度
   * @param {number} [profile.video_height] - 视频高度
   * @param {'kbps'|'mbps'} [profile.unit] - 码率单位，默认为'mbps'
   * @param {Function} [callback] 设置结果回调函数，可为 null
   *
   * @example
   * TCGSDK.setStreamProfile({ video_width: 720, video_height: 1080 });
   * TCGSDK.setStreamProfile({ fps: 60, max_bitrate: 5, min_bitrate: 3 });
   */
  setStreamProfile(
    profile: {
      fps?: number;
      max_bitrate?: number;
      min_bitrate?: number;
      video_width?: number;
      video_height?: number;
      unit?: 'Kbps' | 'Mbps';
    },
    callback?: Function,
  ): void;
  /**
   * 获取显示区域的参数，边距，宽高等，具体参数如下：
   *
   * @returns 返回 video 通过 getBoundingClientRect 获取的数据
   * | Name          | Type                | Description                 |
   * | ------------- | ------------------- | --------------------------- |
   * | left          | number              | 相对视图窗口 left 值          |
   * | top           | number              | 相对视图窗口 top 值           |
   * | width         | number              | 播放元素（video）width        |
   * | height        | number              | 播放元素（video）height       |
   * | pixelRatio    | number              | window.devicePixelRatio 当前显示设备的物理像素分辨率与CSS 像素分辨率之比  |
   */
  getDisplayRect(): { left: number; top: number; width: number; height: number; pixelRatio: number };
  /**
   * 设置video 音量
   *
   * @param {number} value number [0-1]
   *
   * @example
   * TCGSDK.setVideoVolume(0);
   *
   */
  setVideoVolume(value: number): void;
  /**
   * 设置audio 音量
   *
   * @param {number} value number [0-1]
   *
   * @example
   * TCGSDK.setAudioVolume(0);
   */
  setAudioVolume(value: number): void;
  /**
   * 获取video 音量
   */
  getVideoVolume(): number;
  /**
   * 获取audio 音量
   */
  getAudioVolume(): number;
  /**
   * 播放视频
   *
   * * 'play' 其实是调用了 video 的 play， 返回 Promise*
   *
   * @param {('play'|'pause')} status
   *
   * @example
   * TCGSDK.playVideo('play');
   */
  playVideo(status: 'play' | 'pause'): void | Promise<void>;
  /**
   * 播放视频
   *
   * * 'play' 其实是调用了 audio 的 play， 返回 Promise*
   *
   * @param {('play'|'pause')} status
   *
   * @example
   * TCGSDK.playAudio('play');
   */
  playAudio(status: 'play' | 'pause'): void | Promise<void>;
  /**
   * 获取 video 对象
   *
   * @example
   * TCGSDK.getVideoElement();
   */
  getVideoElement(): HTMLVideoElement;
  /**
   * 获取用户开启的摄像头或麦克风 stream
   */
  getUserMedia(): MediaStream;
  /**
   * 开关麦克风
   * @param {Object} param
   * @param {('open'|'close')} param.status - 开关状态
   * @param {(boolean | MicProfileConstraints )} [param.profile] - 麦克风设置
   *
   *
   * @returns {Promise<Object>} 结构如下
   *
   * | Response      | Type    | Description                                                          |
   * | ------------- | ------- | -------------------------------------------------------------------- |
   * | code          | 0 or 1   | 0 success 1 failed |
   * | msg           | string  | message                          |
   * | userMedia     | MediaStream | 获取的媒体信息                                                      |
   *
   * @example
   * TCGSDK.switchMic({status: 'open'});
   *
   */
  switchMic({
    status,
    profile,
  }: {
    status: 'open' | 'close';
    profile?: boolean | MicProfileConstraints;
  }): Promise<{ code: 0 | 1; msg: string; userMedia: MediaStream }>;
  /**
   * 开关摄像头
   * @param {Object} param
   * @param {('open'|'close')} param.status - 开关状态
   * @param {(boolean | CameraProfileConstraints | CameraProfileType)} [param.profile] - 摄像头设置
   *
   * @returns {Promise<Object>} 结构如下
   *
   * | Response      | Type    | Description                                                          |
   * | ------------- | ------- | -------------------------------------------------------------------- |
   * | code          | 0 or 1   | 0 success 1 failed |
   * | msg           | string  | message                          |
   * | userMedia     | MediaStream | 获取的媒体信息                                                      |
   *
   *
   * @example
   * TCGSDK.switchCamera({status: 'open'});
   * TCGSDK.switchCamera({status: 'close'});
   * // 移动端打开后置摄像头
   * TCGSDK.switchCamera({ status: 'open', profile: { deviceId: 'environment' } });
   */
  switchCamera({
    status,
    profile,
  }: {
    status: 'open' | 'close';
    profile?: boolean | CameraProfileConstraints | CameraProfileType;
  }): Promise<{ code: 0 | 1; msg: string; userMedia: MediaStream }>;
  /**
   * @async
   *
   * @description 设置麦克风采集质量
   *
   * @param {MicProfileConstraints} profile - MicProfileConstraints 为 Object 具体如下
   * @param {number} [profile.sampleRate=44100] - 采样率 默认值 44100
   * @param {ConstrainBoolean} [profile.echoCancellation=true] - 回声消除 默认值 true
   * @param {ConstrainBoolean} [profile.noiseSuppression=true] - 降噪 默认值 true
   * @param {ConstrainBoolean} [profile.autoGainControl=true] - 增益 默认值 true
   * @param {string} [profile.deviceId] - input 的设备id，可以通过 getDevices 接口获取, 默认采用系统自选设备
   *
   * @returns {Promise<Object>} 结构如下
   *
   * | Response      | Type    | Description                                                          |
   * | ------------- | ------- | -------------------------------------------------------------------- |
   * | code          | 0 or 1   | 0 success 1 failed |
   * | msg           | string  | message                          |
   * | userMedia     | MediaStream | 获取的媒体信息                                                      |
   *
   * @example
   * TCGSDK.setMicProfile({sampleRate: 44100, echoCancellation: true, noiseSuppression: true, autoGainControl: true});
   */
  setMicProfile(profile: MicProfileConstraints): Promise<{ code: 0 | 1; msg: string; userMedia: MediaStream }>;
  /**
   * @async
   *
   * @description 设置摄像头采集质量
   *
   * @param {(CameraProfileType|CameraProfileConstraints)} profile CameraProfileType = "120p" | "180p" | "240p" | "360p" | "480p" | "720p" | "1080p"
   *
   * CameraProfileConstraints 为 Object 具体如下
   *
   * @param {number} [profile.width=1280] - 宽 默认值 1280
   * @param {number} [profile.height=720] - 高 默认值 720
   * @param {number} [profile.frameRate=30] - 帧率 默认值 30
   * @param {number} [profile.bitrate=1500] - 码率 1500 kbps
   * @param {string} [profile.deviceId] - input 的设备id，可以通过 getDevices 接口获取, 默认采用系统自选设备。移动端可传入 'user' | 'environment', 来区前置/后置摄像头
   *
   * @returns {Promise<Object>} 结构如下
   *
   * | Response      | Type    | Description                                                          |
   * | ------------- | ------- | -------------------------------------------------------------------- |
   * | code          | 0 or 1   | 0 success 1 failed |
   * | msg           | string  | message                          |
   * | userMedia     | MediaStream | 获取的媒体信息                                                      |
   *
   * @example
   * // 根据分辨率设置
   * TCGSDK.setCameraProfile('720p');
   * // 个性化设置
   * TCGSDK.setCameraProfile({width: '1920', height: '1080', frameRate: '60'});
   * // 移动端切换前后摄像头
   * TCGSDK.setCameraProfile({ deviceId: 'environment' });
   * TCGSDK.setCameraProfile({ deviceId: 'user' });
   *
   */
  setCameraProfile(
    profile: CameraProfileConstraints | CameraProfileType,
  ): Promise<{ code: 0 | 1; msg: string; userMedia: MediaStream }>;
  /**
   * 获取所有设备
   *
   * @async
   *
   * @returns {MediaDeviceInfo[]}
   */
  getDevices(): Promise<MediaDeviceInfo[]>;
  /**
   * 设置video 的旋转角度。
   *
   * *发现有时候客户会自己旋转屏幕，其实不建议。因为涉及到的坐标转换很复杂，SDK 内部已经处理。连同插件的旋转和数据处理都在SDK 内部做了。建议用该方法，或者直接在 Init 参数重配置自动旋转*
   *
   * @param {Object} param
   * @param {(0|90|270)} param.deg=0 - 旋转角度当前只支持 0/90，手游 0/270
   * @param {boolean} [param.rotateContainer=true] 是否旋转整个html 视图，默认值true
   * @param {boolean} [param.rotateMountPoint=false] 是否旋转mountPoint 节点，默认值false
   *
   * @example
   * // 旋转 HTML 文档
   * TCGSDK.setVideoOrientation({ deg: 90, rotateContainer: true });
   * // 旋转 MountPoint
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
   * 获取页面尺寸
   *
   * **可获取根据设备 window.devicePixelRatio 乘以固定比例保证显示画面分辨率足够清晰**
   *
   * @returns {Object} { width: number; height: number };
   *
   * @example
   * const {width, height} = TCGSDK.getPageSize();
   *
   */
  getPageSize(): { width: number; height: number };
  // -------------- 调试及日志相关接口 ------------
  /**
   * 打开或关闭调试模式，打开的情况下将在控制台打印日志。也可以通过 Init 参数设置。
   * @param {Object} param
   * @param {boolean} [param.showLog] - 打印SDK 所有日志
   * @param {boolean} [param.showStats] - 展示数据面板 webrtc 状态信息，否则需要按 CTRL+~ 快捷键显示。
   * @param {boolean} [param.showSendKmData] - 打印键盘/鼠标键入的消息
   * @param {boolean} [param.showSendAckData] - 打印发送的ACK message
   * @param {boolean} [param.showSendHbData] - 打印发送的Hb message
   * @param {boolean} [param.showOnHbMessage] - 打印心跳回包消息
   * @param {boolean} [param.showOnKmMessage] - 打印km回包消息
   * @param {boolean} [param.showOnAckMessage] - 打印ACK回包消息
   * @param {boolean} [param.showOnCdMessage] - 打印CD回包消息
   * @param {boolean} [param.showOnSvMessage] - 打印Sv回包消息
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
    showSendCloudDeviceData,
    showOnHbMessage,
    showOnKmMessage,
    showOnAckMessage,
    showOnCdMessage,
    showOnSvMessage,
    showOnCloudDeviceMessage,
    showLog,
  }: DebugSettingParams): void;
  /**
   * 上报日志
   *
   * @returns {Object}   { code: number; message: string } code=0 success code=-1 failed
   *
   */
  reportLog(): { code: number; message: string };
  /**
   * 设置日志回调函数，便于外部获取详细日志，作用与 init 时传的 onLog 回调一致。
   * @param {Function} handler
   */
  setLogHandler(handler: Function): void;
  /**
   * 性能数据上报开关
   */
  toggleMetricReportBulk(start: boolean): void;
  // -------------- 多人云游相关接口 ------------
  /**
   *
   * 获取对应玩家 音量
   *
   * @param {string} id 用户id
   */
  getPlayerVolume(id: string): number;
  /**
   *
   * 设置对应玩家 音量
   *
   * @param {string} id 用户id
   * @param {number} val 音量 [0-1]
   */
  setPlayerVolume(id: string, val: number): number;
  /**
   *
   * 获取所有坐席
   *
   * @returns {Promise<SeatsInfo>} 返回 Promise 对象。
   */
  getSeats(): Promise<SeatsInfo>;
  /**
   *
   * 申请切换角色或席位（非主机玩家），返回code及描述如下：
   * @param {Object} param
   * @param {string} param.user_id - 用户 id
   * @param {('viewer' | 'player')} param.to_role - 需要切换的角色
   * @param {number} param.seat_index - 座位号
   *
   * @returns {Promise<{code: number}>} 返回 Promise<{ code: number }>; Code 如下
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
   *
   * 只有主机玩家才能调用该接口，返回code及描述如下：
   *
   * @param {Object} param
   * @param {string} param.user_id - 用户 id
   * @param {('viewer' | 'player')} param.to_role - 需要切换的角色
   * @param {number} param.seat_index - 座位号
   *
   * @returns {Promise<{code: number}>} 返回 Promise<{ code: number }>; Code 如下
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
   *
   * 切换麦克风状态
   *
   * @param {Object} param
   * @param {string} param.status - 1：主动闭麦 2： 开麦
   * @param {string} param.user_id - 用户 id
   *
   * @returns {Promise<ChangeMicStatusResponse>} 返回 ChangeMicStatusResponse类型如下:
   *
   * | Response      | Type    | Description                                                          |
   * | ------------- | ------- | -------------------------------------------------------------------- |
   * | type          | string  | mic_status (0 ==> Success ; -2 ==> NoAuthorized ; -4 ==> NoSuchUser) |
   * | code          | number  | 0 ==> 管理员禁麦 ; 1 ==> 主动闭麦 ; 2 ==> 开麦                           |
   * | status        | number  | status （非必须）                                                      |
   * | user_id       | string  | user_id （非必须）                                                     |
   *
   */
  changeMicStatus(param: { status: number; user_id: string }): Promise<ChangeMicStatusResponse>;
}

// TCGSDK 是 CloudGamingWebSDK 的实例, 已经挂载在 window 上，可以直接使用
declare const TCGSDK: CloudGamingWebSDK;

export default TCGSDK;
