import { v4 as uuidv4 } from 'uuid';
import { message } from 'tdesign-react';
import { fetchPost } from 'src/util/fetch';

const serverEnv = 'https://your-server-url';

export const CreateAndroidInstancesAccessToken = async ({
  AndroidInstanceIds = [],
  ExpirationDuration = '12h',
}: CreateAndroidInstancesAccessTokenRequest) => {
  // Gets more information from Tencent cloud API
  // https://cloud.tencent.com/document/api/1162/119708
  const url = `${serverEnv}/CreateAndroidInstancesAccessToken`;

  try {
    const { Error, Response: { Token, AccessInfo } = {} } = await fetchPost<
      CreateAndroidInstancesAccessTokenRequest,
      CreateAndroidInstancesAccessTokenResponse
    >({
      url,
      credentials: 'include',
      data: {
        RequestId: uuidv4(),
        AndroidInstanceIds,
        ExpirationDuration,
      },
    });

    if (!Error) {
      return {
        Token,
        AccessInfo,
      };
    }

    message.error({
      content: Error.Message,
    });
  } catch (error) {
    console.log('CreateAndroidInstancesAccessToken error', error);
  }
  return { Token: '', AccessInfo: '' };
};

interface CommonResponse {
  Error?: {
    Code: number;
    Message: string;
  };
}

interface CreateAndroidInstancesAccessTokenRequest {
  RequestId?: string;
  AndroidInstanceIds: string[];
  ExpirationDuration?: string; // default 12h
}

type CreateAndroidInstancesAccessTokenResponse = CommonResponse & {
  Response: {
    Token: string;
    AccessInfo: string;
  };
};
