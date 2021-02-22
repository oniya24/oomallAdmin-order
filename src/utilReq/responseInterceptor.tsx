import { history } from 'umi';
import { message } from 'antd';
export const handleErrorMsg = async (response: any) => {
  // errno
  const res = await response.clone().json();
  // 请求成功但是处理未成功的内容
  const { errno, code, errmsg } = res;
  if ((code && code !== 'OK') || (errno && errno !== 0)) {
    message.error(errmsg);
  }

  return response;
};
