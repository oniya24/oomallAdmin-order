import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 查询某个地区的所有上级地区
export const getAllRegionReq = (id: number) => {
  return request(`/region/${id}/ancestor`);
};

// 管理员在地区下新增子地区
interface regionInfo {
  name: string;
  postalCode: string;
}
export const postAddSubRegionsReq = ({
  did,
  id,
  ...data
}: {
  did: number;
  id: number;
  data: regionInfo;
}) => {
  return request(`/shops/${did}/regions/${id}/subregions`, {
    method: 'post',
    data: data,
  });
};

// 管理员修改某个地区
export const putModifySubRegionsReq = ({
  did,
  id,
  ...data
}: {
  did: number;
  id: number;
  data: regionInfo;
}) => {
  return request(`/shops/${did}/regions/${id}`, {
    method: 'put',
    data: data,
  });
};

// 管理员让某个地区无效
export const deleteSubRegionsReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/regions/${id}`, {
    method: 'delete',
  });
};
