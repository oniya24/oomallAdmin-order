import {
  getAllUsersReq,
  putBanUserByShopReq,
  putReleaseUserByShopReq,
  getUserByIdReq
} from '@/service/UserManage.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'user';
const model = {
  namespace,
  state: {
    userList: [
      {
        id: 0,
        userName: 'string',
        name: 'string',
      },
    ],
    userDetail: {},
    userTotal: 0,
    userPage: 1,
    userPageSize: 10,
  },
  effects: {
    *getAllUsers({ payload }, { call, put }) {
      const res = yield call(getAllUsersReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            userList: list,
            userTotal: total,
          },
        });
      }
    },
    *getUserById({ payload }, {call, put}){
      const res = yield call(getUserByIdReq, payload)
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res
        yield put({
          type: 'save',
          payload: {
            userDetail: data
          }
        })
      }
    },
    *putBanUserByShop({ payload }, { call, put }) {
      const res = yield call(putBanUserByShopReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('封禁成功');
      }
    },
    *putReleaseUserByShop({ payload }, { call, put }) {
      const res = yield call(putReleaseUserByShopReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('解禁成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          userPage: page,
          userPageSize: pageSize,
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
