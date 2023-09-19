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
 * code=-3 超出重试次数，需重新init + createSession
 * code=-2 自动重连中
 * code=-1 连接失败，触发了限频操作 5s，可稍后再连接
 * code > 0 Proxy 返回的重连错误，通常连不上，需重新init + createSession
 * @ignore
 */
export interface OnConnectFailedResponse extends BaseResponse {}

export interface OnConnectSuccessResponse {
  readonly code: number;
  readonly seat_index: number; // 座位号，多人云游场景可能会用到
  readonly role: string; // 角色，多人云游场景可能会用到
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
  readonly timestamp?: number; //	此数据回调的时间戳，单位：ms
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
    notify_threshold?: number; // 表示异常情况持续多少次，促发异常回调
  };
}

export interface ServerSideDescription {
  readonly app_id: number;
  readonly game_id: string;
  readonly group_id: string;
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
  readonly host_name: string; // 只有手游有
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
   * Proxy 返回的 webrtc 结构体
   */
  readonly WebrtcResponse?: {
    Code: number;
    Msg: string;
    Sdp: string;
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
    orientation: 'landscape' | 'portrait';
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

export type OnEventResponse =
  | OnEventAutoplayResponse
  | OnEventIdleResponse
  | OnEventOpenUrlResponse
  | OnEventWebrtcStatsResponse
  | OnEventNoflowResponse
  | OnEventNoflowcenterResponse
  | OnEventLatencyResponse
  | OnEventPointerLockErrorResponse
  | OnEventReadClipboardErrorResponse;

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
  | 'mousedeltamove_v2';

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
   * true 为使用平板滑动鼠标模式，false 为绝对映射模式。该参数只针对移动端，PC 端忽略该参数。该 mode 下鼠标产生相对位移。
   *
   * @default false
   */
  tabletMode?: boolean;
  /**
   * true 为使用接入手游，false 为适用端游
   *
   * @default false
   */
  mobileGame?: boolean;
  /**
   * 手游启用VPX 编码
   *
   * @default false
   */
  mobileVpx?: boolean;
  /**
   * 鼠标模式： 0 本地鼠标图片，1 云端下发鼠标图片，2 云端渲染
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
   * 用户操作空闲时间阈值，单位为秒，默认值：300s 空闲超过这个时间将触发 onNetworkChange 事件，消息为 {status: 'idle', times: 1}
   *
   * @default 300
   */
  idleThreshold?: number;
  /**
   * 断开的时候是否保留最后一帧画面，如果需要保留最后一帧画面并重连，不能再次调用 init 函数，而是先调用 destroy() 接口，再调用 start() 接口。
   *
   * mac safari/ios webview 无法生效
   *
   * @default false
   */
  keepLastFrame?: boolean;
  /**
   * 是否自动重连，会在弱网，或帧率持续掉 0所导致的断连时，主动重连
   *
   * 重连策略：每5秒尝试一次，最多重连5次
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
   * @default false
   */
  autoRotateContainer?: boolean;
  /**
   * 当横竖屏切换时，是否自动旋转挂载节点（mount）适配，**该参数会旋转挂载节点（mount）**
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
   * debugSetting 会在控制台打印出对应的日志 有如下配置
   */
  debugSetting?: DebugSettingParams;
  /**
   * 0：关闭鼠标高频采样， 1:打开，但是打包发送， 2:拆开发送， 3: 限制包长度，多的丢掉
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
   * 默认鼠标图片 https/http 地址，不传默认展示一个宽高 3px 的圆形小点，传 ''，不展示。
   */
  defaultCursorImgUrl?: string;
  /**
   * 云上应用交互模式，支持鼠标 或者 触摸
   *
   * **该参数建议移动端使用，PC 端设置该参数会导致鼠标锁定**
   *
   * @default 'cursor'
   */
  clientInteractMode?: 'cursor' | 'touch';
  /**
   * 劫持键盘 Ctrl+v/Cmd+v，当用户使用粘贴功能时候，直接将本地剪切板内容发送给云端
   *
   * **该接口适用PC 端，通常在云端 input 框 focus 时候使用**
   *
   * @default false
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
   * 初始化完毕的回调，触发此回调之后才能调用后面的 API
   *
   * CreateSession 需要在该回调成功后进行;
   *
   * @function
   * @param {Object} response - OnInitSuccess 回调函数的 response
   * @param {number} response.code  code=-1 localOffer 无法获取H264 编码 code=0 Success
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
   * 连接失败回调，调用 start 接口成功后才会触发
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
   * | 225     | 设备不支持webrtc               |
   * @param {string} response.msg - message
   */
  onWebrtcStatusChange?: (response: OnWebrtcStatusChangeResponse) => void;
  /**
   * 断开/被踢触发此回调，调用 start 接口成功后才会触发
   *
   * 如果开启自动重连即init 参数 reconnect: true，点开连接也会调用此回调，可根据对应code 判断是否需要刷新页面(window.location.reload())
   *
   * @function
   * @param {Object} response - onDisconnect 回调函数的 response
   * @param {number} response.code
   * code 详情如下：
   * | code    | Description                                                     |
   * | ------- | --------------------------------------------------------------- |
   * | -2      | 创建local offer 失败，需要重新init + createSession                       |
   * | -1      | 需要重连，通常出现在码率掉0，收不到推流，连接超时，ice 断开，可以尝试重连  |
   * | 0       | 主动关闭                                                         |
   * | 1       | 用户重复连接                                                      |
   * | 2       | 用户心跳超时，webrtc服务端主动断开，这个消息有可能丢失 init + createSession   |
   * @param {string} response.msg - message
   *
   * @description
   * 当出现 -1 时候，如果设置了 init 参数 `reconnect: true`（默认值 true） 不用任何操作，SDK 会主动重连，未设置需要调用 TCGSDK.reconnect()
   * 如果持续链接不上，可以看回调 onConnectFail 相关错误嘛，在里面完善相关逻辑
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
   *   // 针对双指缩放操作，这里双指模拟了PC 的鼠标滚轮事件
   *   if (res.length === 2) {
   *     const [{ pageX: oneX, pageY: oneY }, { pageX: twoX, pageY: twoY }] = res;
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
   * @param {number} response.code - 0 Success；1 NotFoundError；2 NotAllowedError
   * @param {string} response.msg - 'NotFoundError' | 'NotAllowedError' | string;
   * @param {MediaStream} response.userMedia - 屏幕方向
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
   * 事件回调
   *
   * 目前主要用于自动播放是否成功回调
   *
   * @function
   * @param {Object} response - onEvent 回调函数的 response
   * @param {string} response.type - 对应类型 'autoplay' | 'idle' | 'noflow' | 'noflowcenter' | 'webrtc_stats' | 'openurl' | 'latency' | 'pointerlockerror' | 'readclipboarderror'
   * @param {any} response.data - 根据对应 code 判断
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
  /**
   * 日志回调函数，用于外部获取日志，作用与 setLogHandler 接口一致
   *
   * @function
   * @param {string} response
   */
  onLog?: (response: string) => void;
}

/**
 * 云渲染JSSDK（TCGSDK），用于云渲染 PaaS 应用的开发。TCGSDK export 为单例，采用注册回调方式，并提供了包括鼠标键盘控制，音视频控制，游戏进程控制相关接口，接口详情请参考下列说明。
 * @hideconstructor
 */
export class TCGSDK {
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
  // -------------- 游戏进程相关接口 ------------
  /**
   * 重启当前运行的游戏进程
   */
  gameRestart(callback?: Function): void;
  /**
   * 暂停当前运行的游戏进程
   */
  gamePause(callback?: Function): void;
  /**
   * 恢复运行当前运行的游戏进程
   */
  gameResume(callback?: Function): void;
  /**
   * **聚焦输入框时**快速发送内容
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
  // -------------- 数据通道/媒体数据相关接口 ------------
  /**
   * @async
   *
   * @description 创建自定义dataChannel，建议在onConnectSuccess 回调中使用，请求参数具体如下:
   *
   * **建议在 onConnectSuccess 内调用**
   *
   * @param {Object} param
   * @param {number} param.destPort - 目标端口
   * @param {string} [param.protocol='text'] - 'text' | 'binary'，指定云端回复(onMessage 方法内收到的)数据类型
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
  createCustomDataChannel({
    destPort,
    onMessage,
    protocol,
  }: {
    destPort: number;
    onMessage: (res: any) => void;
    protocol?: 'text' | 'binary';
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

• 按键事件值：X 键值为0x4000，Y 键值为0x8000，A 键值为0x1000, B键值为0x2000

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
   * 发送鼠标及键盘事件（底层实现 ACK 通道）
   * @param {RawEventData} params - 底层原始数据类型，可用于鼠标/键盘/手柄消息的发送
   */
  sendRawEvent(params: RawEventData): void;
  /**
   * @deprecated
   *
   * 发送按键序列（底层实现）
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
   * 设置是否允许锁定鼠标
   * @param {boolean} param=true - 其中 true 为允许，false 为禁止。默认为 true。
   */
  setMouseCanLock(param: boolean): void;
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
   * mode=0：页面渲染的固定鼠标图片
   *
   * mode=1：云端下发鼠标图片，由浏览器页面渲染
   *
   * mode=2：云端画面内渲染鼠标图片，此时会隐藏本地渲染的鼠标，兼容性最好，但是有延时
   *
   */
  setRemoteCursor(mode: 0 | 1 | 2 | number): void;
  /**
   * 设置鼠标隐藏或显示，但是云端下发的鼠标显隐可能会覆盖掉该设置
   * @param {boolean} show
   */
  setCursorShowStat(show: boolean): void;
  /**
   * 获取云端鼠标隐藏状态，true｜false
   */
  getCursorShowStat(): boolean;
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
   * 设置是否劫持 Ctrl+v/Cmd+v，当用户使用粘贴功能时候，直接将本地剪切板内容发送给云端
   *
   * **该方法PC 端适用，通常在云端 input 框 focus 时候使用**
   */
  setPaste(enable: boolean): void;
  // -------------- 音视频控制相关接口 ------------
  /**
   * 设置码流参数，该接口为设置建议码流参数，云端可能会根据游戏动态调整
   *
   * **如果CreateSession 参数中设置了 MinBitrate/MaxBitrate，参数 min_bitrate/max_bitrate 必须在前者设置范围内**
   *
   * @param {Object} profile 目前可用参数如下：
   * @param {number} profile.fps - 帧率，范围[10,60]
   * @param {number} profile.max_bitrate - 最大码率，范围[1,15]，单位：Mbps
   * @param {number} profile.min_bitrate - 最小码率，范围[1,15]，单位：Mbps
   * @param {Function} [callback] 设置结果回调函数，可为 null
   *
   * @example
   * TCGSDK.setStreamProfile({ fps: 60, max_bitrate: 8, min_bitrate: 5 });
   */
  setStreamProfile(profile: { fps: number; max_bitrate: number; min_bitrate: number }, callback?: Function): void;
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
   * 获取video 音量
   */
  getVideoVolume(): number;
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
   *
   * @example
   * TCGSDK.switchMic({status: 'open'});
   */
  switchMic({ status }: { status: 'open' | 'close' }): void;
  /**
   * 开关摄像头
   * @param {Object} param
   * @param {('open'|'close')} param.status - 开关状态
   *
   * @example
   * TCGSDK.switchCamera({status: 'open'});
   */
  switchCamera({ status }: { status: 'open' | 'close' }): void;
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
   * @example
   * TCGSDK.setMicProfile({sampleRate: 44100, echoCancellation: true, noiseSuppression: true, autoGainControl: true});
   */
  setMicProfile(profile: MicProfileConstraints): Promise<void>;
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
   * @example
   * // 根据分辨率设置
   * TCGSDK.setCameraProfile('720p');
   * // 个性化设置
   * TCGSDK.setCameraProfile({width: '1920', height: '1080', frameRate: '60', bitrate: 2000});
   *
   */
  setCameraProfile(profile: CameraProfileConstraints | CameraProfileType): Promise<void>;
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
    showOnHbMessage,
    showOnKmMessage,
    showOnAckMessage,
    showOnCdMessage,
    showOnSvMessage,
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

declare const TCGSDKStatic: TCGSDK;

export default TCGSDKStatic;
