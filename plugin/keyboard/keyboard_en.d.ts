export type TouchType = 'touchstart' | 'touchend' | 'touchcancel';

export interface OnTouchEventResponse {
  /**
   * The event type, which is read-only. Valid values: `touchstart`, `touchend`, `touchcancel`.
   */
  readonly type: TouchType;
  /**
   * The `key` of the key
   */
  readonly key: string;
  /**
   * The `code` of the key
   */
  readonly code: number;
}

export interface KeyboardConfig {
  /**
   * The keyboard mount node. Default value: TCGSDK init param `mount`.
   */
  zone?: HTMLElement;
  /**
   * Whether to send the keyboard data automatically. Default value: `true`.
   */
  sendData?: boolean;
  /**
   * The frame color of a key. Default value: `#4a525a`.
   */
  keyBorderColor?: any;
  /**
   * The frame color of a pressed key. Default value: `#2684FF`
   */
  keyPressedBorderColor?: any;
  /**
   * Keyboard  OnTouchEventResponse
   */
  onTouchEvent?: (response: OnTouchEventResponse) => void;
}

/**
 *
 * Virtual keyboard
 *
 * It relies on TCGSDK. We recommend you use it in the callback function onConnectSuccess in TCGSDK.init.
 *
 * @param {Object} params
 * @param {HTMLElement} [params.zone=TCGSDK init param `mount`] - The keyboard mount node. Default value: TCGSDK init param `mount`.
 * @param {boolean} [params.sendData=true] - Whether to send the keyboard data automatically. Default value: `true`.
 * @param {string} [params.keyBorderColor='#4a525a'] - The frame color of a key. Default value: `#4a525a`.
 * @param {Object} [params.keyPressedBorderColor='#2684FF'] - The frame color of a pressed key. Default value: `#2684FF`
 * @param {Function} [params.onTouchEvent] - Keyboard OnTouchEventResponse
 *
 * @description
 * OnTouchEventResponse：
 *
 * | Name    | Type       | Description                                                     |
 * | ------- | ---------- | --------------------------------------------------------------- |
 * | type    | string     | The event type, which is read-only. Valid values: `touchstart`, `touchend`, `touchcancel`.    |
 * | key     | string     | The `key` of the key, which is read-only.                                      |
 * | code    | string     | The `code` of the key, which is read-only.
 *
 * @example
 * new Keyboard({});
 */
declare class Keyboard {
  constructor(params: KeyboardConfig);
  /**
   * This API is used to display the virtual keyboard.
   */
  show(): void;
  /**
   * This API is used to hide the virtual keyboard.
   */
  hide(): void;
  /**
   * This API is used to terminate the virtual keyboard and delete the corresponding node (to use the virtual keyboard again, you need to create a new one).
   */
  destroy(): void;
}

export default Keyboard;
