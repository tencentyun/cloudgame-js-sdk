import React, { useEffect, useState } from 'react';
import { Button, Tooltip, Dropdown } from 'tdesign-react';
import {
  RollbackIcon,
  HomeIcon,
  MenuApplicationIcon,
  SoundUpIcon,
  SoundDownIcon,
  VideoLibraryIcon,
  ChevronDownIcon,
  StarIcon,
  EllipsisIcon,
  TextboxIcon,
} from 'tdesign-icons-react';
import { CloudGamingWebSDK } from '../../../../dist/tcg-sdk/index';
import { CreateAndroidInstancesAccessToken } from './network';

const enum CloudGameKeys {
  KEY_BACK = 158,
  KEY_MENU = 139,
  KEY_HOME = 172,
  KEYCODE_VOLUME_UP = 0x3a,
  KEYCODE_VOLUME_Down = 0x3b,
}

// TCGSDK Docs
// https://ex-cloud-gaming.crtrcloud.com/cloud_gaming_web/docs/CloudGamingWebSDK.html
const TCGSDK = new CloudGamingWebSDK();

// AndroidInstance interface
// https://ex-cloud-gaming.crtrcloud.com/cloud_gaming_web/docs/AndroidInstance.html
const AndroidInstance = TCGSDK.getAndroidInstance();

let slice_point = 3;

export function AndroidInstancePage() {
  const [imageList, setImageList] = useState<{ instanceId: string; url: string }[]>([]);
  const [androidInstanceIds, setAndroidInstanceIds] = useState<string[]>([]);
  const [masterInstanceId, setMasterInstanceId] = useState<string>('');

  useEffect(() => {
    // Android Instance ID List
    const instanceIds = [
      'cai-xxx1',
      'cai-xxx2',
      'cai-xxx3',
      'cai-xxx4',
      'cai-xxx5',
      'cai-xxx6',
      'cai-xxx7',
      'cai-xxx8',
    ];

    setAndroidInstanceIds(instanceIds);
    setMasterInstanceId(instanceIds[0]);

    CreateAndroidInstancesAccessToken({
      AndroidInstanceIds: instanceIds,
    }).then(({ AccessInfo, Token }) => {
      console.log('AccessInfo', AccessInfo, 'Token', Token);
      startTCGSDK({ instanceIds, accessToken: { accessInfo: AccessInfo, token: Token } });
    });
  }, []);

  const startTCGSDK = async ({
    instanceIds,
    accessToken,
  }: {
    instanceIds: string[];
    accessToken: { accessInfo: string; token: string };
  }) => {
    TCGSDK.init({
      appid: 0,
      mount: `car-mount-point-instance-master`,
      mobileGame: true,
      debugSetting: {
        showLog: true,
      },
      streaming: {
        mode: 'webrtc',
      },
      accessToken,
      loadingText: 'Starting...',
      // 连接成功回调
      onConnectSuccess: async () => {},
      // 网络中断/被踢触发此回调
      onDisconnect: () => {
        console.log('onDisconnect');
      },
      onConnectFail: () => {
        console.log('onConnectFail');
      },
      onInitSuccess: async () => {
        console.log('%c onInitSuccess', 'color: red');

        // group control
        // TCGSDK.access({
        //   instanceIds: instanceIds.slice(0, slice_point),
        //   groupControl: true,
        // });

        // single control
        TCGSDK.access({
          instanceId: instanceIds[0],
        });
      },
      onImageEvent: ({ data }) => {
        setImageList(data);
      },
      // onAndroidInstanceEvent: (data) => {
      //   console.log('onAndroidInstanceEvent', data);
      // },
    });
  };

  return (
    <>
      <main className="w-full h-full">
        <header className="sticky top-0 left-0 flex items-center py-[10px] px-[20px] border-b border-[#e8e8e8] h-[56px] box-border font-bold">
          <div className="title">Group Control</div>
          <div className="ml-auto flex">
            <Button
              className="mr-6"
              onClick={() => {
                AndroidInstance.joinGroupControl({
                  instanceIds: androidInstanceIds.slice(slice_point, slice_point + 1),
                });

                slice_point = slice_point + 1;
              }}
            >
              {'join'}
            </Button>
            <Button
              className="mr-6"
              onClick={() => {
                AndroidInstance.leaveGroupControl({
                  instanceIds: androidInstanceIds.slice(slice_point - 1, slice_point),
                });
              }}
            >
              {'leave'}
            </Button>

            <Dropdown
              trigger="hover"
              className="[&_li]:!max-w-none"
              options={[
                {
                  content: (
                    <Button
                      variant="text"
                      onClick={() => {
                        AndroidInstance.startSync({
                          instanceIds: [androidInstanceIds[0], androidInstanceIds[1]],
                        });
                      }}
                    >
                      startSync
                    </Button>
                  ),
                },
                {
                  content: (
                    <Button
                      variant="text"
                      onClick={() => {
                        AndroidInstance.stopSync();
                      }}
                    >
                      stopSync
                    </Button>
                  ),
                },
                {
                  content: (
                    <Button
                      variant="text"
                      onClick={async () => {
                        const data: any = {};
                        androidInstanceIds.forEach((a) => {
                          data[a] = {
                            Width: 720,
                            Height: 1280,
                          };
                        });

                        AndroidInstance.setResolution({
                          ...data,
                        });
                      }}
                    >
                      setResolution
                    </Button>
                  ),
                },
              ]}
            >
              <Button variant="text" theme="primary" suffix={<ChevronDownIcon size="16" />}>
                {'Operators'}
              </Button>
            </Dropdown>
          </div>
        </header>
        <div className="flex relative w-full h-[calc(100vh-56px)]">
          <div className="flex my-0 mx-[10px] h-full">
            <div className="w-[360px] relative">
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                {'Set android instance as the master'}
              </div>
              <div id="car-mount-point-instance-master"></div>
            </div>
            <div className="relative w-[40px] h-full border-l border-r border-solid border-[#e5e7eb]">
              <div className="absolute left-0 bottom-0 w-[40px] flex flex-col justify-center items-center py-[20px] px-0 [&>svg]:mt-[20px] [&>svg]:cursor-pointer">
                <Tooltip content={'Back'} showArrow={false}>
                  <RollbackIcon
                    size={20}
                    onClick={() => {
                      TCGSDK.sendKeyboardEvent({ key: CloudGameKeys.KEY_BACK, down: true });
                      TCGSDK.sendKeyboardEvent({ key: CloudGameKeys.KEY_BACK, down: false });
                    }}
                  />
                </Tooltip>
                <Tooltip content={'Home'} showArrow={false}>
                  <HomeIcon
                    size={20}
                    onClick={() => {
                      TCGSDK.sendKeyboardEvent({ key: CloudGameKeys.KEY_HOME, down: true });
                      TCGSDK.sendKeyboardEvent({ key: CloudGameKeys.KEY_HOME, down: false });
                    }}
                  />
                </Tooltip>
                <Tooltip content={'Menu'} showArrow={false}>
                  <MenuApplicationIcon
                    size={20}
                    onClick={() => {
                      TCGSDK.sendKeyboardEvent({ key: CloudGameKeys.KEY_MENU, down: true });
                      TCGSDK.sendKeyboardEvent({ key: CloudGameKeys.KEY_MENU, down: false });
                    }}
                  />
                </Tooltip>
                <Tooltip content={'Sound Up'} showArrow={false}>
                  <SoundUpIcon
                    size={20}
                    onClick={() => {
                      TCGSDK.sendKeyboardEvent({ key: CloudGameKeys.KEYCODE_VOLUME_UP, down: true });
                      TCGSDK.sendKeyboardEvent({ key: CloudGameKeys.KEYCODE_VOLUME_UP, down: false });
                    }}
                  />
                </Tooltip>
                <Tooltip content={'Sound Down'} showArrow={false}>
                  <SoundDownIcon
                    size={20}
                    onClick={() => {
                      TCGSDK.sendKeyboardEvent({ key: CloudGameKeys.KEYCODE_VOLUME_Down, down: true });
                      TCGSDK.sendKeyboardEvent({ key: CloudGameKeys.KEYCODE_VOLUME_Down, down: false });
                    }}
                  />
                </Tooltip>
                <Dropdown
                  options={[
                    {
                      content: 'High',
                      value: 'high',
                    },
                    {
                      content: 'Normal',
                      value: 'normal',
                    },
                    {
                      content: 'Low',
                      value: 'low',
                    },
                  ]}
                  onClick={(data) => {
                    const level = data.value as 'high' | 'normal' | 'low';

                    AndroidInstance.requestStream({
                      instanceId: masterInstanceId,
                      status: 'open',
                      level,
                    });
                  }}
                >
                  <div className="mt-[20px] cursor-pointer">
                    <VideoLibraryIcon size={20} />
                  </div>
                </Dropdown>
                <Dropdown
                  options={[
                    {
                      content: '云端输入法',
                      value: 'cloud',
                    },
                    {
                      content: '本地输入法',
                      value: 'local',
                    },
                  ]}
                  onClick={(data) => {
                    console.log(data.value);
                    const ime = data.value as 'cloud' | 'local';

                    AndroidInstance.switchIME({ ime });
                  }}
                >
                  <div className="mt-[20px]">
                    <TextboxIcon size={20} />
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="h-full overflow-scroll">
            <div className="flex flex-wrap">
              {imageList.map(({ instanceId, url }, i) => (
                <div className="relative p-[10px] w-[236px]" key={i}>
                  <div className="w-full h-[384px] relative rounded-md">
                    {masterInstanceId === instanceId ? (
                      <div className="absolute top-0 left-0 right-0 bottom-0 z-1 bg-white flex justify-center items-center font-bold">
                        <div>
                          <StarIcon /> Master
                        </div>
                      </div>
                    ) : (
                      <img className="w-full rounded-md" src={url} alt={instanceId} />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>id: {instanceId}</div>
                    <Dropdown
                      trigger="hover"
                      className="[&_li]:!max-w-none"
                      placement="bottom-right"
                      options={[
                        {
                          content: (
                            <Tooltip content={masterInstanceId ? '' : 'Start sync first'} showArrow={false}>
                              <Button
                                variant="text"
                                onClick={() => {
                                  AndroidInstance.setMaster({ instanceId });
                                  setMasterInstanceId(instanceId);
                                }}
                              >
                                setMaster
                              </Button>
                            </Tooltip>
                          ),
                        },
                        {
                          content: (
                            <Button
                              variant="text"
                              onClick={async () => {
                                AndroidInstance.setResolution({
                                  [instanceId]: {
                                    Width: 720,
                                    Height: 1280,
                                  },
                                });
                              }}
                            >
                              setResolution
                            </Button>
                          ),
                        },
                      ]}
                    >
                      <EllipsisIcon size={20} className=" cursor-pointer" />
                    </Dropdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
