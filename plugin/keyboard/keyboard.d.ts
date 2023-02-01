export type TouchType = 'touchstart' | 'touchend' | 'touchcancel';

export interface OnTouchEventResponse {
  /**
   * 事件类型，可选择 'touchstart'，'touchend'，'touchcancel' 三种之一
   */
  readonly type: TouchType;
  /**
   * 按键对应的 key
   */
  readonly key: string;
  /**
   * 按键对应的 code
   */
  readonly code: number;
}

export interface KeyboardConfig {
  /**
   * 摇杆挂载节点，默认 TCGSDK init 参数传入的 mount 节点
   */
  zone?: HTMLElement;
  /**
   * 自动发送键盘数据 默认值 true
   */
  sendData?: boolean;
  /**
   * 按键边框颜色 默认 #4a525a
   */
  keyBorderColor?: any;
  /**
   * 按下时边框颜色 默认 #2684FF
   */
  keyPressedBorderColor?: any;
  /**
   * Keyboard  OnTouchEventResponse
   * 点击回调
   */
  onTouchEvent?: (response: OnTouchEventResponse) => void;
}

/**
 * @class
 *
 * 虚拟键盘
 *
 * 依赖 TCGSDK 使用，建议在 TCGSDK.init 内的回调函数 onConnectSuccess 中使用
 *
 * @param {Object} params
 * @param {HTMLElement} [params.zone=TCGSDK init param `mount`] - 摇杆挂载节点，默认 TCGSDK init 参数传入的 mount 节点
 * @param {boolean} [params.sendData=true] - 自动发送键盘数据 默认值 true
 * @param {string} [params.keyBorderColor='#4a525a'] - 按键边框颜色 默认 '#4a525a'
 * @param {Object} [params.keyPressedBorderColor='#2684FF'] - 按下时边框颜色 默认 '#2684FF'
 * @param {Function} [params.onTouchEvent] - Keyboard  OnTouchEventResponse
 *
 * @description
 * 关于OnTouchEventResponse，具体如下：
 *
 * | Name    | Type       | Description                                                     |
 * | ------- | ---------- | --------------------------------------------------------------- |
 * | type    | string     | (readonly) 事件类型，可选择 touchstart 、touchend 、touchcancel    |
 * | key     | string     | (readonly) 按键对应的 key                                        |
 * | code    | string     | (readonly) 按键对应的 code
 *
 * @example
 * new Keyboard({});
 */
declare class Keyboard {
  constructor(params: KeyboardConfig);
  /**
   * 显示虚拟键盘
   */
  show(): void;
  /**
   * 隐藏虚拟键盘
   */
  hide(): void;
  /**
   * 销毁虚拟键盘，删除对应节点（如要再次使用需要重新创建）
   */
  destroy(): void;
}

export default Keyboard;
