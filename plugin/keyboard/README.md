# 云游戏插件项目 - 虚拟键盘

接口描述见[申明文件（keyboard.d.ts）](./keyboard.d.ts)

## 使用方法

> 需结合TCGSDK 一起使用，使用前请确保TCGSDK 已被正常加载

1. import keyboard plugin 

    ```javascript
    import { keyboard } from 'plugin/keyboard/keyboard';
    ```
    或 script 标签引入
    ```javascript
    <script type="text/javascript" src="plugin/keyboard/keyboard.js"></script>
    ```

2. create keyboard, 具体参数可以参见申明文件 create 方法

    ```javascript
    const k = keyboard.create({});
    ```
    或使用全局变量
    ```javascript
    const j = CloudGamingPlugin.keyboard.create({});
    ```

3. 调用keyboard 方法

    ```javascript
    k.show();

    k.hide();

    k.destroy();
    ```


如有疑问和需求，可随时联系 ranpeng