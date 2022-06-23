export interface CreateConfig {
  /**
   * 摇杆挂载节点，默认 document.body
   */
  zone?: HTMLElement;
  /**
   * 摇杆尺寸，默认 `100px`
   */
  size?: number;
  /**
   * 相对于挂载节点的位置
   * 默认值 `{top: 50, left: 50}`，及根据size 剧中
   */
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  /**
   * 锁定X 轴移动, 默认值 `false`
   */
  lockX?: boolean;
  /**
   * 锁定Y 轴移动, 默认值 `false`
   */
  lockY?: boolean;
  /**
   * 两种摇杆样式 wasd/上下左右, 默认值 `dpad_wasd`
   */
  type?: 'dpad_wasd' | 'dpad_updown';
  /**
   * 是否自动发送移动数据, 默认值 `true`
   */
  sendData?: boolean;
  /**
   * 摇杆背景图， http/https 地址
   * 不填采用默认图片
   * @back 底图
   * @front 按钮图
   * @frontPressed 按钮被按下后的图片
   */
  joystickImage?: {
    back?: string;
    front?: string;
    frontPressed?: string;
  };
  /**
   * end 后复位摇杆，默认值 `true`
   */
  restJoystick?: boolean;
  /**
   * 操作阀值，暂未启用
   */
  threshold?: number;
  /**
   * fade 动画时间，暂未启用
   */
  fadeTime?: number;
  /**
   * 根据android 编辑倒出的json 数据显示摇杆，暂未启用
   */
  configJson?: any; // 有android 端倒出的json 文件
}

export type JoystickEventTypes = 'start' | 'move' | 'end' | 'added';

/**
 * 摇杆move 时候返回的数据
 */
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

export interface Joystick {
  /**
   * @param type 对应的事件
   * @param handler 回调函数
   */
  on<T extends JoystickEventTypes>(
    type: T,
    handler: (data: T extends 'move' ? JoystickOutputData : null) => void,
  ): void;
  destroy(): void;
}

declare class JoystickStatic {
  create(params: CreateConfig): Joystick;
}

export declare const joystick: JoystickStatic;
