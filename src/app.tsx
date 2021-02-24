import { history, RequestConfig } from 'umi';
import { addAuth2Header } from './utilReq/requestInterceptor';
import { handleErrorMsg } from './utilReq/responseInterceptor';
import { errorHandler } from './utilReq/errorHandler';
import { BASEURL } from '@/const/router';

export function render(oldRender: () => void) {
  oldRender();
}

export const request: RequestConfig = {
  timeout: 5000,
  mode: 'cors',
  prefix: BASEURL,
  errorHandler,
  errorConfig: {
    adaptor: resData => {
      return {
        ...resData,
        success: resData.ok,
        errorMessage: resData.message,
      };
    },
  },
  requestInterceptors: [
    // addBaseUrl,
    addAuth2Header,
  ],
  responseInterceptors: [handleErrorMsg],
};

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('privilege bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('privilege mount', props);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('privilege unmount', props);
  },
};
