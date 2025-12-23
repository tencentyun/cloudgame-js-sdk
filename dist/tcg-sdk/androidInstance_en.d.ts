/**
 * Responses of batch task
 *
 */
export type BatchTaskResponse = {
  /**
   * Response for each device
   *
   * Code 0 for success, other values indicate failure
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
    State: number; // SIM card status. 1: No SIM card inserted 5: SIM card ready
    PhoneNumber: string; // Unavailable
    IMSI: string; // Unavailable
    ICCID: string; // Unavailable
  };
  ExtraProperties: { Key: string; Value: string }[];
}
interface DescribeInstancePropertiesResponse extends BatchTaskResponse {
  [InstanceId: string]: {
    /**
     * Code 0 for success
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
     * Code 0 for success
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
     * Number of loops, negative values for infinite loops
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
     * Code 0 for success
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
 * TCGSDK - AndroidInstance submodule related methods
 *
 * *All AndroidInstance methods must be called after normal {@link CloudGamingWebSDK} TCGSDK.init*
 *
 * AndroidInstance is a submodule of TCGSDK, used to operate Android devices, including the following capabilities:
 * 1. Connect to a single instance to view the cloud phone screen and perform various operations.
 * 2. Preview multiple cloud phone screens via screenshots.
 * 3. Other functional operations.
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
   * Set master
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - Master's instanceId
   *
   * @example
   * AndroidInstance.setMaster({instanceId: 'cai-xxx1'});
   *
   */
  setMaster({ instanceId }: { instanceId: string }): void;
  /**
   * Start sync based on the accessed instanceIds
   *
   * @default Full synchronization
   *
   * @function
   * @param {Object} params
   * @param {Array} params.instanceIds - string[] List of devices to synchronize
   *
   * @example
   * AndroidInstance.startSync({instanceIds: ['cai-xxx1', 'cai-xxx2']});
   *
   */
  startSync({ instanceIds }: { instanceIds?: string[] }): void;
  /**
   * Stop sync (All instance ids)
   *
   * @function
   *
   * @example
   * AndroidInstance.stopSync();
   */
  stopSync(): void;
  /**
   * Request streaming by streamName
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
   * Set sync list
   *
   * @function
   * @param {Object} param
   * @param {string[]} param.list - List of instanceIds to synchronize
   *
   * @example
   * TCGSDK.setSyncList({list: ['cai-xxxx-xxx1', 'cai-xxxx-xxx2']});
   *
   */
  setSyncList({ list }: { list: string[] }): void;
  /**
   * Join group control by instance id
   *
   * @function
   * @param {Object} params
   * @param {string[]} params.instanceIds - List of instances to join
   * @param {string[]} [params.clientSessions] - clientSession
   *
   * @example
   * AndroidInstance.joinGroupControl({instanceIds: ['cai-xxx1', 'cai-xxx2']});
   */
  joinGroupControl({ instanceIds, clientSessions }: { instanceIds: string[]; clientSessions?: string[] }): void;
  /**
   * Leave group control by instance id
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
   * Set screenshot event
   *
   * @function
   * @param {Object} params
   * @param {number} params.interval - Screenshot event interval in milliseconds
   * @param {number} [params.quality] - Screenshot quality, range 0-100
   *
   * @example
   * AndroidInstance.setImageEvent({interval: 10, quality: 50});
   *
   */
  setImageEvent({ interval, quality }: { interval?: number; quality?: number }): void;
  /**
   * Get instance screenshot
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - Instance Id
   * @param {number} [params.quality] - Screenshot quality, range 0-100, default 20
   * @param {number} [params.screenshot_width] - Screenshot width
   * @param {number} [params.screenshot_height] - Screenshot height
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
   * Upload file to instance
   *
   * *By default, files are uploaded to the /sdcard/Download directory. Use path to specify a different directory (only under /sdcard/)*
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - Instance Id
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
   * Upload file to instance
   *
   * *By default, files are uploaded to the /data/media/0/DCIM directory*
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - Instance Id
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
   * Get instance download address
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - Instance Id
   * @param {string} [params.path] - Download path
   *
   * @example
   * const {address} = AndroidInstance.getInstanceDownloadAddress({instanceId: 'cai-xxx1', path: '/sdcard/xxx/'});
   *
   */
  getInstanceDownloadAddress({ instanceId, path }: { instanceId: string; path: string }): { address: string };
  /**
   * Get instance Logcat download address
   *
   * @function
   * @param {Object} params
   * @param {string} params.instanceId - Instance Id
   * @param {string} [params.recentDays] - Recent days (0 for all logs)
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
   * **When input box is focused** quickly send content without copying to clipboard
   *
   * @param {Object} params
   * @param {string} param.content - content
   * @param {string} param.mode - append: append mode, write after current cursor; override: override mode, replace input box text
   *
   * @example
   * AndroidInstance.inputText({content: 'abc'});
   */
  inputText({ content, mode }: { content: string; mode: 'append' | 'override' }): void;
  /**
   * Switch IME
   *
   * @param {Object} params
   * @param {string} param.ime - cloud: cloud input method; local: local input method
   *
   * @example
   * AndroidInstance.switchIME({ime: 'local'});
   */
  switchIME({ ime }: { ime: 'cloud' | 'local' }): void;
  /**
   * Send App binder message
   *
   * **For single connection only**
   *
   * @function
   * @param {Object} params
   * @param {string} param.packageName - PackageName
   * @param {string} param.message - Message
   *
   * @example
   * AndroidInstance.transMessage({packageName: 'com.example.myapplication', message: 'abc123'});
   *
   */
  transMessage({ packageName, message }: { packageName: string; message: string }): void;
  /**
   * Distribute App
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
   * Preserve Clean App
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
   * Keep app in front
   *
   * @function
   * @param {Object} params
   * @param {string} param.packageName - packageName
   * @param {string} [param.enable] - enable
   *
   * @example
   * AndroidInstance.keepFrontApp({packageName: "tv.danmaku.bili"});
   *
   */
  keepFrontApp({ packageName, enable }: { packageName: string; enable: boolean }): void;
  //  ---------------  Operator Methods  ---------------
  /**
   * Set device GPS information
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
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
   * Set device Resolution
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
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
   * Paste text
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value
   * @param {string} params.value.Text - Text to paste
   *
   * @example
   * AndroidInstance.paste({'cai-xxx1': {Text: 'abc'}, {'cai-xxx2': {Text: '123'}});
   */
  paste(params: { [InstanceId: string]: { Text: string } }): Promise<BatchTaskResponse>;
  /**
   * Send text to clipboard
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value
   * @param {string} params.value.Text - Content to send
   *
   * @example
   * AndroidInstance.sendClipboard({'cai-xxx1': {Text: 'abc'}, {'cai-xxx2': {Text: '123'}});
   */
  sendClipboard(params: { [InstanceId: string]: { Text: string } }): Promise<BatchTaskResponse>;
  /**
   * Shake device
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value is an empty object {}
   *
   * @example
   * AndroidInstance.shake({'cai-xxx1': {}, {'cai-xxx2': {}});
   */
  shake(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * Set device sensor information
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value
   * @param {'accelerometer' | 'gyroscope'} params.value.Type - Sensor type: accelerometer or gyroscope
   * @param {string[]} params.value.Values - Sensor values, array length 3, representing x/y/z axis values
   *
   * @example
   * AndroidInstance.setSensor({'cai-xxx1': {Type: 'accelerometer', Values: [10, 10, 10]},  {'cai-xxx2': {Type: 'gyroscope', Values: [10, 10, 10]}});
   */
  setSensor(params: {
    [InstanceId: string]: { Type: 'accelerometer' | 'gyroscope'; Values: number[] };
  }): Promise<BatchTaskResponse>;
  /**
   * Send App binder message
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value is an empty object {}
   * @param {string} params.value.PackageName - PackageName
   * @param {string} params.value.Msg - Message
   *
   * @example
   * AndroidInstance.sendTransMessage({'cai-xxx1': {PackageName: 'com.example.myapplication', Msg: 'abc123'}});
   */
  sendTransMessage(params: { [InstanceId: string]: { PackageName: string; Msg: string } }): Promise<BatchTaskResponse>;
  /**
   * Describe instance properties
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value is an empty object {}
   *
   * @example
   * AndroidInstance.describeInstanceProperties({'cai-xxx1': {}, {'cai-xxx2': {}});
   */
  describeInstanceProperties(params: { [InstanceId: string]: {} }): Promise<DescribeInstancePropertiesResponse>;
  /**
   * Modify instance properties
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
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
   * Query user installed apps
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value is an empty object {}
   *
   * @example
   * AndroidInstance.listUserApps({'cai-xxx1': {}, {'cai-xxx2': {}})
   */
  listUserApps(params: { [InstanceId: string]: {} }): Promise<ListUserAppsResponse>;
  /**
   * Modify foreground app keep-alive status
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   * @param {boolean} params.value.Enable - Enable
   * @param {number} params.value.RestartInterValSeconds - Maximum interval for restarting
   *
   * @example
   * AndroidInstance.modifyKeepFrontAppStatus({'cai-xxx1': {"PackageName": "com.example.app", "Enable": true, "RestartInterValSeconds": 5}});
   */
  modifyKeepFrontAppStatus(params: {
    [InstanceId: string]: {
      PackageName: string;
      Enable: boolean;
      /**
       * Maximum interval for restarting
       */
      RestartInterValSeconds: number;
    };
  }): Promise<BatchTaskResponse>;
  /**
   * Query foreground app keep-alive status
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   * @example
   * AndroidInstance.describeKeepFrontAppStatus({'cai-xxx1': {}});
   */
  describeKeepFrontAppStatus(params: {
    [InstanceId: string]: {};
  }): Promise<{ PackageName: string; Enable: boolean; RestartInterValSeconds: number }>;
  /**
   * Uninstall app
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   *
   * @example
   * AndroidInstance.unInstallByPackageName({'cai-xxx1': {"PackageName": "com.unwanted.app"}});
   */
  unInstallByPackageName(params: { [InstanceId: string]: { PackageName: string } }): Promise<BatchTaskResponse>;
  /**
   * Start app
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
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
   * Stop app
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   *
   *
   * @example
   * AndroidInstance.stopApp({'cai-xxx1': {"PackageName": "com.running.app"}});
   */
  stopApp(params: { [InstanceId: string]: { PackageName: string } }): Promise<BatchTaskResponse>;
  /**
   * Clear app data
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   *
   *
   * @example
   * AndroidInstance.clearAppData({'cai-xxx1': {"PackageName": "com.data.app"}});
   */
  clearAppData(params: { [InstanceId: string]: { PackageName: string } }): Promise<BatchTaskResponse>;
  /**
   * Enable app
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   *
   *
   * @example
   * AndroidInstance.enableApp({'cai-xxx1': {"PackageName": "com.disabled.app"}});
   */
  enableApp(params: { [InstanceId: string]: { PackageName: string } }): Promise<BatchTaskResponse>;
  /**
   * Disable app
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.PackageName - PackageName
   *
   *
   * @example
   * AndroidInstance.disableApp({'cai-xxx1': {"PackageName": "com.disabled.app"}});
   */
  disableApp(params: { [InstanceId: string]: { PackageName: string } }): Promise<BatchTaskResponse>;
  /**
   * Play media file on camera
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.FilePath - FilePath
   * @param {string} params.value.Loops - Number of loops, negative values indicate infinite loops
   *
   *
   * @example
   * AndroidInstance.startCameraMediaPlay({'cai-xxx1': {"FilePath": "/sdcard/video.mp4", "Loops": 3}});
   */
  startCameraMediaPlay(params: {
    [InstanceId: string]: { FilePath: string; Loops: number };
  }): Promise<BatchTaskResponse>;
  /**
   * Stop playing media file on camera
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.stopCameraMediaPlay({'cai-xxx1': {}});
   */
  stopCameraMediaPlay(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * Query current camera media play status
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.describeCameraMediaPlayStatus({'cai-xxx1': {}});
   */
  describeCameraMediaPlayStatus(params: { [InstanceId: string]: {} }): Promise<DescribeCameraMediaPlayStatusResponse>;
  /**
   * Display image on camera
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string} params.value.FilePath - FilePath
   *
   *
   * @example
   * AndroidInstance.displayCameraImage({'cai-xxx1': {"FilePath": "/sdcard/image.jpg"}});
   */
  displayCameraImage(params: { [InstanceId: string]: { FilePath: string } }): Promise<BatchTaskResponse>;
  /**
   * Add background keep-alive apps
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.addKeepAliveList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  addKeepAliveList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * Remove background keep-alive apps
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.removeKeepAliveList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  removeKeepAliveList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * Override background keep-alive apps
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.setKeepAliveList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  setKeepAliveList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * Query background keep-alive apps
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.describeKeepAliveList({'cai-xxx1': {}});
   */
  describeKeepAliveList(params: { [InstanceId: string]: {} }): Promise<DescribeKeepAliveListResponse>;
  /**
   * Clear background keep-alive apps
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.clearKeepAliveList({'cai-xxx1': {}});
   */
  clearKeepAliveList(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * Mute switch
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {boolean} params.value.Mute - Mute
   *
   *
   * @example
   * AndroidInstance.mute({'cai-xxx1': {Mute: true}});
   */
  mute(params: { [InstanceId: string]: { Mute: boolean } }): Promise<BatchTaskResponse>;
  /**
   * Media library file search
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {boolean} params.value.Keyword - Keyword
   *
   *
   * @example
   * AndroidInstance.mediaSearch({'cai-xxx1': {"Keyword": "abc"}});
   */
  mediaSearch(params: { [InstanceId: string]: { Keyword: string } }): Promise<MediaSearchResponse>;
  /**
   * Reboot instance
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.reboot({'cai-xxx1': {}});
   */
  reboot(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * Query all apps list
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.listAllApps({'cai-xxx1': {}});
   */
  listAllApps(params: { [InstanceId: string]: {} }): Promise<ListAllAppsResponse>;
  /**
   * Move app to background
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.moveAppBackground({'cai-xxx1': {}});
   */
  moveAppBackground(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * Add app install blacklist
   *
   * *If the app is already installed, it will be uninstalled when added*
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.addAppInstallBlackList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  addAppInstallBlackList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * Remove app install blacklist
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.removeAppInstallBlackList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  removeAppInstallBlackList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * Override app install blacklist
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   * @param {string[]} params.value.AppList - AppList
   *
   *
   * @example
   * AndroidInstance.setAppInstallBlackList({'cai-xxx1': {"AppList": ["com.wechat", "com.alipay", "com.dingtalk"]}});
   */
  setAppInstallBlackList(params: { [InstanceId: string]: { AppList: string[] } }): Promise<BatchTaskResponse>;
  /**
   * Query app install blacklist
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.describeAppInstallBlackList({'cai-xxx1': {}});
   */
  describeAppInstallBlackList(params: { [InstanceId: string]: {} }): Promise<DescribeAppInstallBlackListResponse>;
  /**
   * Clear app install blacklist
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.clearAppInstallBlackList({'cai-xxx1': {}});
   */
  clearAppInstallBlackList(params: { [InstanceId: string]: {} }): Promise<BatchTaskResponse>;
  /**
   * Get system navigation bar visibility status
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string} params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.getNavVisibleStatus({'cai-xxx1': {}});
   */
  getNavVisibleStatus(params: { [InstanceId: string]: {} }): Promise<GetNavVisibleStatusResponse>;
  /**
   * Get system media volume level
   *
   * @function
   * @param {Object} params - key is instanceId
   * @param {string] params.key - Device instanceId
   * @param {Object} params.value - value
   *
   *
   * @example
   * AndroidInstance.getSystemMusicVolume({'cai-xxx1': {}});
   */
  getSystemMusicVolume(params: { [InstanceId: string]: {} }): Promise<GetSystemMusicVolumeResponse>;
}
