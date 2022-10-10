# Virtual joystick

The virtual joystick plugin can be instantiated directly.

Detailed description of [interface(joystick.d.ts)](./joystick.d.ts).

## Usage

> It relies on TCGSDK. We recommend you use it in the callback function onConnectSuccess in TCGSDK.init.

1. import joystick plugin 

    ```javascript
    import Joystick from 'plugin/joystick/joystick';
    ```
    or use script tag
    ```javascript
    <script type="text/javascript" src="plugin/joystick/joystick.js"></script>
    ```

2. Instantiating the joystick

    ```javascript
    const j = new Joystick({
        zone: document.querySelector('#your-element')
    });
    ```
    or use global variables
    ```javascript
    const j = new CloudGamingPlugin.joystick({
        zone: document.querySelector('#your-element')
    });
    ```

3. Listening for events(if sendData is true (default value true), the plugin will automatically send the corresponding command)

    ```javascript
    j.on('move', (data) => {
        const { degree } = data.angle;
        console.log('degree', degree);
    });
    ```


If you have any questions or needs, please feel free to contact ranpeng.