import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';
// 平台管理员获取所有用户列表
interface getAllUsersParams extends pagination {
  userName?: string;
  email?: string;
  mobile?: string;
}
export const getAllUsersReq = (params: getAllUsersParams) => {
  return request('/users/all', {
    params: params,
  });
};


export const getUserByIdReq = (id:number) => {
  return request(`/users/${id}`);
};

// 平台管理员封禁买家
export const putBanUserByShopReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/users/${id}/ban`, {
    method: 'put',
  });
};

// 平台管理员解禁买家
export const putReleaseUserByShopReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/users/${id}/release`, {
    method: 'put',
  });
};
