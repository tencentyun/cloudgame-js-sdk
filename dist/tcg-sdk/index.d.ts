interface OnNetworkChangeStatus {
  readonly bit_rate?: number; // 	客户端接收的码率，单位：Mbps
  readonly cpu?: number | string; // 	云端 CPU 占用率，单位：百分比
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
 */
export interface OnNetworkChangeResponse {
  readonly status:
    | 'online'
    | 'offline'
    | 'idle'
    | 'noflow'
    | 'noflowcenter'
    | 'stats'
    | 'jitter'
    | 'gamelaunched'
    | 'openurl'
    | 'latency';
  readonly times?: number;
  readonly stats?: OnNetworkChangeStatus;
  readonly data?: {
    code?: number;
    value?: number | string;
    message?: string;
    begin?: number;
    finish?: number;
  };
}
/**
 * code=-1 localOffer 无法获取H264 编码
 * code=0 Success
 */
export interface OnInitSuccessResponse {
  readonly code: number;
  readonly msg?: string;
  readonly description?: any;
}

export interface ServerSideDescriptionGameConfig {
  sdk_conf: {
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
  GameEncodePreset?: any;
  GameRunningInfo?: any;
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
export interface ServerSideDescription {
  readonly app_id?: number;
  readonly code: number;
  readonly msg?: string;
  readonly type?: string;
  readonly sdp?: string;
  readonly server_ip?: string;
  readonly server_version?: string;
  readonly region?: string;
  readonly instance_type?: string; // L1 S1 M1
  readonly message?: string;
  readonly request_id?: string;
  readonly user_id?: string;
  readonly input_seat?: number;
  readonly game_config?: ServerSideDescriptionGameConfig;
  readonly feature_switch?: ServerSideDescriptionFeatureSwitch;
  readonly role?: string;
  readonly metric_key?: string;
  readonly plat?: 'android' | 'pc';
  readonly sig_key?: string;
  readonly host_name?: string; // 只有手游有
  readonly screen_config?: {
    width: number;
    height: number;
    orientation: 'landscape' | 'portrait';
  };
}

/**
 * code=-2 创建local offer 失败，需要重新初始化
 * code=-1 需要重连，通常出现在码率掉0，收不到推流，连接超时，ice 断开，可以尝试重连
 * code=0	主动关闭
 * code=1	用户重复连接
 * code=2 用户心跳超时，webrtc服务端主动断开，这个消息有可能丢失
 */
export interface OnDisconnectResponse {
  readonly code: number;
  readonly msg: string;
}

/**
 * code=-2 自动重连中
 * code=-1 连接失败，触发了限频操作 5s，可稍后再连接
 * code=2 连接失败，token过期，需重新init + trylock
 * code=6 重连失败, SDP error，需重新init + trylock
 * code=8 重连失败, 等待主机连接，需重新init + trylock
 * code=9 重连失败, 超出玩家限制
 * code=100 重连失败, proxy error，需重新init + trylock
 */
export interface OnConnectFailedResponse {
  readonly code: number;
  readonly msg: string;
}

/**
 * seat_index 座位号，多人云游场景可能会用到
 * role 角色，多人云游场景可能会用到
 */
export interface OnConnectSuccessResponse {
  readonly code: number;
  readonly seat_index: number;
  readonly role: string;
}

/**
 * status 0 启动游戏成功 1 启动游戏失败
 */
export interface OnGameStartCompleteResponse {
  readonly request_id: string;
  readonly app_id: number;
  readonly user_id: string;
  readonly game_id: string;
  readonly status: number;
}

/**
 * name 存档最终文件名
 * url 存档下载地址
 * status 0: 加载存档成功 1: 下载存档失败 2: 校验存档失败 3: 解压存档失败 4: 其他错误 5: 下载中
 * category_id 分类标识
 * loaded_size 表示下载的字节数
 */
export interface OnLoadGameArchiveResponse {
  readonly user_id: string;
  readonly game_id: string;
  readonly name: string;
  readonly url: string;
  readonly status: number;
  readonly save_type: 'Auto' | 'Normal';
  readonly category_id: string;
  readonly archive_size: number;
  readonly loaded_size: number;
}

/**
 * name 存档最终文件名
 * url 存档下载地址
 * status 0: 存档保存成功 1: 存档保存失败 2: 存档压缩失败失败 3: 其他错误 4: 上传中
 * category_id 分类标识
 */
export interface OnSaveGameArchiveResponse {
  readonly user_id: string;
  readonly game_id: string;
  readonly name: string;
  readonly md5: string;
  readonly status: number;
  readonly save_type: 'Auto' | 'Normal';
  readonly category_id: string;
  readonly archive_size: number;
  readonly saved_size: number;
}
export interface OnInputStatusChangeResponse {
  readonly field_type: 'normal_input' | 'autologin_input' | 'unfocused';
  readonly status: 'disabled' | 'enabled';
}

export interface OnGamepadConnectChangeResponse {
  readonly status: 'gamepadconnect' | 'gamepaddisconnect';
  readonly index: number;
  readonly gamepad?: Gamepad;
}

export interface OnCursorShowStatChange {
  readonly oldStatus: boolean;
  readonly newStatus: boolean;
}

export interface OnCursorShowStatChangeResponse {
  readonly oldStatus: boolean;
  readonly newStatus: boolean;
}

export interface OnConfigurationChangeResponse {
  readonly screen_config: {
    width: number;
    height: number;
    orientation: 'landscape' | 'portrait';
  };
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

export type TouchType = 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel' | string;

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

export interface OnEventResponse {
  readonly type: 'autoplay';
  readonly data: any;
}
export interface DebugSettingParams {
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
  /**
   * 用户id
   */
  userid?: string;
}

interface InitConfigBase {
  /**
   * 0：关闭鼠标高频采样， 1:打开，但是打包发送， 2:拆开发送， 3: 限制包长度，多的丢掉
   * 默认值0
   */
  webDraftLevel?: number;
  /**
   * @deprecated from v1.0.4
   */
  preloadTime?: number;
  /**
   * 强制不lock cursor
   */
  forceShowCursor?: boolean;
  /**
   * 设置初始化背景图，web端container 的背景，非云端背景
   */
  bgImgUrl?: string;
  /**
   * 默认鼠标图片，默认值为 ''
   */
  defaultCursorImgUrl?: string;
}

export interface InitConfig extends InitConfigBase {
  /**
   * 页面挂载点的 HTML 元素 ID
   */
  mount: string;
  /**
   * 用户的腾讯云 APPID
   */
  appid: number;
  /**
   * 默认值为 true	隐藏腾讯云 Logo，true 为隐藏，false 为不隐藏。
   */
  showLogo?: boolean;
  /**
   * 是否开启本地麦克风，默认值为 false
   */
  mic?: boolean;
  /**
   * 默认值：false	true 为使用平板滑动鼠标模式，false 为绝对映射模式。该参数只针对移动端，PC 端忽略该参数。该mode 下鼠标产生相对位移。
   */
  tabletMode?: boolean;
  /**
   * mobileMode false	true 为使用接入手游，false 为适用端游
   */
  mobileGame?: boolean;
  /**
   * 手游启用VPX 编码
   */
  mobileVpx?: boolean;
  /**
   * 鼠标模式： 0 本地鼠标图片，1 云端下发鼠标图片，2 云端渲染
   */
  cursorMode?: number;
  /**
   * 默认值为 false	是否启动点击全屏操作，true 为启用，false为禁用。
   */
  clickToFullscreen?: boolean;
  /**
   * 默认值为 true 点击body 任意地方尝试播放video，true 为启用，false为禁用。
   */
  clickBodyToPlay?: boolean;
  /**
   * 用户操作空闲时间阈值，单位为秒，默认值：300s 空闲超过这个时间将触发 onNetworkChange 事件，消息为 {status: 'idle', times: 1}
   */
  idleThreshold?: number;
  /**
   * 默认值：false	断开的时候是否保留最后一帧画面，如果需要保留最后一帧画面并重连，不能再次调用 init 函数，而是先调用 destroy() 接口，再调用 start() 接口。
   * mac safari/ios webview 无法生效
   */
  keepLastFrame?: boolean;
  /**
   * 是否自动重连，默认值：false
   */
  reconnect?: boolean;
  /**
   * 是否显示加载中画面，默认值: true
   */
  showLoading?: boolean;
  /**
   * 加载中的文字提示内容，默认值：'正在启动云游戏'
   */
  loadingText?: string;
  /**
   * 当横竖屏切换时，是否自动旋转html节点适配，默认值：false
   * 该参数会旋转整个html
   */
  autoRotateContainer?: boolean;
  /**
   * 当横竖屏切换时，是否自动旋转挂载节点（mount）适配，默认值：false
   * 该参数会旋转挂载节点（mount）
   */
  autoRotateMountPoint?: boolean;
  /**
   * 当 mount挂载节点宽高大于云端推流分辨率时候
   * true 拉伸video 尺寸并采用短边适配
   * false 不拉伸video，保持原有云端分辨率
   */
  fullVideoToScreen?: boolean;
  /**
   * debugSetting 会在控制台打印出对应的日志 有如下配置
   */
  debugSetting?: DebugSettingParams;
  /**
   * 初始化完毕的回调，触发此回调之后才能调用后面的 API
   */
  onInitSuccess?: (response: OnInitSuccessResponse) => void;
  /**
   * 连接成功回调，调用 start 接口成功后才会触发(老版本)
   */
  onConnectSucc?: (response: OnConnectSuccessResponse) => void;
  /**
   * 连接成功回调，调用 start 接口成功后才会触发
   */
  onConnectSuccess?: (response: OnConnectSuccessResponse) => void;
  /**
   * 连接失败回调，调用 start 接口成功后才会触发
   */
  onConnectFail?: (response: OnConnectFailedResponse) => void;
  /**
   * 连接失败回调，调用 start 接口成功后才会触发
   */
  onConnectFailed?: (response: OnConnectFailedResponse) => void;
  /**
   * webrtc 状态回调，调用 start 接口成功后才会触发，设置这个回调后，如果 webrtc 请求返回错误
   */
  onWebrtcStat?: (response: ServerSideDescription) => void;
  /**
   * webrtc 状态回调，调用 start 接口成功后才会触发，设置这个回调后，如果 webrtc 请求返回错误
   */
  onWebrtcStatusChange?: (response: ServerSideDescription) => void;
  /**
   * webrtc 状态回调，调用 start 接口成功后才会触发，设置这个回调后，如果 webrtc 请求返回错误
   */
  onWebrtcStatChange?: (response: ServerSideDescription) => void;
  /**
   * 断开/被踢触发此回调，调用 start 接口成功后才会触发
   */
  onDisconnect?: (response: OnDisconnectResponse) => void;
  /**
   * 网络状态变化
   */
  onNetworkChange?: (response: OnNetworkChangeResponse) => void;
  /**
   * 移动端触摸事件回调，调用 start 接口成功后才会触发
   */
  onTouchEvent?: (response: OnTouchEventResponse[]) => void;
  /**
   * 游戏启动成功后的通知
   */
  onGameStartComplete?: (response: OnGameStartCompleteResponse) => void;
  /**
   * 游戏存档加载回调，会不断回调size
   */
  onLoadGameArchive?: (response: OnLoadGameArchiveResponse) => void;
  /**
   * 游戏保存存档回调
   */
  onSaveGameArchive?: (response: OnSaveGameArchiveResponse) => void;
  /**
   * 云端输入状态改变，有点击事件的时候都会触发，需要判断新旧状态(老版本)
   */
  onInputStatusChanged?: (oldStatus: boolean, newStatus: boolean) => void;
  /**
   * 云端输入状态改变，有点击事件的时候都会触发，需要判断新旧状态
   */
  onInputStatusChange?: (response: OnInputStatusChangeResponse) => void;
  /**
   * 手柄连接/断开事件回调
   */
  onGamepadConnectChange?: (response: OnGamepadConnectChangeResponse) => void;
  /**
   * 云端鼠标显示/隐藏，只在变化的时候回调(老版本)
   */
  onCursorShowStatChanged?: (oldStatus: boolean, newStatus: boolean) => void;
  /**
   * 云端鼠标显示/隐藏，只在变化的时候回调
   */
  onCursorShowStatChange?: (response: OnCursorShowStatChangeResponse) => void;
  /**
   * 屏幕方向变化事件回调
   */
  onOrientationChange?: (response: { type: 'portrait' | 'landscape' }) => void;
  /**
   * 云端config 发生变化时候回调
   */
  onConfigurationChange?: (response: OnConfigurationChangeResponse) => void;
  /**
   * 多人云游场景的回调函数，包括 user_state，seats_info
   */
  onMultiPlayerChange?: (response: OnMultiPlayerChangeResponse) => void;
  /**
   * 日志回调函数，用于外部获取日志，作用与 setLogHandler 接口一致
   */
  onLog?: (response: string) => void;
  /**
   * VMAF 测试的回调
   */
  onVmafChange?: (response: {
    status?: 'start_evaluation' | 'evaluation_completed';
    normal?: number;
    phone?: number;
    time?: number;
  }) => void;
  /**
   * 只针对移动端，双击屏幕回调
   */
  onDoubleTap?: (response: OnTouchEventResponse[]) => void;
  /**
   * 连接设备发生变化，需要通过 navigator.mediaDevices.enumerateDevices() 拿到可用设备
   */
  onDeviceChange?: (response: any) => void;
  /**
   * 获取 mic/camera 失败
   * msg 就是浏览器返回的 error.name
   * @param code number, 1 NotFoundError, 2 NotAllowedError
   */
  onGetUserMediaStatusChange?: ({
    code,
    msg,
  }: {
    code: number;
    msg: 'NotFoundError' | 'NotAllowedError' | string;
  }) => void;
  /**
   * 事件回调
   */
  onEvent?: (response: OnEventResponse) => void;
}

export type MouseEvent = 'mousedeltamove' | 'mousemove' | 'mouseleft' | 'mouseright' | 'mousescroll';

export type GamePadEvent =
  | 'gamepadconnect'
  | 'gamepaddisconnect'
  | 'gamepadkey'
  | 'axisleft'
  | 'axisright'
  | 'lt'
  | 'rt';

export type KeyBoardEvent = 'keyboard';

type RawEventType = MouseEvent | GamePadEvent | KeyBoardEvent;

interface RawEventData {
  type: RawEventType;
  x?: number;
  y?: number;
  /**
   * 是否为按下
   */
  down?: boolean;
  delta?: number;
  key?: number;
}

export declare interface CloudGamingWebSDKStatic {
  // -------------- 云游戏生命周期相关接口 ------------
  init(config?: InitConfig): void;
  /**
   * 获取初始化参数
   */
  getInitOptions(): InitConfig;
  /**
   * 获取 Client 端会话信息
   */
  getClientSession(): string;
  /**
   * 启动云游戏
   * @param serverSession 调用云API接口createSession 后返回的 serverSession
   */
  start(serverSession: string): void;
  /**
   * 立即停止云游戏
   */
  destroy(params: { message?: string; code?: number }): void;
  /**
   * 重连接口
   */
  reconnect(): void;
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
   * 辅助登录
   */
  loginHelper(
    params: { gameid?: string; acc: string; pwd: string },
    callback?: ({ code: number, finish: boolean, msg: string }) => void,
  ): void;
  /**
   * 获取当前窗口是否登录窗口
   */
  getLoginWindowStat(
    gameid: string,
    callback: ({
      code,
      data,
      msg,
    }: {
      code: number;
      data: {
        bottom: number;
        capslock: number;
        found: number;
        left: number;
        name: string;
        right: number;
        top: number;
      };
      msg: string;
    }) => void,
  ): void;
  /**
   * 聚焦输入框时快速发送内容
   * @param content 需要发送的内容
   */
  sendText(content: string): void;
  /**
   * 创建自定义dataChannel
   * @param destPort 目标端口
   * @param onMessage dataChannel 收到消息的回调函数
   */
  createCustomDataChannel({ destPort, onMessage }: { destPort: number; onMessage: (res: any) => void }): Promise<{
    code: number; // 0 success, 1 ack dataChannel 未创建成功，请重试, 2 该数据通道已经存在
    msg: string;
    sendMessage: (message: any) => void;
  }>;
  /**
   * 设置云端桌面分辨率 object param
   * @param width
   * @param height
   */
  setRemoteDesktopResolution({ width, height }: { width: number; height: number }): Promise<{
    code: number; // 0 | 1
  }>;
  /**
   * 获取视频流的分辨率
   */
  getRemoteStreamResolution(): { width: number; height: number };
  /**
   * 重新调整video 位置
   */
  reshapeWindow(): void;
  // -------------- 鼠标键盘控制相关接口 ------------
  /**
   * 发送键盘事件
   * 键盘的键位码 可通过 https://keycode.info/ 查询
   * 对于云手游常用按键keycode是:
      KEY_BACK = 158
      KEY_MENU = 139
      KEY_HOME = 172
   * @param key 
   * @param down 是否是按下状态(就想正常打字，通常是down/up组合)
   */
  sendKeyboardEvent({ key, down }: { key: number; down: boolean }): void;
  /**
   * 发送鼠标事件
   * @param param type: MouseEvent
   * @param down 是否是按下状态(就想正常打字，通常是down/up组合)
   */
  sendMouseEvent({ type, down }: { type: MouseEvent; down: boolean }): void;
  /**
   * 发送鼠标及键盘事件（底层实现）
   * @param params
   */
  sendRawEvent(params: RawEventData): void;
  /**
   * 设置鼠标移动灵敏度
   * @param value 取值范围：[0.01, 100.0]之间的浮点数
   */
  setMoveSensitivity(value: number): void;
  /**
   * 发送按键序列（底层实现）
   * @param params
   */
  sendSeqRawEvents(params: RawEventData[]): void;
  /**
   * 获取当前鼠标灵敏度值
   */
  getMoveSensitivity(): number;
  /**
   * 设置是否允许锁定鼠标
   * @param param 其中 true 为允许，false 为禁止。默认为 true。
   */
  setMouseCanLock(param: boolean): void;
  /**
   * @param identifier 触控点的 ID，多点触控时每个触控点 ID不能相等，同个触控点的所有事件的触控点 ID 必须一致
   * @param type 触控事件类型，值为touchstart、touchmove、touchend、touchcancel中的一个，对于同一个触控点，touchstart 必须且只对应一个 touchend 或 touchcancel
   * @param x 填写数字，触控点的 x 坐标，但是如果传浮点数，则按逻辑坐标处理
   * @param y 填写数字，触控点的 y 坐标，但是如果传浮点数，则按逻辑坐标处理
   */
  mouseMove(identifier: number, type: string, x: number, y: number): void;
  /**
   * 开启或关闭滑屏鼠标移动模式，通常对于鼠标相对位移方式
   * @param param true：打开，false：关闭
   */
  mouseTabletMode(param: boolean): void;
  /**
   * @param mode  目前支持三种鼠标样式：
                  mode=0：页面渲染的固定鼠标图片
                  mode=1：云端下发鼠标图片，由浏览器页面渲染
                  mode=2：云端画面内渲染鼠标图片，此时会隐藏本地渲染的鼠标，兼容性最好，但是有延时
   */
  setRemoteCursor(mode: 0 | 1 | 2 | number): void;
  /**
   * 设置鼠标隐藏或显示，但是云端下发的鼠标显隐可能会覆盖掉该设置
   * @param show
   */
  setCursorShowStat(show: boolean): void;
  /**
   * 获取云端鼠标隐藏状态
   */
  getCursorShowStat(): boolean;
  /**
   *
   * @param value 放大系数，默认是1.0，与云端大小一致，取值范围[0.1,10]
   */
  setMobileCursorScale(value: number): void;
  /**
   * 样式字符串，值为以下的值之一：
   * @param style standard：系统默认鼠标样式，较小 default_huge：系统超大鼠标样式，较大
   */
  setRemoteCursorStyle(style: 'standard' | 'default_huge'): void;
  /**
   * 重置云端所有按键状态，用于云端按键卡住的场景。
   */
  clearRemoteKeys(): void;
  /**
   * 重置云端大小写状态为小写。
   */
  resetRemoteCapsLock(): void;
  /**
   * 设置云游戏页面中鼠标默认图片。
   * @param url 鼠标图片
   */
  setDefaultCursorImage(url: string): void;
  /**
   * 设置鼠标/键盘的可用状态，针对PC 上，鼠标键盘的对应事件默认会被SDK 捕获然后发想云端
   * @param keyboard 键盘状态
   * @param mouse 鼠标状态
   */
  setKMStatus({ keyboard, mouse }: { keyboard: boolean; mouse: boolean }): { code: number };
  // -------------- 音视频控制相关接口 ------------
  /**
   * 设置码流参数，该接口为设置建议码流参数，云端可能会根据游戏动态调整
   * @param profile 目前可用参数如下：
                    fps：帧率，范围[10,60]，单位：帧
                    max_bitrate：最大码率，范围[1,15]，单位：Mbps
                    min_bitrate：最小码率，范围[1,15]，单位：Mbps
   * @param callback 设置结果回调函数，可为 null
   * @param retry 重试次数，可不填
   */
  setStreamProfile(profile: { fps: number; max_bitrate: number; min_bitrate: number }, callback?: Function): void;
  /**
   * 获取显示区域的参数，边距，宽高等。
   */
  getDisplayRect(): { left: number; top: number; width: number; height: number; pixelRatio: number };
  /**
   * @deprecated
   * 设置audio 音量
   * @param value number [0-1]
   */
  setVolume(value: number): void;
  /**
   * @deprecated
   * 获取audio 音量
   */
  getVolume(): number;
  /**
   * 获取对应玩家 音量
   * @param id 用户id
   */
  getPlayerVolume(id: string): number;
  /**
   * 获取audio 音量
   * @param id 用户id
   * @param val 音量 [0-1]
   */
  setPlayerVolume(id: string, val: number): number;
  /**
   * 设置video 音量
   * @param value number [0-1]
   */
  setVideoVolume(value: number): void;
  /**
   * 获取video 音量
   */
  getVideoVolume(): number;
  /**
   * 设置云游戏页面的背景图。
   * 注意，这里设置的是前端container 的背景图，不是云端的背景图，云端背景图通过createSession 设置
   * @param url 背景图片
   */
  setPageBackground(url: string): void;
  /**
   * 设置是否全屏
   * @param fullscreen 是全屏还是退出全屏
   * @param element 需要操作的节点
   */
  setFullscreen(fullscreen: boolean, element?: HTMLElement): void;
  /**
   * 获取是否全屏
   */
  getFullscreen(): boolean;
  /**
   * 播放视频
   */
  playVideo(status: 'play' | 'pause'): void;
  /**
   * 播放音频
   */
  playAudio(status: 'play' | 'pause'): void;
  /**
   * 设置video 的旋转角度
   * @param deg 旋转角度当前只支持0/90，手游0/270
   * @param rotateContainer 是否旋转整个html试图 UI，默认值true
   * @param rotateMountPoint 是否旋转mountPoint 节点，默认值false
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
  // -------------- 调试及日志相关接口 ------------
  /**
   * 打开或关闭调试模式，打开的情况下将在控制台打印日志。
   * object param
   * @param enable 打开日志和状态，true 为打开，false 为隐藏
   * @param userid 用户的 ID，主要是用于过滤日志
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
    userid,
  }: DebugSettingParams): void;
  /**
   * 上报日志
   * code=0 success
   * code=-1 failed
   */
  reportLog(): { code: number; message: string };
  /**
   * 设置日志回调函数，便于外部获取详细日志，作用与 init 时传的 onLog 回调一致。
   * @param handler
   */
  setLogHandler(handler: Function): void;
  /**
   * 性能数据上报开关
   */
  toggleMetricReportBulk(start: boolean): void;
  // -------------- 多人云游相关接口 ------------
  /**
   * 获取所有坐席
   */
  getSeats(): Promise<SeatsInfo>;
  /**
   * 申请切换角色或席位（非主机玩家）
   * 返回code 如下
   * 0: Success
   * -1: InvalidSeatIndex
   * -2: NoAuthorized
   * -3: NoSuchRole
   * -4: NoSuchUser
   * -5: AssignSeatFailed
   * -6: JsonParseFailed
   * -7: IgnoredHostSubmit
   */
  submitSeatChange({ user_id, to_role, seat_index }: SeatChangeInfo): Promise<{ code: number }>;
  /**
   * 只有主机玩家才能调用该接口
   * 返回code 如下
   * 0: Success
   * -1: InvalidSeatIndex
   * -2: NoAuthorized
   * -3: NoSuchRole
   * -4: NoSuchUser
   * -5: AssignSeatFailed
   * -6: JsonParseFailed
   * -7: IgnoredHostSubmit
   */
  seatChange({ user_id, to_role, seat_index }: SeatChangeInfo): Promise<{ code: number }>;
  /**
   *
   * @param status number, 0 管理员禁麦，此时只能管理员修改；1 自己主动禁麦，自己可以再次开启；2 开麦
   * @param user_id string 用户id
   */
  changeMicStatus({ status, user_id }: { status: number; user_id: string }): Promise<ChangeMicStatusResponse>;
}

declare const TCGSDK: CloudGamingWebSDKStatic;
export default TCGSDK;
