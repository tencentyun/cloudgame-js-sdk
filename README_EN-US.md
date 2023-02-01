English | [简体中文](./README.md)


# TCGSDK

`TCGSDK` is used to connect to Real-Time Cloud Rendering on web and supports PC and mobile games, cloud applications, and virtual live streaming.

## Feature description

`TCGSDK` provides a wide variety of APIs for custom development, including lifecycle, keyboard and mouse control, audio/video control, game process, data channel, debugging, and log APIs. 

## Basics

Before connection, see [Basic Technical Concepts](https://www.tencentcloud.com/document/product/1158/49611) for basic information about the Real-Time Cloud Rendering connection process.

## Real-Time Cloud Rendering connection process

![url](https://qcloudimg.tencent-cloud.cn/raw/dec8b73715e1a2e80f62a298fffba0e0.jpg)

## Installation

Directly run `import dist/tcg-sdk`. The SDK is exported as a .umd file.

## Browser support

Real-Time Cloud Rendering relies on WebRTC and therefore can only be used on OS and browsers that support WebRTC.

Moreover, the audio/video capturing feature is poorly supported on mobile browsers. For example, mobile browsers don't support screen recording, and only iOS 14.3 and later allow requesting camera access.

## Samples

For more information, see the mobile and PC demos in the `samples` folder.

## Plugins

[Virtual stick](plugin/joystick/)

[Virtual keyboard](plugin/keyboard/)

## Documentation

[Interface Documents](https://ex.cloud-gaming.myqcloud.com/cloud_gaming_web/docs_en/index.html)

[Use Samples](samples/)

[Getting Started](https://www.tencentcloud.com/document/product/1158/49612)

[API Declaration File](dist/tcg-sdk//index_en.d.ts)

