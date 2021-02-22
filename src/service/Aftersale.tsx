import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 管理员查看所有售后单（可根据售后类型和状态选择）
export const getAllAftersalesReq = ({
  id,
  ...params
}: {
  id: number;
  params: any;
}) => {
  return request(`/shops/${id}/aftersales`, {
    method: 'get',
    params: params,
  });
};

// 管理员根据售后单id查询售后单信息
export const getAftersalesByIdReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/aftersales/${id}`);
};

// 管理员同意/不同意（退款，换货，维修）
interface processOption {
  confirm: boolean;
  price: number;
  conclusion: string;
  type: number;
}
export const putConfirmAftersalesReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: processOption;
}) => {
  return request(`/shops/${shopId}/aftersales/${id}/confirm`, {
    method: 'put',
    data: data,
  });
};

// 店家确认收到买家的退（换）货
interface receiveOption {
  confirm: boolean;
  conclusion: string;
}
export const putReceiveAftersalesReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: receiveOption;
}) => {
  return request(`/shops/${shopId}/aftersales/${id}/receive`, {
    method: 'put',
    data: data,
  });
};

// 店家寄出货物
export const putDeliverAftersalesReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${shopId}/aftersales/${id}/deliver`, {
    method: 'put',
    data: data,
  });
};
