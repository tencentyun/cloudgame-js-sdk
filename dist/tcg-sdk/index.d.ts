/* eslint-disable camelcase */
interface onNetworkChangeStatus {
  bit_rate?: number;                   // 	客户端接收的码率，单位：Mbps
  cpu?: number | string;                        // 	云端 CPU 占用率，单位：百分比
  delay?: number;                      // 	客户端收到图像帧到解码显示的延时，单位：ms
  fps?: number;                        // 	客户端显示帧率
  load_cost_time?: number;             //	云端加载时长，单位：ms
  nack?: number;                       // 	客户端重传次数
  packet_lost?: number;                // 	客户端丢包次数
  packet_received?: number;            // 	客户端收到的包总数
  rtt?: number;                        //	客户端到云端，网络端数据包往返耗时
  timestamp?: number;                  //	此数据回调的时间戳，单位：ms
}

export interface OnNetworkChangeResponse {
  status: 'online' | 'offline' | 'lag' | 'idle' | 'ipchanged' | 'noflow' | 'noflowcenter' | 'stats' | 'jitter' | 'gamelaunched' | 'userstate' | 'openurl';
  times?: number;
  stats?: onNetworkChangeStatus;
  value?: any;
  data?: any;
  prevIP?: string;
  newIP?: string;
}

export interface OnInitSuccessResponse {
  code: number;
  msg: string;
  description?: RTCSessionDescription
}

export interface RemoteGameConfig {
  sdk_conf: {
    login_helper?: any;
    virtual_keys?: any;
    user_keys?: any;
    cursor_mode?: number;
    webdraft_level?: number;
    connect_timeout?: number;
    noflow_timeout?: number;
    cursor_scale?: number;
    cursor_style?: 'standard' | 'default_huge'
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

/**
 * code=0	请求正常
 * code=1	系统繁忙
 * code=2	票据不合法
 * code=3	用户带宽不足
 * code=4	资源不足，没有可用机器
 * code=5	session 失效，需要重新登录
 * code=6	媒体描述信息错误
 * code=7	游戏拉起失败
 */
export interface OnWebrtcStatusChangeResponse {
  readonly code: number;
  readonly msg?: string;
  readonly type?: string;
  readonly sdp?: string;
  readonly server_ip?: string;
  readonly server_version?: string;
  readonly region?: string;
  readonly instance_type?: string;          // L1 S1 M1
  readonly message?: string;
  readonly request_id?: string;
  readonly user_id?: string;
  readonly input_seat?: number;
  readonly game_config?: RemoteGameConfig;
  readonly role?: string;
}

/**
 * code=-1 需要重连
 * code=0	手动关闭
 * code=1	被其他连接踢掉
 * code=2 重连失败(针对自动和手动重连情况)
 * code=2 重连失败, token 过期(调用重连接口也连不上了)
 */
export interface OnDisconnectResponse {
  readonly code: number;
  readonly msg: string;
}

/**
 * code=1 频繁连接，12s内限频
 * code=2 自动重连中
 */
export interface OnConnectFailResponse {
  readonly code: number;
  readonly msg: string;
}

/**
 * index 座位号
 * seat_index 座位号
 * role 角色
 */
export interface OnConnectSuccessResponse {
  readonly code: number;
  readonly index: number;
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
  readonly oldStatus: boolean;
  readonly newStatus: boolean;
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
   * 云端鼠标是否隐藏，true 为显示，false 为隐藏
   */
  readonly cursorShow: boolean;
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

export enum CURSOR_MODE {
  LOCAL = 0,           // 前端绘制固定鼠标
  REMOTE_SRC = 1,      // 云端鼠标数据下发鼠标图片，前端动态绘制
  REMOTE_DRAW = 2,     // 云端画面内绘制，前端鼠标隐藏
  REMOTE_CUSTOM = 3,   // 废弃 云端自定义鼠标（非系统），前端全局发送deltaMove
  REMOTE_SRC_POS = 4,  // 云端鼠标图片数据和坐标下发，前端全局发送deltaMove，网页锁定鼠标并使用DIV绘制鼠标，对云端而言，等价于mode=1，额外加上鼠标坐标下发
}

interface InitConfigBase {
  webDraftLevel?: number;
  preloadTime?: number;    // deprecated from 1.0.4
  forceShowCursor?: boolean;
  cursorMode?: CURSOR_MODE;
  bgImgUrl?: string;
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
   * 认值为 false	开启本地麦克风，true 为开启，false 为关闭。默
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
   * 默认值为 false	是否启动点击全屏操作，true 为启用，false为禁用。
   */
  clickToFullscreen?: boolean;
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
   * 当横竖屏切换时，是否自动旋转适配，默认值：false
   */
  autoRotateContainer?: boolean;
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
  onConnectFail?: (response: OnConnectFailResponse) => void;
  /**
   * webrtc 状态回调，调用 start 接口成功后才会触发，设置这个回调后，如果 webrtc 请求返回错误，SDK 不再自动弹出默认自带的错误提示框
   */
  onWebrtcStat?: (response: OnWebrtcStatusChangeResponse) => void;
  /**
   * webrtc 状态回调，调用 start 接口成功后才会触发，设置这个回调后，如果 webrtc 请求返回错误，SDK 不再自动弹出默认自带的错误提示框
   */
  onWebrtcStatusChange?: (response: OnWebrtcStatusChangeResponse) => void;
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
  onOrientationChange?: (response: {type: 'portrait' | 'landscape'}) => void;
  /**
   * 日志回调函数，用于外部获取日志，作用与 setLogHandler 接口一致
   */
  onLog?: (response: string) => void;
}

type RawEventType = 'mousedeltamove' | 'mousemove' | 'mouseleft' | 'mouseright' | 'mousescroll' | 'keyboard'
| 'gamepadconnect' | 'gamepaddisconnect' | 'gamepadkey' | 'axisleft' | 'axisright' | 'lt' | 'rt';
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
  getInitOptions(): InitConfig;
  getClientSession(): string;
  start(serverSession: string): void;
  destroy(params: { message?: string, code?: number }): void;
  reconnect(): void;
  // -------------- 游戏进程相关接口 ------------
  gameRestart(callback?: Function, retry?: number): void;
  gamePause(callback?: Function, retry?: number): void;
  gameResume(callback?: Function, retry?: number): void;
  loginHelper(params: {gameid?: string; acc: string; pwd: string}, callback?: ({ code: number, finish: boolean, msg: string }) => void): void;
  getLoginWindowStat(gameid: string, callback: ({ code, data, msg }: {
    code: number,
    data: {
      bottom: number;
      capslock: number;
      found: number;
      left: number;
      name: string;
      right: number;
      top: number
    },
    msg: string
  }) => void): void;
  sendText(content: string): void;
  /**
   * 设置是否全屏
   * @param fullscreen 是全屏还是退出全屏
   * @param element 需要操作的节点
   */
  /**
   * 创建自定义dataChannel
   * @param destPort 目标端口
   * @param onMessage dataChannel 收到消息的回调函数
   */
  createCustomDataChannel({ destPort, onMessage }: { destPort: number; onMessage: (res: any) => void}): Promise<{
    code: number;       // 0 success, 1 ack dataChannel 未创建成功，请重试, 2 该数据通道已经存在
    msg: string;
    sendMessage: (message: any) => void;
  }>
  /**
   * 设置云端桌面分辨率 object param
   * @param width
   * @param height
   */
  setRemoteDesktopResolution({ width, height }: {width: number; height: number}): Promise<{
    code: number;       // 0 | 1
  }>
  /**
   * 重新调整video 位置
   */
  reshapeWindow(): void;
  // -------------- 鼠标键盘控制相关接口 ------------
  sendKeyboardEvent(params: {key: number; down: boolean}): void;
  sendRawEvent(params: RawEventData): void;
  /**
   * @param value 取值范围：[0.01, 100.0]之间的浮点数
   */
  setMoveSensitivity(value: number): void;
  sendSeqRawEvents(params: RawEventData[]): void;
  getMoveSensitivity(): number;
  setMouseCanLock(param: boolean): void;
  /**
   * @param identifier 触控点的 ID，多点触控时每个触控点 ID不能相等，同个触控点的所有事件的触控点 ID 必须一致
   * @param type 触控事件类型，值为touchstart、touchmove、touchend、touchcancel中的一个，对于同一个触控点，touchstart 必须且只对应一个 touchend 或 touchcancel
   * @param x 填写数字，触控点的 x 坐标，但是如果传浮点数，则按逻辑坐标处理
   * @param y 填写数字，触控点的 y 坐标，但是如果传浮点数，则按逻辑坐标处理
   */
  mouseMove(identifier: number, type: string, x: number, y: number): void;
  mouseTabletMode(param: boolean): void;
  /**
   * @param mode  目前支持三种鼠标样式：
                  mode=0：页面渲染的固定鼠标图片
                  mode=1：云端下发鼠标图片，由浏览器页面渲染
                  mode=2：云端画面内渲染鼠标图片，此时会隐藏本地渲染的鼠标，兼容性最好，但是有延时
   */
  setRemoteCursor(mode: 0 | 1 | 2 | number): void;
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
  clearRemoteKeys(): void;
  resetRemoteCapsLock(): void;
  setDefaultCursorImage(url: string): void;
  /**
   *
   * @param profile 目前可用参数如下：
                    fps：帧率，范围[10,60]，单位：帧
                    max_bitrate：最大码率，范围[1,15]，单位：Mbps
                    min_bitrate：最小码率，范围[1,15]，单位：Mbps
   * @param callback 设置结果回调函数，可为 null
   * @param retry 重试次数，可不填
   */
  setStreamProfile(profile: {fps: number; max_bitrate: number; min_bitrate: number}, callback?: Function, retry?: number): void;
  getDisplayRect(): {left: number; top: number; width: number; height: number; pixelRatio: number}
  /**
   * 设置audio 音量
   * @param value number [0-1]
   */
  setVolume(value: number): void;
  /**
   * 获取audio 音量
   */
  getVolume(): number;
  /**
   * 设置video 音量
   * @param value number [0-1]
   */
  setVideoVolume(value: number): void;
  /**
   * 获取video 音量
   */
  getVideoVolume(): number;
  setPageBackground(url: string): void;
  /**
   * 聚焦输入框时，快速发送内容
   */
  setFullscreen(fullscreen: boolean, element?: HTMLElement): void;
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
   * @param deg 旋转角度当前只支持0/90
   * @param rotateContainer 是否旋转这个试图 UI
   */
  setVideoOrientation(deg: number, rotateContainer?: boolean): void;
  /**
   * 是否拉起键盘-alpha 目前大小写切换有问题，仅支持全键盘（不建议使用），可采用loginHelper 替代
   * @param show  boolean, 是否拉起键盘
   */
  showKeyboard(show: boolean): void;
  // -------------- 调试及日志相关接口 ------------
  /**
   * 打开或关闭调试模式，打开的情况下将在控制台打印日志。
   * object param
   * @param enable 打开日志和状态，true 为打开，false 为隐藏
   * @param userid 用户的 ID，主要是用于过滤日志
   */
  setDebugMode({ showStats, showSendKmData, showSendAckData, showSendHbData, showOnHbMessage, showOnKmMessage, showOnAckMessage, showOnCdMessage, showOnSvMessage, showLog, userid }: DebugSettingParams): void;
  reportLog(): void;
  setLogHandler(handler: Function): void;
  /**
   * 性能数据上报开关
   */
  toggleMetricReportBulk(start: boolean): void;
}


declare const TCGSDK: CloudGamingWebSDKStatic;
export default TCGSDK;


