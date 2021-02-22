import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 管理员设置默认广告
export const putDefaultAdvertiseReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/advertisement/${id}/default`, {
    method: 'put',
  });
};

// 管理员修改广告内容
interface advertiseData {
  content: string;
  beginDate: string;
  endDate: string;
  weight: number;
  repeat: boolean;
  link: string;
}
export const putModifyAdvertiseReq = ({
  did,
  id,
  ...data
}: {
  did: number;
  id: number;
  data: advertiseData;
}) => {
  return request(`/shops/${did}/advertisement/${id}`, {
    method: 'put',
    data: data,
  });
};

// 管理员删除广告
export const deleteAdvertiseReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/advertisement/${id}`, {
    method: 'delete',
  });
};

// 管理员上传广告图片
export const postUploadImgReq = ({
  did,
  id,
  img,
}: {
  did: number;
  id: number;
  img: any;
}) => {
  return request(`/shops/${did}/advertisement/${id}/uploadImg`, {
    method: 'post',
  });
};

// 管理员上架广告
export const putOnshelvesAdvertiseReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/advertisement/${id}/onshelves`, {
    method: 'put',
  });
};

// 管理员下架广告
export const putOffshelvesAdvertiseReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/advertisement/${id}/offshelves`, {
    method: 'put',
  });
};

// 管理员审核广告
interface advertiseAudit {
  conclusion: true;
  message: string;
}
export const putAuditAdvertiseReq = ({
  did,
  id,
  ...data
}: {
  did: number;
  id: number;
  data: advertiseAudit;
}) => {
  return request(`/shops/${did}/advertisement/${id}/audit`, {
    method: 'put',
    data: data,
  });
};

// 管理员查看某一个广告时间段的广告
export const getAllSegmentsAdvertiseReq = ({
  did,
  id,
  ...params
}: {
  did: number;
  id: number;
  params: any;
}) => {
  return request(`/shops/${did}/timesegments/${id}/advertisement`, {
    method: 'get',
    params: params,
  });
};

// 管理员在广告时段下新建广告
export const postCreateSegmentsAdvertiseReq = ({
  did,
  id,
  ...params
}: {
  did: number;
  id: number;
  params: advertiseData;
}) => {
  return request(`/shops/${did}/timesegments/${id}/advertisement`, {
    method: 'post',
    params: params,
  });
};

// // 管理员在广告时段下增加广告
// export const postAddSegmentsAdvertiseReq = ({did,tid,id,...params}:{did:number,tid:number,id:number,params:advertiseData}) => {
//   return request(`/shops/${did}/timesegments/${tid}/advertisement/${id}`,{
//     method: 'post',
//     params: params
//   })
// }
