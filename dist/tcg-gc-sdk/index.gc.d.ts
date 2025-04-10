import { InitConfig, CloudGamingWebSDK } from '.';

/**
 * TCGSDK InitConfig 相关配置，对应TCGSDK 中的 init 方法的。
 */
export interface GCInitConfig extends InitConfig {
  /**
   * 需要控制的 instanceId 列表
   *
   * **默认会将 instanceIds 的第 0 位设置为 master**
   *
   */
  instanceIds?: string[];
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
}

export type OnImageEventResponse = OnImageEventScreenshotResponse;

export type OnImageEventScreenshotResponse = {
  type: 'screenshot';
  data: {
    instanceId: string;
    url: string;
  }[];
};

/**
 * 批量任务的 response
 *
 */
export type BatchTaskResponse = {
  /**
   * Task 结果
   * Code 为 0 表示成功，其他值表示失败
   *
   * Code: 10001, Msg: "invalid param"
   * Code: 10002, Msg: "invalid token"
   * Code: 10003, Msg: "invalid operate"
   *
   */
  Code: number;
  Message: string;
  /**
   * 每个设备成功的 response
   *
   * Code 为 0 表示成功，其他值表示失败
   */
  SuccessResult: {
    [InstanceId: string]: {
      Code: number;
      Msg: string;
    };
  };
  /**
   * 每个设备失败的 response
   */
  FailResult: {
    [InstanceId: string]: {
      Code: number;
      Msg: string;
    };
  };
};

/**
 * 云渲染 CloudGamingGroupControlWebSDK（TCGGCSDK），用于云渲染 PaaS 应用的开发。该SDK extends from TCGSDK，上层封装了 Group Control 相关方法，底层接口也同时适用，可参考 CloudGamingWebSDK 。
 *
 * @class
 *
 */
export class CloudGamingGroupControlWebSDK extends CloudGamingWebSDK {
  constructor();
  /**
   * @param {GCInitConfig} config - 初始化配置
   */
  init(config?: GCInitConfig): void;
  /**
   * 启动云渲染
   *
   *
   * @param {string} serverSession 调用对应的云API 获取的 ServerSession
   *
   * @example
   * TCGGCSDK.start(serverSession);
   *
   */
  start(serverSession: string): void;
  /**
   * 设置 master
   *
   * @param {Object} params
   * @param {string} params.instanceId - master的 instanceId
   *
   * @example
   * TCGGCSDK.setMaster({instanceId: 'cai-xxx1'});
   *
   */
  setMaster({ instanceId }: { instanceId: string }): void;
  /**
   * 开始同步，根据设置的 instanceIds 进行同步
   *
   * @default 全量同步
   *
   * @param {Object} params
   * @param {Array} params.instanceIds - string[] 需要同步的设备列表
   *
   * @example
   * TCGGCSDK.startSync({instanceIds: ['cai-xxx1', 'cai-xxx2']});
   *
   */
  startSync({ instanceIds }: { instanceIds?: string[] }): void;
  /**
   * 停止同步（全量）
   */
  stopSync(): void;
  /**
   * 设置设备 GPS 信息
   *
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value
   * @param {number} params.value.Longitude
   * @param {number} params.value.Latitude
   *
   * @example
   * TCGGCSDK.setLocation({'cai-xxx1': {Longitude: 113.32412, Latitude: 23.124124}, 'cai-xxx2': {Longitude: 114.32412, Latitude: 24.124124}})
   *
   */
  setLocation(params: { [InstanceId: string]: { Longitude: number; Latitude: number } }): Promise<BatchTaskResponse>;
  /**
   * 设置设备 Resolution
   *
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value
   * @param {number} params.value.Width
   * @param {number} params.value.Height
   * @param {number} params.value.DPI
   *
   * @example
   * TCGGCSDK.setResolution({'cai-xxx1': {Width: 720, Height: 1080}, {'cai-xxx2': {Width: 720, Height: 1080}})
   */
  setResolution(params: {
    [InstanceId: string]: { Width: number; Height: number; DPI?: number };
  }): Promise<BatchTaskResponse>;
  /**
   * 往设备粘贴文本
   *
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value
   * @param {string} params.value.Text - 要粘贴的文本
   *
   * @example
   * TCGGCSDK.paste({'cai-xxx1': {Text: 'abc'}, {'cai-xxx2': {Text: '123'}})
   */
  paste(params: { [InstanceId: string]: { Text: string } }): Promise<BatchTaskResponse>;
  /**
   * 发送文本到剪切板
   *
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value
   * @param {string} params.value.Text - 要发送的内容
   *
   * @example
   * TCGGCSDK.sendClipboard({'cai-xxx1': {Text: 'abc'}, {'cai-xxx2': {Text: '123'}})
   */
  sendClipboard(params: { [InstanceId: string]: { Text: string } }): Promise<BatchTaskResponse>;
  /**
   * 摇一摇
   *
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value 暂时传空对象 {}
   *
   * @example
   * TCGGCSDK.shake({'cai-xxx1': {}, {'cai-xxx2': {}})
   */
  shake(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * 设置设备传感器信息
   *
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value
   * @param {'accelerometer' | 'gyroscope'} params.value.Type - 传感器leasing accelerometer（加速器），gyroscope（陀螺仪）
   * @param {string[]} params.value.Values - 传感器对应的值，数组长度为 3，分辨表示 x/y/z 轴的值
   *
   * @example
   * TCGGCSDK.setSensor({'cai-xxx1': {Type: 'accelerometer', Values: [10, 10, 10]},  {'cai-xxx2': {Type: 'gyroscope', Values: [10, 10, 10]}})
   */
  setSensor(params: {
    [InstanceId: string]: { Type: 'accelerometer' | 'gyroscope'; Values: number[] };
  }): Promise<BatchTaskResponse>;

  /**
   * 设置截图事件
   *
   * @param {Object} params
   * @param {number} params.interval - 截图事件的间隔，单位毫秒
   * @param {number} params.quality - 截图质量，取值范围 0-100
   *
   * @example
   * TCGGCSDK.setImageEvent({interval: 10, quality: 50});
   *
   */
  setImageEvent({ interval, quality }: { interval?: number; quality?: number }): void;
  /**
   * 获取实例截图信息
   *
   * @param {Object} params
   * @param {string} params.instanceId
   *
   * @example
   * TCGGCSDK.getInstanceImage({instanceId: 'cai-xxx1'});
   */
  getInstanceImage({ instanceId }: { instanceId: string }): void;
}

// TCGGCSDK 是 CloudGamingGroupControlWebSDK 的实例, 已经挂载在 window 上，可以直接使用
declare const TCGGCSDK: CloudGamingGroupControlWebSDK;

export default TCGGCSDK;
