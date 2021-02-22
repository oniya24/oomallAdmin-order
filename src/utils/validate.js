import { message } from 'antd';
export const isErrnoEqual0 = res => {
  const { errno } = res;
  return Number(errno) === 0;
};

export const isCodeEqualOk = res => {
  const { code } = res;
  return code === 'OK';
};
