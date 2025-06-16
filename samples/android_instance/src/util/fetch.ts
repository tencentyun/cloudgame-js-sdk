export const fetchPost = async <T, U>({
  url,
  data,
  timeout,
  headers,
  credentials = 'same-origin',
}: {
  url: string;
  data: T;
  timeout?: number;
  headers?: {
    [key: string]: string;
  };
  credentials?: 'same-origin' | 'include' | 'omit';
}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout ?? 1000 * 10);

  const response = await fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // * default, no-cache, reload, force-cache, only-if-cached
    credentials, // include, same-origin, *omit
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    signal: controller.signal,
  })
    .then((response: Response) => {
      // console.log('fetch response', response, url, data);
      if (response.status !== 200) {
        throw new Error(`status Code:${response.status}`);
      }

      return response.json() as U;
    })
    .catch((error: Error) => {
      if (error.name === 'AbortError') {
        throw new Error('request timeout');
      } else {
        throw new Error(`${error.name}: ${error.message}`);
      }
    });

  clearTimeout(id);
  return response;
};
