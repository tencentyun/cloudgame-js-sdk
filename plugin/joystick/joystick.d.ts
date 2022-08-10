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

/**
 * 摇杆事件类型
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
 * 摇杆实例
 */
interface JoystickInstance {
  /**
   * 监听摇杆事件，传如对应 handler 获取回调数据
   *
   * @function
   *
   * @param {JoystickEventTypes} type - 对应的监听事件
   * @param {JoystickInstance~JoystickOutputData} handler - 回调函数 response data JoystickOutputData
   *
   */
  on<T extends JoystickEventTypes>(
    type: T,
    handler: (data: T extends 'move' ? JoystickOutputData : null) => void,
  ): void;
  /**
   * destroy 销毁触发
   *
   * @function
   */
  destroy(): void;
}

/**
 * 摇杆类
 */
export class Joystick {
  /**
   * @param {Object} params
   * @param {HTMLElement} [params.zone=document.body] - 摇杆挂载节点，默认 document.body
   * @param {number} [params.size=100] - 摇杆尺寸，默认 `100px`
   * @param {Object} [params.position] - 相对于挂载节点的位置，默认值 `{top: 50, left: 50}`，及根据size 剧中
   * @param {number} [params.position.top=50] - top
   * @param {number} [params.position.left=50] - left
   * @param {number} [params.position.bottom] - bottom
   * @param {number} [params.position.right] - right
   * @param {boolean} [params.lockX=false] - 锁定X 轴移动, 默认值 `false`
   * @param {boolean} [params.lockY=false] - 锁定Y 轴移动, 默认值 `false`
   * @param {('dpad_wasd'|'dpad_updown')} [params.type='dpad_wasd'] - 两种摇杆样式 wasd/上下左右, 默认值 `dpad_wasd`
   * @param {Object} [params.joystickImage] - 摇杆背景图， http/https 地址，不填采用默认图片
   * @param {string} [params.joystickImage.back] - 底图
   * @param {string} [params.joystickImage.front] - 按钮图
   * @param {string} [params.joystickImage.frontPressed] - 按钮被按下后的图片
   * @param {boolean} [params.restJoystick=true] - end 后复位摇杆，默认值 `true`
   */
  create(params: CreateConfig): JoystickInstance;
}

export declare const joystick: Joystick;

/**
 * 摇杆回调数据结构
 *
 * @callback JoystickInstance~JoystickOutputData
 * @param {Object} data
 * @param {Object} data.angle - 角度信息
 * @param {number} data.angle.degree - 角度
 * @param {number} data.angle.radian - 半径
 * @param {number} data.distance = 距离
 * @param {number} data.force - 力度
 * @param {number} data.identifier - id 唯一标识
 * @param {boolean} data.lockX - 锁定 X 轴
 * @param {boolean} data.lockY - 锁定 Y 轴
 * @param {Object} data.position - 位置信息
 * @param {number} data.position.x - x 坐标
 * @param {number} data.position.y - y 坐标
 * @param {Object} data.raw - 原始信息
 * @param {number} data.raw.distance - 距离
 * @param {Object} data.raw.position - 位置信息
 * @param {number} data.raw.position.x - x 坐标
 * @param {number} data.raw.position.y - y 坐标
 * @param {Object} data.vector - 向量
 * @param {number} data.vector.x - x
 * @param {number} data.vector.y - y
 * @param {Object} data.direction - 方向
 * @param {number} data.direction.angle - 角度
 * @param {number} data.direction.x - x
 * @param {number} data.direction.y - y
 */
