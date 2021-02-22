import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 管理员查询商品分享记录
export const getAllShareReq = ({
  did,
  id,
  ...params
}: {
  did: number;
  id: number;
  params: pagination;
}) => {
  return request(`/shops/${did}/skus/${id}/shares`, {
    method: 'get',
    params: params,
  });
};

// 管理员查询商品被分享记录
export const getAllBesharedActivityReq = ({
  did,
  id,
  ...params
}: {
  did: number;
  id: number;
  params: pagination;
}) => {
  return request(`/shops/${did}/skus/${id}/beshared`, {
    method: 'get',
    params: params,
  });
};

// 平台或店家创建新的分享活动
interface shareActivity {
  beginTime: string;
  endTime: string;
  strategy: string;
}
export const postCreateShareReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: shareActivity;
}) => {
  return request(`/shops/${shopId}/skus/${id}/shareactivities`, {
    method: 'post',
    data: data,
  });
};

// 管理员修改平台分享活动的内容，只可以在待发布状态修改
export const putModifyShareReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: shareActivity;
}) => {
  return request(`/shops/${shopId}/shareactivities/${id}`, {
    method: 'put',
    data: data,
  });
};

// 管理员下线指定商品的分享活动
export const deleteShareReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/shareactivities/${id}`, {
    method: 'delete',
  });
};

// 管理员上线分享活动
export const putOnshelvesShareReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/shareactivities/${id}/online`, {
    method: 'put',
  });
};
