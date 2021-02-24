export const addAuth2Header = (url: string, options: any) => {
  let auth_Token = localStorage.getItem('authorization');
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: '*/*',
    authorization: auth_Token,
  };
    // 如果是上传文件的话
  if(url.indexOf('upload') != -1) { 
    delete headers["Content-Type"]
  }
  return {
    url,
    options: { ...options, headers },
  };
};

// 错误码转义
// (response ) => {

// }

//
