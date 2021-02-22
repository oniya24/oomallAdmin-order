import {
  getAllRegionReq,
  postAddSubRegionsReq,
  putModifySubRegionsReq,
  deleteSubRegionsReq,
} from '@/service/Address.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'address';
const model = {
  namespace,
  state: {
    addressList: [
      {
        id: 0,
        pid: 0,
        name: 'string',
        postalCode: 'string',
        state: 0,
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    addressTotal: 0,
    addressPage: 1,
    addressPageSize: 10,
  },
  effects: {
    *getAllRegion({ payload }, { call, put }) {
      const res = yield call(getAllRegionReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            addressList: list,
            addressTotal: total,
          },
        });
      }
    },
    *postAddSubRegionsReq({ payload }, { call, put }) {
      const res = yield call(postAddSubRegionsReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *putModifySubRegions({ payload }, { call, put }) {
      const res = yield call(putModifySubRegionsReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deleteSubRegions({ payload }, { call, put }) {
      const res = yield call(deleteSubRegionsReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          addressPage: page,
          addressPageSize: pageSize,
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
