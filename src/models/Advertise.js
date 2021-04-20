import {
  putDefaultAdvertiseReq,
  postUploadImgReq,
  putOnshelvesAdvertiseReq,
  putOffshelvesAdvertiseReq,
  putAuditAdvertiseReq,
  putModifyAdvertiseReq,
  deleteAdvertiseReq,
  getAllSegmentsAdvertiseReq,
  postCreateSegmentsAdvertiseReq,
} from '@/service/Advertise.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'advertise';
const model = {
  namespace,
  state: {
    adverList: [
      {
        id: 0,
        link: 'string',
        imagePath: 'string',
        content: 'string',
        segId: 0,
        state: 0,
        weight: 'string',
        beDefault: true,
        beginDate: 'string',
        endDate: 'string',
        repeat: true,
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    adverTotal: 0,
    adverPage: 1,
    adverPageSize: 10,
    adverDetail: {},
  },
  effects: {
    *putDefaultAdvertise({ payload }, { call, put }) {
      const res = yield call(putDefaultAdvertiseReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('设置默认广告成功');
      }
    },
    *postUploadImg({ payload }, { call, put }) {
      const res = yield call(postUploadImgReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上传图片成功');
      }
    },
    *putOnshelvesAdvertise({ payload }, { call, put }) {
      const res = yield call(putOnshelvesAdvertiseReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上架成功');
      }
    },
    *putOffshelvesAdvertise({ payload }, { call, put }) {
      const res = yield call(putOffshelvesAdvertiseReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('下架成功');
      }
    },
    *putAuditAdvertise({ payload }, { call, put }) {
      const res = yield call(putAuditAdvertiseReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('认证成功');
      }
    },
    *getAllSegmentsAdvertise({ payload }, { call, put }) {
      const res = yield call(getAllSegmentsAdvertiseReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            adverList: list,
            adverTotal: total,
          },
        });
      }
    },
    *postCreateSegmentsAdvertise({ payload }, { call, put }) {
      const res = yield call(postCreateSegmentsAdvertiseReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *putModifyAdvertise({ payload }, { call, put }) {
      const res = yield call(putModifyAdvertiseReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deleteAdvertise({ payload }, { call, put }) {
      const res = yield call(deleteAdvertiseReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          adverPage: page,
          adverPageSize: pageSize,
        },
      });
    },
    *saveAdverDetail({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          adverDetail: payload
        }
      })
    }
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
