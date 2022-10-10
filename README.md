简体中文| [English](README_EN-US.md)

# TCGSDK

`TCGSDK` 用于腾讯云渲染 Web 接入，支持端游，手游，云应用，虚拟直播。

## 功能介绍

`TCGSDK` 提供了丰富的接口，可用于定制化开发。目前包括生命周期，键鼠控制，音视频控制，游戏进程，数据通道，调试及日志相关接口。 

## 基础知识

接入前需要对云渲染就如流程有大致了解，可参考 [基本技术概念
](https://cloud.tencent.com/document/product/1547/75988)

## 云渲染接入功能流程说明

![url](https://ex.cloud-gaming.myqcloud.com/assets/images/docs/rcr-flow.png)

## 安装

直接 import dist/tcg-sdk，导出的为umd 格式

## 浏览器支持

云渲染基于 WebRTC 实现，依赖于操作系统和浏览器对于 WebRTC 的支持。

以外，浏览器采集音视频画面的功能在移动端支持较差，比如移动端浏览器不支持屏幕录制，iOS 14.3及以上版本才支持获取用户摄像头设备。

## Samples

可参考samples 文件夹下，Mobile/PC demo.

## Plugins

[虚拟摇杆](plugin/joystick/)

[虚拟键盘](plugin/keyboard/)

## 说明文档

[使用例子](samples/)

[快速入门](https://cloud.tencent.com/document/product/1162/46135)

[接口申明文件](dist/tcg-sdk//index.d.ts)

