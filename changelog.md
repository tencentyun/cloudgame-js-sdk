### [1.1.0](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.0)@2021.9.24

**新增**

- onDoubleTap 回调
- 新增连接失败返回值（onDisconnect/onConnectFailed）
- 新增键鼠禁用/启用功能
- 新增init 参数 autoRotateMountPoint，自动旋转挂载节点

**变更**

- onTouchEVent 返回多点触控列表为当前所有触控点
- setVideoOrientation 传参调整为 {deg: number; rotateContainer?: boolean; rotateMountPoint?: boolean;}

**修复**

- 移动端自动旋转，导致鼠标蒙层显示异常问题
- 未收到推流数据，不显示鼠标状态
- 修复android 下，端游多点触控异常

### [1.0.5](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.0.5)@2021.7.22

**新增**

- onConfigurationChange 回调，用于云端配置变化时候回调
- getRemoteStreamResolution 方法，用于获取云端推流分辨率
- init 参数 fullVideoToScreen，当 mount挂载节点宽高大于云端推流分辨率时候，true 拉伸video 尺寸并采用短边适配，false 不拉伸video，保持原有云端分辨率

**变更**

- connect threshold 为5s

**修复**

- 移动端chrome 浏览器无法获取fps 问题

### 1.0.4@2021.6.18

**新增**

- reshapeWindow 方法，用于窗口大小变化时调用
- 支持鼠标的侧键 mousebackward mouseforward
- 新增支持Mac FireFox 浏览器
- 新增init 参数 autoRotateContainer，用于自动旋转屏幕

**变更**

- 重连逻辑优化, onDisconnect 新增code 2/3

**修复**

- idleThreshold 回调失败

### 1.0.3@2021.5.26

**新增**

- init 新增参数 showLoading，用于是否显示loading 画面

**变更**

- onLoadedMetaData 逻辑修改

**修复**

- keyboard event 切换窗口卡建问题修复


### 1.0.2@2021.5.18

**新增**

- setVideoOrientation 设置video 的旋转角度
- init params 新增 mobileGame 参数，用于接入手游

**变更**

- onTouchEvent 为了支持多点触控，返回object[], object数据类型和之前一致。

**修复**

- 心跳启动逻辑导致断连
- onConnectSuccess 确保在ACK 数据通道创建成功后


### 1.0.0@2021.4.06

**变更**

重构TCGSDK

