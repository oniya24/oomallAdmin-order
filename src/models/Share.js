import {
  getAllShareReq,
  postCreateShareReq,
  putModifyShareReq,
  deleteShareReq,
  putOnshelvesShareReq,
} from '@/service/Share.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'share';
const model = {
  namespace,
  state: {
    shareList: [
      {
        id: 'string',
        sharerId: 'string',
        sku: {
          id: 0,
          name: 'string',
          skuSn: 'string',
          imageUrl: 'string',
          inventory: 0,
          originalPrice: 0,
          price: 0,
          disable: false,
        },
        quantity: 0,
        gmtCreate: 0,
      },
    ],
    shareTotal: 0,
    sharePage: 1,
    sharePageSize: 10,
  },
  effects: {
    *getAllShare({ payload }, { call, put }) {
      const res = yield call(getAllShareReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            shareTotal: total,
            shareList: list,
          },
        });
      }
    },
    *postCreateShare({ payload }, { call, put }) {
      const res = yield call(postCreateShareReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *putModifyShare({ payload }, { call, put }) {
      const res = yield call(putModifyShareReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deleteShare({ payload }, { call, put }) {
      const res = yield call(deleteShareReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *putOnshelvesShare({ payload }, { call, put }) {
      const res = yield call(putOnshelvesShareReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上架成功');
      }
    },
    *putOffshelvesShare({ payload }, { call, put }) {
      const res = yield call(putOffshelvesShareReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('下架成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          sharePage: page,
          sharePageSize: pageSize,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export const mapStateToProps = defaultMapStateToProps(model);
export const mapDispatchToProps = defaultMapDispatchToProps(model);
export default model;
