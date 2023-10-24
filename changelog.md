### [1.1.18](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.18)@2023.10.17

**新增**

- 新增重复init 回调

**变更**

- 切换摄像头/麦克风返回值

**优化**

- 优化web端日志
- 优化摄像头/麦克风切换逻辑
- 优化stats 回调

### [1.1.17](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.17)@2023.09.19

**修复**

- 修复 iOS17 webrtc stats异常导致无法正常连接的问题

### [1.1.16](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.16)@2023.09.12

**变更**

- 调整 iOS 15.4 以下版本重协商策略
- 调整touch 模式鼠标逻辑
- 调整重连策略

### [1.1.15](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.15)@2023.08.15

**变更**

- offer 取消 sps-pps-idr-in-keyframe=1 配置
- 移除 auto login 相关回调

**优化**

- 优化动态切换摄像头/麦克风逻辑
- 增加前后台切换日志

### [1.1.14](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.14)@2023.08.02

**新增**

- 新增接口 sendGamepadEvent
- 新增移动端前后摄像头切换功能

**变更**

- 删除 sendRawEvent 接口

**修复**

- show stats 针对异常情况兼容

### [1.1.13](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.13)@2023.07.10

**新增**

- 获取剪切板失败回调

**变更**

- catch pointerlockerror

**修复**

- 自动重连逻辑梳理，对齐 Proxy 返回错误码
- 取消摄像头上行码率限制
- 修复切换麦克风导致画面闪烁问题

### [1.1.12](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.12)@2023.06.05

**新增**

- 数据通道新增接受二进制数据类型
- local offer 新增 sps-pps-idr-in-keyframe

**变更**

- dataChannel message 重传优化

**修复**

- Stats 增加旋转后可见
- 修复丢包显示小于 0
- 修复旋转屏幕导致摇杆方向异常
- setRemoteDesktopResolution 避免使用浮点数

### [1.1.11](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.11)@2023.02.01

**新增**

- keyboard data 新增 location 表示左右按键

**变更**

- 重连优化

**修复**

- 重复多次开关麦，导致麦克风切换失败问题修复

### [1.1.10](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.10)@2022.12.02

**新增**

- 重新连接文案属性

**变更**

- 调整日志上报逻辑

**修复**

- 由于自动播放受限，导致坐标计算错误问题

### [1.1.9](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.9)@2022.11.24

**新增**

- 鼠标锁定失败回调
- 新增发送文本回调

**变更**

- reshapeWindow 逻辑修改
- 针对手游横屏自动流旋转逻辑调整

**修复**

- 屏幕旋转重复添加 class 问题修复
- reshapeWindow 逻辑修改
- 屏幕旋转回调增加容错

### [1.1.8](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.8)@2022.11.02

**新增**

- 新增云端推流状态变化通知

**修复**

- 端游旋转屏幕情况下，deltaMove 发送不准确问题
- 获取摄像头/麦克风失败，导致创建 offer 失败问题

### [1.1.7](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.7)@2022.10.10

**新增**

- 新增 game stop 消息通知
- 针对手游横竖屏设置不同旋转逻辑

**变更**

- 增加粘贴功能劫持配置项
- 手游根据 screen_config 配置云端画面尺寸
- 摇杆插件变更，通过实例化创建

**修复**

- PC 端玩手游，鼠标显示异常问题
- 重连导致数据通道创建异常
- 移动端切换后台后，前端 touch 卡键问题

### [1.1.6](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.6)@2022.08.10

**新增**

- 动态开关 mic/camera
- 新增 mic/camera 上行推流设置分辨率/码率
- 适配云端交互模式 touch 选项

**变更**

- 重构 cursor，删除 cursor-wrap 元素
- 针对设置了 forceShowCursor 参数后，右键/键盘操作，不锁定鼠标
- 修改移动端默认鼠标，用小蓝点表示 touch 位置
- 将移动端 touch 回调取值调整成 targetTouches

**修复**

- 修复由于 input focus 导致 cursor-wrap 计算错误问题
- 修复 forceShowCursor 设置不成功问题

### [1.1.5](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.5)@2022.06.23

**新增**

- 新增接口返回是否当前运行手游方案 getIsMobileGame
- 新增 cmd+v/ctrl+v 获取剪切板内容发送至云端输入框

**变更**

- 新增旋转事件通知 TCGSDK:VideoOrientation
- 重连默认开启
- 取消对部分老接口的兼容 onConnectSucc/onConnectFailed/onWebrtcStatChange/onInputStatusChanged/onCursorShowStatChanged，替换成新回调
- 同端口重复创建 customDatachannel，返回已创建信息

**修复**

- 修复由于重连导致多次事件绑定的 bug
- 由于旋转导致的摇杆位置偏移 bug

### [1.1.4](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.4)@2022.05.16

**新增**

- 新增init 参数 camera，用于摄像头上行推流
- 新增 getUserMedia 方法，返回 getUserMedia 的 MediaStream
- 新增虚拟键盘插件

**变更**

- 去掉init 参数 showLogo
- 移动端 setVideoVolume(0)，时自动静音
- 移动端横竖屏检测回调，提前到init 阶段

**修复**

- hook 模式下x/y 坐标计算问题
- plugin-joystick position 传0时，坐标计算问题

### [1.1.3](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.3)@2022.03.23

**新增**

- PC 端操作手游
- 移动端虚拟摇杆插件

**变更**

- 取消打印数据通道消息发送日志

**修复**

- Safari 下多次重连会导致连接不成功问题

### [1.1.2](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.2)@2022.02.21

**新增**

- 日志自动上报

**变更**

- 云端input 聚焦/脱焦逻辑修改
- 取消dataChannel send 数据长度限制

**修复**

- 修复日志上报时间戳不对问题
- iOS 点击屏幕声音卡顿问题

### [1.1.1](https://github.com/tencentyun/cloudgame-js-sdk/releases/tag/v1.1.1)@2021.11.18

**变更**

- debug 面板增加audio 相关信息
- init 参数 fullVideoToScreen 默认值改为 true，自动短边适配
- 减弱对init 参数mobileGame 的依赖，由SDK 内部判断 

**修复**

- 端游鼠标边界溢出后视图拉扯bug
- 修复移动端touch 事件重复监听bug
- iOS低版本，心跳问题

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

