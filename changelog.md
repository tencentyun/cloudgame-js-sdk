### [1.0.4](https://ex.cloud-gaming.myqcloud.com/cloud_gaming_web_sdk/tcg-sdk/1.0.4/index.js) @2021.6.18

**新增**

- reshapeWindow 方法，用于窗口大小变化时调用
- 支持鼠标的侧键 mousebackward mouseforward
- 新增支持Mac FireFox 浏览器
- 新增init 参数 autoRotateContainer，用于自动旋转屏幕

**变更**

- 重连逻辑优化, onDisconnect 新增code 2/3

**修复**

- idleThreshold 回调失败

### [1.0.3](https://ex.cloud-gaming.myqcloud.com/cloud_gaming_web_sdk/tcg-sdk/1.0.3/index.js) @2021.5.26

**新增**

- init 新增参数 showLoading，用于是否显示loading 画面

**变更**

- onLoadedMetaData 逻辑修改

**修复**

- keyboard event 切换窗口卡建问题修复


### [1.0.2](https://ex.cloud-gaming.myqcloud.com/cloud_gaming_web_sdk/tcg-sdk/1.0.2/index.js) @2021.5.18

**新增**

- setVideoOrientation 设置video 的旋转角度
- init params 新增 mobileGame 参数，用于接入手游

**变更**

- onTouchEvent 为了支持多点触控，返回object[], object数据类型和之前一致。

**修复**

- 心跳启动逻辑导致断连
- onConnectSuccess 确保在ACK 数据通道创建成功后


### [1.0.0](https://ex.cloud-gaming.myqcloud.com/cloud_gaming_web_sdk/tcg-sdk/1.0.0/index.js) @2021.4.06

**变更**

重构TCGSDK

