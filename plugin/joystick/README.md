# 云渲染插件项目 - 摇杆

接口描述见[申明文件（joystick.d.ts）](./joystick.d.ts)

## 使用方法

> 需结合TCGSDK 一起使用，使用前请确保TCGSDK 已被正常加载

1. import joystick plugin 

    ```javascript
    import { joystick } from 'plugin/joystick/joystick';
    ```
    或 script 标签引入
    ```javascript
    <script type="text/javascript" src="plugin/joystick/joystick.js"></script>
    ```

2. create joystick, 具体参数可以参见申明文件 create 方法

    ```javascript
    const j = joystick.create({
        zone: document.querySelector('#your-element')
    });
    ```
    或使用全局变量
    ```javascript
    const j = CloudGamingPlugin.joystick.create({
        zone: document.querySelector('#your-element')
    });
    ```

3. 监听对应事件（如果sendData 为true（默认值 true），插件会自动发送对应指令）

    ```javascript
    j.on('move', (data) => {
        const { degree } = data.angle;
        console.log('degree', degree);
    });
    ```


如有疑问和需求，可随时联系 ranpeng