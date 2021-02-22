export const addAuth2Header = (url: string, options: any) => {
  let auth_Token = localStorage.getItem('authorization');
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: '*/*',
    authorization: auth_Token,
  };
  return {
    url,
    options: { ...options, headers },
  };
};

// 错误码转义
// (response ) => {

// }

//
