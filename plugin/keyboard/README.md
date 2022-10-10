# Virtual keyboard

The virtual keyboard plugin can be instantiated directly.

Detailed description of [interface(keyboard.d.ts)](./keyboard.d.ts).

## Usage

> It relies on TCGSDK. We recommend you use it in the callback function onConnectSuccess in TCGSDK.init.

1. import keyboard plugin 

    ```javascript
    import Keyboard from 'plugin/keyboard/keyboard';
    ```
    or use script tag
    ```javascript
    <script type="text/javascript" src="plugin/keyboard/keyboard.js"></script>
    ```

2. Instantiating the keyboard

    ```javascript
    const k = new Keyboard();
    ```
    or use global variables
    ```javascript
    const k = new CloudGamingPlugin.keyboard();
    ```

3. Calling the keyboard method

    ```javascript
    k.show();

    k.hide();

    k.destroy();
    ```


If you have any questions or needs, please feel free to contact ranpeng.