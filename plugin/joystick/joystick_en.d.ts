export interface JoystickConfig {
  /**
   * TCGSDK. Default value: window.TCGSDK, if you need to customize sdk, please pass in the custom sdk instance.
   */
  sdk?: TCGSDK;
  /**
   * The joystick mount node. Default value: `document.body`.
   */
  zone?: HTMLElement;
  /**
   * The joystick size. Default value: 100px.
   */
  size?: number;
  /**
   * The position relative to the mount node. Default value: {top: 50, left: 50} (centered based on `size`).
   */
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  /**
   * Whether to lock the movement on the X axis. Default value: `false`.
   */
  lockX?: boolean;
  /**
   * Whether to lock the movement on the Y axis. Default value: `false`.
   */
  lockY?: boolean;
  /**
   * Whether to set the joystick style to WASD or up, down, left, and right. Default value: `dpad_wasd`.
   */
  type?: 'dpad_wasd' | 'dpad_updown';
  /**
   * Whether to send data automatically. Default value: `true`.
   */
  sendData?: boolean;
  /**
   * The joystick background image, which is an HTTP/HTTPS address.
   *
   * If this parameter is not specified, the default image will be used.
   *
   * @back base image
   * @front button image
   * @frontPressed image of a pressed button
   */
  joystickImage?: {
    back?: string;
    front?: string;
    frontPressed?: string;
  };
  /**
   *  Whether to reset the stick after `touchend`. Default value: `true`.
   */
  restJoystick?: boolean;
  /**
   * Operation threshold, not yet enabled
   */
  threshold?: number;
  /**
   * Fade animation time, not yet enabled
   */
  fadeTime?: number;
}

/**
 * Joystick event types.
 */
export type JoystickEventTypes = 'start' | 'move' | 'end' | 'added';

export interface JoystickOutputData {
  angle: {
    degree: number;
    radian: number;
  };
  distance: number;
  force: number;
  identifier: number;
  lockX: boolean;
  lockY: boolean;
  position: {
    x: number;
    y: number;
  };
  pressure: number;
  raw: {
    distance: number;
    position: {
      x: number;
      y: number;
    };
  };
  vector: {
    x: number;
    y: number;
  };
  direction?: {
    angle: string;
    x: string;
    y: string;
  };
}

/**
 *
 * [Virtual joystick](https://github.com/tencentyun/cloudgame-js-sdk/tree/master/plugin/joystick)
 *
 * It relies on TCGSDK. We recommend you use it in the callback function `onConnectSuccess` in `TCGSDK.init`.
 *
 * @param {Object} params
 * @param {HTMLElement} [params.zone=document.body] - The joystick mount node. Default value: `document.body`.
 * @param {number} [params.size=100] - The joystick size. Default value: 100px.
 * @param {Object} [params.position] - The position relative to the mount node. Default value: {top: 50, left: 50} (centered based on `size`).
 * @param {number} [params.position.top=50] - top
 * @param {number} [params.position.left=50] - left
 * @param {number} [params.position.bottom] - bottom
 * @param {number} [params.position.right] - right
 * @param {boolean} [params.lockX=false] - Whether to lock the movement on the X axis. Default value: `false`.
 * @param {boolean} [params.lockY=false] - Whether to lock the movement on the Y axis. Default value: `false`.
 * @param {boolean} [params.sendData=true] - Whether to send data automatically. Default value: `true`.
 * @param {('dpad_wasd'|'dpad_updown')} [params.type='dpad_wasd'] - Whether to set the joystick style to WASD or up, down, left, and right. Default value: `dpad_wasd`.
 * @param {Object} [params.joystickImage] -The joystick background image, which is an HTTP/HTTPS address. If this parameter is not specified, the default image will be used.
 * @param {string} [params.joystickImage.back] - The base image, which is an HTTP/HTTPS address. If this parameter is not specified, the default image will be used.
 * @param {string} [params.joystickImage.front] - The button image, which is an HTTP/HTTPS address. If this parameter is not specified, the default image will be used.
 * @param {string} [params.joystickImage.frontPressed] - The image of a pressed button, which is an HTTP/HTTPS address. If this parameter is not specified, the default image will be used.
 * @param {boolean} [params.restJoystick=true] - Whether to reset the stick after `touchend`. Default value: `true`.
 *
 * @example
 * // If import plugin from `Script tag`.
 * const j = new CloudGamingPlugin.joystick({
 *  zone: document.querySelector('#plugin-point'),
 * });
 *
 *
 * // If import plugin from `ES module import`
 * const j = new Joystick({zone: document.querySelector('#plugin-point')})
 *
 */
class Joystick {
  constructor(params: JoystickConfig);
  /**
   * This API is used to listen on joystick events.
   *
   * @param {Joystick~JoystickEventTypes} type - The event to be listened on
   * @param {Joystick~JoystickOutputData} handler - The response data of the callback function, which is of the `JoystickOutputData` type.
   *
   */
  on<T extends JoystickEventTypes>(
    type: T,
    handler: (data: T extends 'move' ? JoystickOutputData : null) => void,
  ): void;
  /**
   * Destroy
   */
  destroy(): void;
}

export default Joystick;

// The following statements are for document generation only

/**
 * Joystick event types.
 *
 * @typedef {('start'|'move'|'end'|'added')} Joystick~JoystickEventTypes
 *
 */

/**
 * Joystick callback data structure.
 *
 * @callback Joystick~JoystickOutputData
 * @param {Object} data
 * @param {Object} data.angle - The angle information
 * @param {number} data.angle.degree
 * @param {number} data.angle.radian
 * @param {number} data.distance
 * @param {number} data.force
 * @param {number} data.identifier - id
 * @param {boolean} data.lockX
 * @param {boolean} data.lockY
 * @param {Object} data.position
 * @param {number} data.position.x
 * @param {number} data.position.y
 * @param {Object} data.raw
 * @param {number} data.raw.distance
 * @param {Object} data.raw.position
 * @param {number} data.raw.position.x
 * @param {number} data.raw.position.y
 * @param {Object} data.vector
 * @param {number} data.vector.x
 * @param {number} data.vector.y
 * @param {Object} data.direction
 * @param {number} data.direction.angle
 * @param {number} data.direction.x
 * @param {number} data.direction.y
 */
