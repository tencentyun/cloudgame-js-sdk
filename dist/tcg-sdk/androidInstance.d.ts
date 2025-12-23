/**
 * 批量任务的 response
 *
 */
export type BatchTaskResponse = {
  /**
   * 每个设备的 response
   *
   * Code 为 0 表示成功，其他值表示失败
   *
   * Code: 10001, Msg: "invalid param"
   * Code: 10002, Msg: "invalid token"
   * Code: 10003, Msg: "invalid operate"
   *
   */
  [InstanceId: string]: {
    Code: number;
    Msg: string;
  };
};

export interface InstanceProperties {
  DeviceInfo: { Brand: string; Model: string };
  GPSInfo: { Longitude: number; Latitude: number };
  LanguageInfo: { Language: string; Country: string };
  LocaleInfo: { Timezone: string };
  ProxyInfo: { Enabled: boolean; Protocol: string; Host: string; Port: number; User: string; Password: string };
  SIMInfo: {
    State: number; // sim 状态。 1：未插入 sim 卡 5：sim 卡已就绪
    PhoneNumber: string; // 暂不可用
    IMSI: string; // 暂不可用
    ICCID: string; // 暂不可用
  };
  ExtraProperties: { Key: string; Value: string }[];
}

interface DescribeInstancePropertiesResponse extends BatchTaskResponse {
  [InstanceId: string]: {
    /**
     * Code 为 0 表示成功
     */
    Code: number;
    Msg: string;
    RequestId: string;
    DeviceInfo: InstanceProperties['DeviceInfo'];
    GPSInfo: InstanceProperties['GPSInfo'];
    LanguageInfo: InstanceProperties['LanguageInfo'];
    LocaleInfo: InstanceProperties['LocaleInfo'];
    ProxyInfo: InstanceProperties['ProxyInfo'];
    SIMInfo: InstanceProperties['SIMInfo'];
  };
}

interface App {
  FirstInstallTimeMs: number;
  Label: string;
  LastUpdateTimeMs: number;
  PackageName: string;
  VersionName: string;
}

interface ListUserAppsResponse extends BatchTaskResponse {
  [InstanceId: string]: {
    /**
     * Code 为 0 表示成功
     */
    Code: number;
    Msg: string;
    RequestId: string;
    AppList: App[];
  };
}

interface DescribeCameraMediaPlayStatusResponse extends BatchTaskResponse {
  [InstanceId: string]: {
    Code: number;
    Msg: string;
    FilePath: string;
    /**
     * 循环次数，负数表示无限循环
     */
    Loops: number;
  };
}

interface DescribeKeepAliveListResponse extends BatchTaskResponse {
  [InstanceId: string]: {
    Code: number;
    Msg: string;
    AppList: string[];
  };
}

interface MediaSearchResponse extends BatchTaskResponse {
  [InstanceId: string]: {
    Code: number;
    Msg: string;
    MediaList: {
      FileName: string; // 'abc123.mp4';
      FilePath: string; // '/sdcard/xxxx';
      FileBytes: number;
      FileModifiedTime: number;
    }[];
  };
}

interface ListAllAppsResponse extends BatchTaskResponse {
  [InstanceId: string]: {
    /**
     * Code 为 0 表示成功
     */
    Code: number;
    Msg: string;
    RequestId: string;
    AppList: App[];
  };
}

interface DescribeAppInstallBlackListResponse extends BatchTaskResponse {
  [InstanceId: string]: {
    Code: number;
    Msg: string;
    AppList: string[];
  };
}

interface GetNavVisibleStatusResponse extends BatchTaskResponse {
  [InstanceId: string]: {
    Code: number;
    Msg: string;
    Visible: boolean;
  };
}

interface GetSystemMusicVolumeResponse extends BatchTaskResponse {
  [InstanceId: string]: {
    Code: number;
    Msg: string;
    Volume: number;
  };
}

/**
 * TCGSDK - AndroidInstance 子模块相关方法
 *
 * *需要正常 {@link CloudGamingWebSDK} TCGSDK.init 后，再调用 AndroidInstance 相关方法*
 *
 * AndroidInstance 是 TCGSDK 的子模块，用于操作 Android 设备，包括的几类操作能力如下：
 * 1. 连接单个实例看到云手机画面，以及云手机各种操作
 * 2. 通过截图预览多个云手机的画面
 * 3. 其他各类功能操作
 *
 * ![android_instance](https://ex-cloud-gaming.crtrcloud.com/assets/images/android_instance.png)
 *
 * @module AndroidInstance
 *
 * @example
 * const AndroidInstance = TCGSDK.AndroidInstance()
 *
 */
export interface AndroidInstance {
  /**
   * 设置 master
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - master的 instanceId
   *
   * @example
   * AndroidInstance.setMaster({instanceId: 'cai-xxx1'});
   *
   */
  setMaster({ instanceId }: { instanceId: string }): void;
  /**
   * 开始同步，根据设置的 instanceIds 进行同步
   *
   * @default 全量同步
   *
   * @function
   * @param {Object} params
   * @param {Array} params.instanceIds - string[] 需要同步的设备列表
   *
   * @example
   * AndroidInstance.startSync({instanceIds: ['cai-xxx1', 'cai-xxx2']});
   *
   */
  startSync({ instanceIds }: { instanceIds?: string[] }): void;
  /**
   * 停止同步（全量）
   *
   * @function
   *
   * @example
   * AndroidInstance.stopSync();
   */
  stopSync(): void;
  /**
   * 请求被控串流
   *
   * @function
   * @param {Object} param
   * @param {('low'|'mid'|'high')} [param.streamName='high'] - 流名称默认 'high'
   *
   * @example
   * TCGSDK.requestStream({streamName: 'high'});
   *
   */
  requestStream({ streamName }: { streamName?: 'low' | 'mid' | 'high' }): void;
  /**
   * 设置同步列表
   *
   * @function
   * @param {Object} param
   * @param {string[]} param.list - 需要同步的 instanceId 列表
   *
   * @example
   * TCGSDK.setSyncList({list: ['cai-xxxx-xxx1', 'cai-xxxx-xxx2']});
   *
   */
  setSyncList({ list }: { list: string[] }): void;
  /**
   * 中途加入群控
   *
   * @function
   * @param {Object} params
   * @param {string[]} params.instanceIds - 需要加入的实例列表
   * @param {string[]} [params.clientSessions] - clientSession
   *
   * @example
   * AndroidInstance.joinGroupControl({instanceIds: ['cai-xxx1', 'cai-xxx2']});
   */
  joinGroupControl({ instanceIds, clientSessions }: { instanceIds: string[]; clientSessions?: string[] }): void;
  /**
   * 中途离开群控
   *
   * @function
   * @param {Object} params
   * @param {string[]} params.instanceIds
   *
   * @example
   * AndroidInstance.leaveInstances({instanceIds: ['cai-xxx1', 'cai-xxx2']});
   */
  leaveGroupControl({ instanceIds }: { instanceIds: string[] }): void;
  /**
   * 设置截图事件
   *
   * @function
   * @param {Object} params
   * @param {number} params.interval - 截图事件的间隔，单位毫秒
   * @param {number} [params.quality] - 截图质量，取值范围 0-100
   *
   * @example
   * AndroidInstance.setImageEvent({interval: 10, quality: 50});
   *
   */
  setImageEvent({ interval, quality }: { interval?: number; quality?: number }): void;
  /**
   * 获取实例截图信息
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - 实例 Id
   * @param {number} [params.quality] - 截图质量，取值范围 0-100，默认 20
   * @param {number} [params.screenshot_width] - 截图宽度
   * @param {number} [params.screenshot_height] - 截图高度
   *
   * @example
   * const {url} = AndroidInstance.getInstanceImage({instanceId: 'cai-xxx1'});
   *
   */
  getInstanceImage({
    instanceId,
    quality,
    screenshot_width,
    screenshot_height,
  }: {
    instanceId: string;
    quality?: number;
    screenshot_width?: number;
    screenshot_height?: number;
  }): { url: string };
  /**
   * 上传文件到实例
   *
   * *默认上传到 /sdcard/Download 目录下，可使用 path 指定上传目录（仅支持/sdcard/ 下目录）*
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - 实例 Id
   * @param {Object[]} params.files - Files
   * @param {File} params.files.file - file
   * @param {string} params.files.path - path
   *
   * @example
   * AndroidInstance.upload({instanceId: 'cai-xxx1', files: [{file: file1, path: '/sdcard/xxx/'}, {file: file2, path: '/sdcard/xxx/'}]});
   *
   */
  upload({ instanceId, files }: { instanceId: string; files: { file: File; path?: string }[] }): Promise<{
    Code: number;
    Message: string;
    FileStatus: { CloudPath: string; FileName: string }[] | null;
  }>;
  /**
   * 上传文件到实例
   *
   * *默认上传到 /data/media/0/DCIM 目录下*
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - 实例 Id
   * @param {Object[]} params.files - Files
   * @param {File} params.files.file - file
   *
   * @example
   * AndroidInstance.uploadMedia({instanceId: 'cai-xxx1', files: [{file: file1}, {file: file2}]});
   *
   */
  uploadMedia({ instanceId, files }: { instanceId: string; files: { file: File }[] }): Promise<{
    Code: number;
    Message: string;
  }>;
  /**
   * 获取实例下载地址
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - 实例 Id
   * @param {string} [params.path] - 下载路径
   *
   * @example
   * const {address} = AndroidInstance.getInstanceDownloadAddress({instanceId: 'cai-xxx1', path: '/sdcard/xxx/'});
   *
   */
  getInstanceDownloadAddress({ instanceId, path }: { instanceId: string; path: string }): { address: string };
  /**
   * 获取实例 Logcat 下载地址
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - 实例 Id
   * @param {string} [params.recentDays] - 最近多少天 0 表示所有日志
   *
   * @example
   * const {address} = AndroidInstance.getInstanceDownloadLogcatAddress({instanceId: 'cai-xxx1', recentDays: 3});
   *
   */
  getInstanceDownloadLogcatAddress({ instanceId, recentDays }: { instanceId: string; recentDays: number }): {
    address: string;
  };
  //  ---------------  Data Channel Methods  ---------------
  /**
   * **聚焦输入框时**快速发送内容，不粘贴到剪贴版
   *
   * @param {Object} params
   * @param {string} param.content - content
   * @param {string} param.mode - append: 追加模式，向输入框中当前光标后写入  override: 覆盖模式，覆盖输入框中的文字
   *
   * @example
   * AndroidInstance.inputText({content: 'abc'});
   */
  inputText({ content, mode }: { content: string; mode: 'append' | 'override' }): void;
  /**
   * 切换输入法
   *
   * @param {Object} params
   * @param {string} param.ime - cloud : 云端输入法，local： 本地输入法
   *
   * @example
   * AndroidInstance.switchIME({ime: 'local'});
   */
  switchIME({ ime }: { ime: 'cloud' | 'local' }): void;
  /**
   * 发送 App binder 消息
   *
   * **单连接适用**
   *
   * @function
   * @param {Object} params
   * @param {string} param.packageName - PackageName
   * @param {string} param.message - 消息
   *
   * @example
   * AndroidInstance.transMessage({packageName: 'com.example.myapplication', message: 'abc123'});
   *
   */
  transMessage({ packageName, message }: { packageName: string; message: string }): void;
  /**
   * 触发快速分发应用
   *
   * @function
   * @param {Object} params
   * @param {string} param.packageName - PackageName
   *
   * @example
   * AndroidInstance.distributeApp({packageName: 'com.example.myapplication'});
   *
   */
  distributeApp({ packageName }: { packageName: string }): void;
  /**
   * 停止除指定应用外其他非系统应用
   *
   * @function
   * @param {Object} params
   * @param {string} param.preservePackageNames - preservePackageNames
   *
   * @example
   * AndroidInstance.preserveCleanApp({preservePackageNames: ["tv.danmaku.bili","tv.danmaku.bili2"]});
   *
   */
  preserveCleanApp({ preservePackageNames }: { preservePackageNames: string[] }): void;
  /**
   * 前台保活指定APP
   *
   * @function
   * @param {Object} params
   * @param {string} param.packageName - packageName
   * @param {string} [param.enable] - enable 为 false 时可不指定包名
   *
   * @example
   * AndroidInstance.keepFrontApp({packageName: "tv.danmaku.bili"});
   *
   */
  keepFrontApp({ packageName, enable }: { packageName: string; enable: boolean }): void;
  //  ---------------  Operator Methods  ---------------
  /**
   * 设置设备 GPS 信息
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value
   * @param {number} params.value.Longitude
   * @param {number} params.value.Latitude
   *
   * @example
   * AndroidInstance.setLocation({'cai-xxx1': {Longitude: 113.32412, Latitude: 23.124124}, 'cai-xxx2': {Longitude: 114.32412, Latitude: 24.124124}})
   *
   */
  setLocation(params: { [InstanceId: string]: { Longitude: number; Latitude: number } }): Promise<BatchTaskResponse>;
  /**
   * 设置设备 Resolution
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value
   * @param {number} params.value.Width
   * @param {number} params.value.Height
   * @param {number} params.value.DPI
   *
   * @example
   * AndroidInstance.setResolution({'cai-xxx1': {Width: 720, Height: 1080}, {'cai-xxx2': {Width: 720, Height: 1080}});
   */
  setResolution(params: {
    [InstanceId: string]: { Width: number; Height: number; DPI?: number };
  }): Promise<BatchTaskResponse>;
  /**
   * 粘贴文本
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value
   * @param {string} params.value.Text - 要粘贴的文本
   *
   * @example
   * AndroidInstance.paste({'cai-xxx1': {Text: 'abc'}, {'cai-xxx2': {Text: '123'}});
   */
  paste(params: { [InstanceId: string]: { Text: string } }): Promise<BatchTaskResponse>;
  /**
   * 发送文本到剪切板
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value
   * @param {string} params.value.Text - 要发送的内容
   *
   * @example
   * AndroidInstance.sendClipboard({'cai-xxx1': {Text: 'abc'}, {'cai-xxx2': {Text: '123'}});
   */
  sendClipboard(params: { [InstanceId: string]: { Text: string } }): Promise<BatchTaskResponse>;
  /**
   * 摇一摇
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value 暂时传空对象 {}
   *
   * @example
   * AndroidInstance.shake({'cai-xxx1': {}, {'cai-xxx2': {}});
   */
  shake(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * 设置设备传感器信息
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value
   * @param {'accelerometer' | 'gyroscope'} params.value.Type - 传感器leasing accelerometer（加速器），gyroscope（陀螺仪）
   * @param {string[]} params.value.Values - 传感器对应的值，数组长度为 3，分辨表示 x/y/z 轴的值
   *
   * @example
   * AndroidInstance.setSensor({'cai-xxx1': {Type: 'accelerometer', Values: [10, 10, 10]},  {'cai-xxx2': {Type: 'gyroscope', Values: [10, 10, 10]}});
   */
  setSensor(params: {
    [InstanceId: string]: { Type: 'accelerometer' | 'gyroscope'; Values: number[] };
  }): Promise<BatchTaskResponse>;
  /**
   * 发送 App binder 消息
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value 暂时传空对象 {}
   * @param {string} params.value.PackageName - PackageName
   * @param {string} params.value.Msg - 消息
   *
   * @example
   * AndroidInstance.sendTransMessage({'cai-xxx1': {PackageName: 'com.example.myapplication', Msg: 'abc123'}});
   */
  sendTransMessage(params: { [InstanceId: string]: { PackageName: string; Msg: string } }): Promise<BatchTaskResponse>;
  /**
   * 查询实例属性
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value 暂时传空对象 {}
   *
   * @example
   * AndroidInstance.describeInstanceProperties({'cai-xxx1': {}, {'cai-xxx2': {}});
   */
  describeInstanceProperties(params: { [InstanceId: string]: {} }): Promise<DescribeInstancePropertiesResponse>;
  /**
   * 修改实例属性
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {Object} [params.value.DeviceInfo] - DeviceInfo
   * @param {string} [params.value.DeviceInfo.Brand] - DeviceInfo - Brand
   * @param {string} [params.value.DeviceInfo.Model] - DeviceInfo - Model
   * @param {Object} [params.value.ProxyInfo] - ProxyInfo
   * @param {boolean} [params.value.ProxyInfo.Enabled] - ProxyInfo - Enabled
   * @param {string} [params.value.ProxyInfo.Protocol] - ProxyInfo - Protocol
   * @param {string} [params.value.ProxyInfo.Host] - ProxyInfo - Host
   * @param {number} [params.value.ProxyInfo.Port] - ProxyInfo - Port
   * @param {string} [params.value.ProxyInfo.User] - ProxyInfo - User
   * @param {string} [params.value.ProxyInfo.Password] - ProxyInfo - Password
   * @param {Object} [params.value.GPSInfo] - GPSInfo
   * @param {number} [params.value.GPSInfo.Longitude] - GPSInfo - Longitude
   * @param {number} [params.value.GPSInfo.Latitude] - GPSInfo - Latitude
   * @param {Object} [params.value.SIMInfo] - SIMInfo
   * @param {number} [params.value.SIMInfo.State] - SIMInfo - State
   * @param {string} [params.value.SIMInfo.PhoneNumber] - SIMInfo - PhoneNumber
   * @param {string} [params.value.SIMInfo.IMSI] - SIMInfo - IMSI
   * @param {string} [params.value.SIMInfo.ICCID] - SIMInfo - ICCID
   * @param {Object} [params.value.LocaleInfo] - LocaleInfo
   * @param {string} [params.value.LocaleInfo.Timezone] - LocaleInfo - Timezone
   * @param {Object} [params.value.LanguageInfo] - LanguageInfo
   * @param {string} [params.value.LanguageInfo.Language] - LanguageInfo - Language
   * @param {string} [params.value.LanguageInfo.Country] - LanguageInfo - Country
   * @param {Object[]} [params.value.ExtraProperties] - ExtraProperties
   * @param {string} [params.value.ExtraProperties.Key] - ExtraProperties - Key
   * @param {string} [params.value.ExtraProperties.Value] - ExtraProperties - Value
   *
   * @example
   * AndroidInstance.ModifyInstanceProperties({'cai-xxx1': {
   *  DeviceInfo: {
   *        Brand: 'Samsung',
   *        Model: 'Galaxy S24',
   *      },
   *    ProxyInfo: {
   *      Enabled: true,
   *      Protocol: 'socks5',
   *      Host: 'proxy.example.com',
   *      Port: 1080,
   *      User: 'user123',
   *      Password: 'pass123',
   *    },
   *    GPSInfo: {
   *      Longitude: 121.4737,
   *      Latitude: 31.2304,
   *    },
   *    SIMInfo: {
   *      State: 1,
   *      PhoneNumber: '+8613812345678',
   *      IMSI: '460001234567890',
   *      ICCID: '89860123456789012345',
   *    },
   *    LocaleInfo: {
   *      Timezone: 'Asia/Shanghai',
   *    },
   *    LanguageInfo: {
   *     Language: 'zh',
   *     Country: 'CN',
   *   },
   *   ExtraProperties: [
   *     {
   *       Key: 'custom_property1',
   *       Value: 'value1',
   *     },
   *     {
   *       Key: 'custom_property2',
   *       Value: 'value2',
   *     },
   *   ]
   * }})
   **/
  modifyInstanceProperties(params: { [InstanceId: string]: Partial<InstanceProperties> }): Promise<BatchTaskResponse>;
  /**
   * 查询已安装第三方应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value 暂时传空对象 {}
   *
   * @example
   * AndroidInstance.listUserApps({'cai-xxx1': {}, {'cai-xxx2': {}})
   */
  listUserApps(params: { [InstanceId: string]: {} }): Promise<ListUserAppsResponse>;
  /**
   * 修改前台应用保活状态
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   * @param {boolean} params.value.Enable - Enable
   * @param {number} params.value.RestartInterValSeconds - 重新拉起最长间隔
   *
   * @example
   * AndroidInstance.modifyKeepFrontAppStatus({'cai-xxx1': {"PackageName": "com.example.app", "Enable": true, "RestartInterValSeconds": 5}});
   */
  modifyKeepFrontAppStatus(params: {
    [InstanceId: string]: {
      PackageName: string;
      Enable: boolean;
      /**
       * 重新拉起最长间隔
       */
      RestartInterValSeconds: number;
    };
  }): Promise<BatchTaskResponse>;
  /**
   * 查询前台应用保活状态
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   * @example
   * AndroidInstance.describeKeepFrontAppStatus({'cai-xxx1': {}});
   */
  describeKeepFrontAppStatus(params: {
    [InstanceId: string]: {};
  }): Promise<{ PackageName: string; Enable: boolean; RestartInterValSeconds: number }>;
  /**
   * 卸载应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   *
   * @example
   * AndroidInstance.unInstallByPackageName({'cai-xxx1': {"PackageName": "com.unwanted.app"}});
   */
  unInstallByPackageName(params: { [InstanceId: string]: { PackageName: string } }): Promise<BatchTaskResponse>;
  /**
   * 启动应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   * @param {string} params.value.ActivityName - ActivityName
   *
   *
   * @example
   * AndroidInstance.startApp({'cai-xxx1': {"PackageName": "com.launch.app", "ActivityName": "MainActivity"}});
   */
  startApp(params: { [InstanceId: string]: { PackageName: string; ActivityName: string } }): Promise<BatchTaskResponse>;
  /**
   * 停止应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   *
   *
   * @example
   * AndroidInstance.stopApp({'cai-xxx1': {"PackageName": "com.running.app"}});
   */
  stopApp(params: { [InstanceId: string]: { PackageName: string } }): Promise<BatchTaskResponse>;
  /**
   * 清除应用数据
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   *
   *
   * @example
   * AndroidInstance.clearAppData({'cai-xxx1': {"PackageName": "com.data.app"}});
   */
  clearAppData(params: { [InstanceId: string]: { PackageName: string } }): Promise<BatchTaskResponse>;
  /**
   * 启用应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   *
   *
   * @example
   * AndroidInstance.enableApp({'cai-xxx1': {"PackageName": "com.disabled.app"}});
   */
  enableApp(params: { [InstanceId: string]: { PackageName: string } }): Promise<BatchTaskResponse>;
  /**
   * 禁用应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   *
   *
   * @example
   * AndroidInstance.disableApp({'cai-xxx1': {"PackageName": "com.disabled.app"}});
   */
  disableApp(params: { [InstanceId: string]: { PackageName: string } }): Promise<BatchTaskResponse>;
  /**
   * 摄像头播放媒体文件
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.FilePath - FilePath
   * @param {string} params.value.Loops - 循环次数，负数表示无限循环
   *
   *
   * @example
   * AndroidInstance.startCameraMediaPlay({'cai-xxx1': {"FilePath": "/sdcard/video.mp4", "Loops": 3}});
   */
  startCameraMediaPlay(params: {
    [InstanceId: string]: { FilePath: string; Loops: number };
  }): Promise<BatchTaskResponse>;
  /**
   * 摄像头停止播放媒体文件
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.stopCameraMediaPlay({'cai-xxx1': {}});
   */
  stopCameraMediaPlay(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * 查询当前摄像头媒体播放状态
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.describeCameraMediaPlayStatus({'cai-xxx1': {}});
   */
  describeCameraMediaPlayStatus(params: { [InstanceId: string]: {} }): Promise<DescribeCameraMediaPlayStatusResponse>;
  /**
   * 摄像头显示图片
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.FilePath - FilePath
   *
   *
   * @example
   * AndroidInstance.displayCameraImage({'cai-xxx1': {"FilePath": "/sdcard/image.jpg"}});
   */
  displayCameraImage(params: { [InstanceId: string]: { FilePath: string } }): Promise<BatchTaskResponse>;
  /**
   * 增加后台保活应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.addKeepAliveList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  addKeepAliveList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * 移除后台保活应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.removeKeepAliveList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  removeKeepAliveList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * 覆盖设置后台保活应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.setKeepAliveList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  setKeepAliveList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * 查询后台保活应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.describeKeepAliveList({'cai-xxx1': {}});
   */
  describeKeepAliveList(params: { [InstanceId: string]: {} }): Promise<DescribeKeepAliveListResponse>;
  /**
   * 清空后台保活应用
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.clearKeepAliveList({'cai-xxx1': {}});
   */
  clearKeepAliveList(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * 静音开关
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {boolean} params.value.Mute - Mute
   *
   *
   * @example
   * AndroidInstance.mute({'cai-xxx1': {Mute: true}});
   */
  mute(params: { [InstanceId: string]: { Mute: boolean } }): Promise<BatchTaskResponse>;
  /**
   * 媒体库文件搜索
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {boolean} params.value.Keyword - Keyword
   *
   *
   * @example
   * AndroidInstance.mediaSearch({'cai-xxx1': {"Keyword": "abc"}});
   */
  mediaSearch(params: { [InstanceId: string]: { Keyword: string } }): Promise<MediaSearchResponse>;
  /**
   * 重启实例
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.reboot({'cai-xxx1': {}});
   */
  reboot(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * 查询所有应用列表
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.listAllApps({'cai-xxx1': {}});
   */
  listAllApps(params: { [InstanceId: string]: {} }): Promise<ListAllAppsResponse>;
  /**
   * 关闭应用至后台
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.moveAppBackground({'cai-xxx1': {}});
   */
  moveAppBackground(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * 新增应用安装黑名单
   *
   * *新增时如果应用已安装，会进行卸载*
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.addAppInstallBlackList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  addAppInstallBlackList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * 移除应用安装黑名单
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.removeAppInstallBlackList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  removeAppInstallBlackList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * 覆盖应用安装黑名单
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.setAppInstallBlackList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  setAppInstallBlackList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * 查询应用安装黑名单
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.describeAppInstallBlackList({'cai-xxx1': {}});
   */
  describeAppInstallBlackList(params: { [InstanceId: string]: {} }): Promise<DescribeAppInstallBlackListResponse>;
  /**
   * 清空应用安装黑名单
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.clearAppInstallBlackList({'cai-xxx1': {}});
   */
  clearAppInstallBlackList(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * 获取系统导航栏显示状态
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.getNavVisibleStatus({'cai-xxx1': {}});
   */
  getNavVisibleStatus(params: { [InstanceId: string]: {} }): Promise<GetNavVisibleStatusResponse>;
  /**
   * 获取系统媒体音量大小
   *
   * @function
   * @param {Object} params - key 为 instanceId
   * @param {string} params.key - 设备 instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.getSystemMusicVolume({'cai-xxx1': {}});
   */
  getSystemMusicVolume(params: { [InstanceId: string]: {} }): Promise<GetSystemMusicVolumeResponse>;
}
