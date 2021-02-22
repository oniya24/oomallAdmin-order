import {
  getAllAftersalesReq,
  getAftersalesByIdReq,
  putConfirmAftersalesReq,
  putReceiveAftersalesReq,
  putDeliverAftersalesReq,
} from '@/service/Aftersale.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'aftersale';
const model = {
  namespace,
  state: {
    aftersaleList: [
      {
        id: 0,
        orderId: 0,
        orderItemId: 0,
        customerId: 0,
        shopId: 'string',
        serviceSn: 'string',
        type: 0,
        reason: 'string',
        refund: 0,
        quantity: 0,
        regionId: 0,
        detail: 'string',
        consignee: 'string',
        mobile: 'string',
        customerLogSn: 'string',
        shopLogSn: 'string',
        state: 1,
      },
    ],
    aftersaleInfo: {
      id: 0,
      orderId: 0,
      orderItemId: 0,
      skuId: 0,
      skuName: 'string',
      customerId: 0,
      shopId: 0,
      serviceSn: 'string',
      type: 0,
      reason: 'string',
      refund: 0,
      quantity: 0,
      regionId: 0,
      detail: 'string',
      consignee: 'string',
      mobile: 'string',
      customerLogSn: 'string',
      shopLogSn: 'string',
      state: 2,
    },
    aftersaleTotal: 0,
    aftersalePage: 1,
    aftersalePageSize: 10,
  },
  effects: {
    *getAllAftersales({ payload }, { call, put }) {
      const res = yield call(getAllAftersalesReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            aftersaleList: list,
            aftersaleTotal: total,
          },
        });
      }
    },
    *getAftersalesById({ payload }, { call, put }) {
      const res = yield call(getAftersalesByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: {
            aftersaleInfo: data,
          },
        });
      }
    },
    *putConfirmAftersales({ payload }, { call, put }) {
      const res = yield call(getAftersalesByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('确认订单');
      }
    },
    *putReceiveAftersales({ payload }, { call, put }) {
      const res = yield call(getAftersalesByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('确认收到退货');
      }
    },
    *putDeliverAftersales({ payload }, { call, put }) {
      const res = yield call(getAftersalesByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('提交运单号成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          aftersalePage: page,
          aftersalePageSize: pageSize,
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
